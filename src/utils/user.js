import { useState } from "react";

export const User = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  return user;
};

export const Health = () => {
  const [health, setHealth] = useState({
    age: 0,
    gender: "",
    weight: 0,
    height: 0,
    bodyFat: 0,
    targetWeight: 0,
    waist: 0,
    neck: 0,
  });
  return health;
};

export const DailyData = () => {
  const [dailyData, setDailyData] = useState([
    { date: "1/13/23", weight: 254.3, steps: 12467, bodyFat: 25.1 },
    { date: "1/14/23", weight: 253.6, steps: 10876, bodyFat: 25.2 },
    { date: "1/15/23", weight: 253.0, steps: 4000, bodyFat: 24.6 },
    { date: "1/16/23", weight: 249.4, steps: 11230, bodyFat: 23.6 },
  ]);
  return dailyData;
};
