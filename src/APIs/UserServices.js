import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";
import axios from "axios";
import api from "./api.js";

export const putInfo = async (uuid, payload) => {
  const params = {
    TableName: "user_info",
    Item: {
      uuid: uuid,
      birthdate: payload?.birthdate.toString(),
      sex: payload?.sex,
    },
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    console.log("Error", err);
  }
};

export const getAllInfo = async (username) => {
  const params = {
    Statement: "SELECT * FROM user_info WHERE uuid=?",
    Parameters: [{ S: username }],
  };
  try {
    console.log("getting user info...", username);
    const data = await api.get("/info/uuid/" + username);
    // const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log("data: ", data.data);
    return data.data;
  } catch (err) {
    console.log("Error getting all info", err);
  }
};

// export const getInfo = async (payload) => {
//   const params = {
//     TableName: "user_info",
//     Key: { uuid: payload },
//   };
//   try {
//     console.log("getting info");
//     const data = await ddbDocClient.send(new GetCommand(params));
//     return data.Item;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };

export const putSteps = async (user, date, steps) => {
  console.log("putting steps", date, steps);
  const params = {
    TableName: "steps",
    Item: {
      uuid: user,
      date: date.toString(),
      steps: steps,
    },
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log(data);
  } catch (err) {
    console.log("Error", err);
  }
};

export const getAllSteps = async (username) => {
  const params = {
    Statement: "SELECT * FROM steps WHERE uuid=?",
    Parameters: [{ S: username }],
  };
  try {
    console.log("getting all steps...", username);
    const data = await api.get("/steps/uuid/" + username);
    // const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.log("Error getting all steps", err);
  }
};

// export const getSteps = async (username, date) => {
//   console.log(date);
//   const params = {
//     TableName: "steps",
//     Key: { uuid: username, date: date },
//   };
//   try {
//     const data = await ddbDocClient.send(new GetCommand(params));
//     console.log(data.Item);
//     return data.Item;
//   } catch (err) {
//     console.log("Error getting steps", err);
//   }
// };

export const putWeighIn = async (uuid, payload) => {
  const params = {
    TableName: "weigh_ins",
    Item: {
      uuid: uuid,
      date: payload?.date.toString(),
      weight: payload?.weight,
      heightFt: payload?.heightFt,
      heightIn: payload?.heightIn,
      bodyFat: payload?.bodyFat,
      targetWeightLoss: payload?.targetWeightLoss,
      waist: payload?.waist,
      neck: payload?.neck,
    },
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    console.log("Error", err);
  }
};

export const getAllWeighIns = async (username) => {
  const params = {
    Statement: "SELECT * FROM weigh_ins WHERE uuid=?",
    Parameters: [{ S: username }],
  };
  try {
    console.log("getting user weigh ins...", username);
    const data = await api.get("/stats/uuid/" + username);
    // const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log("weigh ins: ", data.data);
    return data.Items;
  } catch (err) {
    console.log("Error getting all weigh ins", err);
  }
};
