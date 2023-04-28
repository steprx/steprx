import axios from "axios";

export const testCall = async () => {
  try {
    const testData = await axios.get(
      "http://ec2-18-221-250-231.us-east-2.compute.amazonaws.com:3001/search/by/title/zelda"
    );
    console.log(testData);
  } catch (err) {
    console.log(err);
  }
};
