import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient";

export const getAllData = async () => {
  const params = {
    Statement: "SELECT * FROM info",
  };
  try {
    console.log("getting user info...");
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log("data: ", data.Items);
    return data.Items;
  } catch (err) {
    console.log("Error getting all info", err);
  }
};
