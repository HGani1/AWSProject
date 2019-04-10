import AWS from "aws-sdk";
import res from "./responses/responseData";

const randomBytes = require("crypto").randomBytes;
const ddb = new AWS.DynamoDB.DocumentClient();
const fleet = [
  {
    Name: "Bucephalus",
    Color: "Golden",
    Gender: "Male"
  },
  {
    Name: "Shadowfax",
    Color: "White",
    Gender: "Male"
  },
  {
    Name: "Rocinante",
    Color: "Yellow",
    Gender: "Female"
  }
];

export default async (event: any, context: any) => {
  if (!event.requestContext.authorizer) {
    console.log("Event: ", event);
    return res.errRes("Authorization not configured", context.awsRequestId);
  }

  const rideId = toUrlString(randomBytes(16));
  console.log("Received event (", rideId, "): ", event);
  const username = event.requestContext.authorizer.claims["cognito:username"];
  const requestBody = JSON.parse(event.body);
  const pickupLocation = requestBody.PickupLocation;
  const unicorn = findUnicorn(pickupLocation);

  try {
    await recordRide(rideId, username, unicorn);
    return res.successRes(rideId, username, unicorn);
  } catch (e) {
    return res.errRes(e, context.awsRequestId);
  }
};

const findUnicorn = (pickupLocation: any) => {
  console.log(
    "Finding unicorn for ",
    pickupLocation.Latitude,
    ", ",
    pickupLocation.Longitude
  );
  return fleet[Math.floor(Math.random() * fleet.length)];
};

const recordRide = (rideId: any, username: any, unicorn: any): Promise<any> => {
  return ddb
    .put({
      TableName: "Rides",
      Item: {
        RideId: rideId,
        User: username,
        Unicorn: unicorn,
        UnicornName: unicorn.Name,
        RequestTime: new Date().toISOString()
      }
    })
    .promise();
};

const toUrlString = (buffer: any) => {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};
