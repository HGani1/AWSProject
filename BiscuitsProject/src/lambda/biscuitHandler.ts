import { Biscuit, BiscuitBody } from "../utils/dataContainer";

import AWS from "aws-sdk";
import { pathBuilder } from "../utils/pathBuilder";
import { responseMessage } from "../utils/api";

export default async (event: BiscuitBody) => {
  const s3 = new AWS.S3();
  const body = JSON.parse(event.body);
  const data = body.biscuitType;
  const bucket: string = "hasanganitestbuckets3";
  const dataSet: any[] = [1, 2, 3, 4, 5];
  let objectKey: string;
  const biscuit: Biscuit = {
    name: "",
    img: ""
  };

  const params: any = {
    Bucket: bucket,
    Delimiter: "/",
    Prefix: "Biscuits/"
  };

  const reg = await s3.getBucketLocation({ Bucket: bucket }).promise();
  const region = reg.LocationConstraint;
  const obj = await s3.listObjectsV2(params).promise();

  try {
    if (dataSet.includes(data)) {
      switch (data) {
        case 1: {
          biscuit.name = "Digestive";

          console.log(obj);

          obj.Contents.filter(key => {
            if (key.Key === "Biscuits/Digestive.jpeg") {
              objectKey = key.Key;
            }
          });

          break;
        }

        case 2:
          {
            biscuit.name = "Cookies";

            obj.Contents.filter(key => {
              if (key.Key === "Biscuits/Maryland-Cookies.jpg") {
                objectKey = key.Key;
              }
            });
          }
          break;

        case 3:
          {
            biscuit.name = "Jammy Dodger";

            obj.Contents.filter(key => {
              if (key.Key === "Biscuits/DammyJodder.jpg") {
                objectKey = key.Key;
              }
            });
          }
          break;

        case 4:
          {
            biscuit.name = "Nice";

            obj.Contents.filter(key => {
              if (key.Key === "Biscuits/nice-biscuits-main.jpg") {
                objectKey = key.Key;
              }
            });
          }
          break;

        case 5:
          {
            biscuit.name = "Fail";

            obj.Contents.filter(key => {
              if (
                key.Key === "Biscuits/Chocolate-chip-cookie-crumbs-on-plate.png"
              ) {
                objectKey = key.Key;
              }
            });
          }
          break;
      }

      biscuit.img = pathBuilder(region, bucket, objectKey);
      return responseMessage(biscuit, 200);
    } else {
      return responseMessage("Unexpected Data Found", 400);
    }
  } catch (e) {
    return responseMessage(e, 500);
  }
};
