import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";
import { useUserStore } from "../Stores/UserStore.js";

export const putInfo = async (uuid, payload) => {
  // const key = user;
  const params = {
    TableName: "info",
    Item: {
      uuid: uuid,
      date: payload?.date,
      birthdate: payload?.birthdate,
      weight: payload?.weight,
      heightFt: payload?.heightFt,
      heightIn: payload?.heightIn,
      bodyFat: payload?.bodyFat,
      targetWeightLoss: payload?.targetWeightLoss,
      waist: payload?.waist,
      neck: payload?.neck,
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
    Statement: "SELECT * FROM info WHERE uuid=?",
    Parameters: [{ S: username }],
  };
  try {
    console.log("getting user info...", username);
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log("data: ", data.Items);
    return data.Items;
  } catch (err) {
    console.log("Error getting all info", err);
  }
};

export const getInfo = async (payload) => {
  const params = {
    TableName: "info",
    Key: { uuid: payload },
  };
  try {
    console.log("getting info");
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
  } catch (err) {
    console.log("Error", err);
  }
};

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
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log(data.Items);
    return data.Items;
  } catch (err) {
    console.log("Error getting all steps", err);
  }
};

export const getSteps = async (username, date) => {
  console.log(date);
  const params = {
    TableName: "steps",
    Key: { uuid: username, date: date },
  };
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log(data.Item);
    return data.Item;
  } catch (err) {
    console.log("Error getting steps", err);
  }
};

export const putWeighIn = async (uuid, payload) => {
  const params = {
    TableName: "weigh_ins",
    Item: {
      uuid: uuid,
      date: payload?.date.toString(),
      birthdate: payload?.birthdate,
      weight: payload?.weight,
      heightFt: payload?.heightFt,
      heightIn: payload?.heightIn,
      bodyFat: payload?.bodyFat,
      targetWeightLoss: payload?.targetWeightLoss,
      waist: payload?.waist,
      neck: payload?.neck,
      sex: payload?.sex,
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
    console.log("getting user weight ins...", username);
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    console.log("data: ", data.Items);
    return data.Items;
  } catch (err) {
    console.log("Error getting all weigh_ins", err);
  }
};
