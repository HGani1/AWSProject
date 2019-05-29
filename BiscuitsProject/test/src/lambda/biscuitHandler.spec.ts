import AWS from "aws-sdk";
import AWSMock from "aws-sdk-mock";
import { BiscuitBody } from "../../../src/utils/dataContainer";
import biscuitHandler from "../../../src/lambda/biscuitHandler";
import chai from "chai";
import sinon from "sinon";

const mock = AWSMock.mock;
const expect = chai.expect;
const assert = chai.assert;

describe("Biscuit Tests", () => {
  it("should verify that correct response is received", async () => {
    //mock("S3", "getBucketLocation", "test-region");
    //mock("S3", "listObjectsV2", "test-object");
    const s3Stub = sinon.stub(AWS, "S3");

    const biscuitEvent: BiscuitBody = {
      body: JSON.stringify({
        biscuitType: 1
      })
    };

    const data = await biscuitHandler(biscuitEvent);
    console.log(data);
    // expect(data.body);
  });
});
