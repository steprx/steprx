import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../libs/ddbDocClient.js";
import { useUserStore } from "../Stores/UserStore.js";

export const putItem = async (user, payload) => {
  // const key = user;
  const params = {
    TableName: "info",
    Item: {
      uuid: user,
      age: payload?.age,
      weight: payload?.weight,
      heightFt: payload?.heightFt,
      heightIn: payload?.heightIn,
      bodyFat: payload?.bodyFat,
      targetWeight: payload?.targetWeight,
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
// putItem();

export const getItem = async (payload) => {
  const params = {
    TableName: "info",
    Key: { uuid: payload },
  };
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
  } catch (err) {
    console.log("Error", err);
  }
};
// getItem();
