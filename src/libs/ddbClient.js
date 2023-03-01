import AWS from "aws-sdk";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// **********NEED TO FIGURE OUT HOW TO REMOVE HARD CODED CREDENTIALS*********** //
export const ddbClient = new DynamoDBClient({
  // region: AWS.config.region,
  region: "us-east-1",
  //   endpoint: "http://localhost:8000",
  credentials: {
    // accessKeyId: AWS.config.credentials.accessKeyId,
    // secretAccessKey: AWS.config.credentials.secretAccessKey,
    accessKeyId: "AKIAQCM4HX2R6PRJVXWN",
    secretAccessKey: "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",
  },
});
