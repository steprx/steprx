// import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
// import { ddbDocClient } from "../libs/ddbDocClient";
// import axios from "axios";
import api from "./api";

export const getAllData = async () => {
  const params = {
    Statement: "SELECT * FROM user_info",
  };
  try {
    console.log("getting user info...");
    const data = await api.get("/info/get/all");
    console.log("data: ", data.data);
    return data.data;
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
    console.log("data: ", data.data);
    return data.data;
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
    const data = await api.get("/stats/get/all");
    // const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log("data: ", data.data);
    return data.data;
  } catch (err) {
    console.log("Error getting all weigh ins", err);
  }
};
