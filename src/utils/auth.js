import { Auth } from "aws-amplify";

export async function signUp(payload) {
  console.log("creating user...");
  try {
    const user = await Auth.signUp({
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
    return user;
  } catch (error) {
    console.log("error signing up:", error);
  }
}

export async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}

export async function signIn(payload) {
  console.log("signing in...");
  try {
    const user = await Auth.signIn(payload.email, payload.password);
    console.log(user);
    return user;
  } catch (error) {
    console.log("error signing in", error);
  }
}

export async function signOut() {
  console.log("signing out...");
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
