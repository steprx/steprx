import { Auth } from "aws-amplify";

export async function signUp(payload) {
  console.log("creating user...");
  try {
    const { user } = await Auth.signUp({
      username: payload.email,
      password: payload.password,
      attributes: {
        email: payload.email,
        given_name: payload.firstName,
        family_name: payload.lastName,
        updated_at: JSON.stringify(payload.time),
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

export async function signIn() {
  console.log("signing in...");
}
