import { APIGatewayProxyResult } from "aws-lambda";
import { StatusCode } from "aws-sdk/clients/resourcegroupstaggingapi";

export function responseMessage(
  body: object | string,
  statusCode: StatusCode
): APIGatewayProxyResult {
  return {
    statusCode,
    body: typeof body === "string" ? body : JSON.stringify(body)
  };
}
