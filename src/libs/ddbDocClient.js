import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "./ddbClient";

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  converClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumber: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unmarshallOptions,
});

export { ddbDocClient };
