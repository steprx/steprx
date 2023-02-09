import { Auth } from "aws-amplify";

export async function signUp() {
  try {
    const { user } = await Auth.signUp({
      email,
      password,
      attributes: {
        name,
      },
      autoSignIn: {
        enabled: true,
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}
