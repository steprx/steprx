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
    await api.post("/info/save", params.Item);
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
    console.log("data: ", data.data);
    return data.data;
  } catch (err) {
    console.log("Error getting all info", err);
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
    await api.post("/steps/save", params.Item);
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
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.log("Error getting all steps", err);
  }
};

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
    await api.post("/stats/save", params.Item);
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
    console.log("weigh ins: ", data.data);
    return data.data;
  } catch (err) {
    console.log("Error getting all weigh ins", err);
  }
};
