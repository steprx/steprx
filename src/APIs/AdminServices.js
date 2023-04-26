import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient";
import api from "./api";
import axios from "axios";

export const getAllData = async () => {
  const params = {
    Statement: "SELECT * FROM user_info",
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

export const getAllSteps = async () => {
  const params = {
    Statement: "SELECT * FROM steps",
  };
  try {
    console.log("getting steps...");
    const data = await api.get("/steps/get/all");
    console.log("data: ", data.Items);
    return data.Items;
  } catch (err) {
    console.log("Error getting all steps", err);
  }
};

export const getAllWeights = async () => {
  const params = {
    Statement: "SELECT * FROM weigh_ins",
  };
  try {
    console.log("getting weigh ins...");
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log("data: ", data.Items);
    return data.Items;
  } catch (err) {
    console.log("Error getting all weigh ins", err);
  }
};
