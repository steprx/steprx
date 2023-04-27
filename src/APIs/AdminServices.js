import api from "./api";

export const getAllData = async () => {
  const params = {
    Statement: "SELECT * FROM user_info",
  };
  try {
    const data = await api.get("/info/get/all");
    return data.data;
  } catch (err) {}
};

export const getAllSteps = async () => {
  const params = {
    Statement: "SELECT * FROM steps",
  };
  try {
    const data = await api.get("/steps/get/all");
    return data.data;
  } catch (err) {}
};

export const getAllWeights = async () => {
  const params = {
    Statement: "SELECT * FROM weigh_ins",
  };
  try {
    const data = await api.get("/stats/get/all");
    return data.data;
  } catch (err) {}
};
