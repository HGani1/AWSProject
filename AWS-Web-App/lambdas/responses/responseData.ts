const errRes = (errorMessage: string, awsRequestId: string) => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId
    }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};

const successRes = (rideId: string, username: string, unicorn: any) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      RideId: rideId,
      Unicorn: unicorn,
      UnicornName: unicorn.Name,
      Eta: "30 seconds",
      Rider: username
    }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};

export = {
  errRes,
  successRes
};
