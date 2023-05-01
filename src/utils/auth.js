import { Auth } from "aws-amplify";

export async function signUp(payload) {
  try {
    const user = await Auth.signUp({
      username: payload.username,
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
    return user;
  } catch (error) {
    console.log("error signing up: ", error);
  }
}

export async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error confirming sign up: ", error);
  }
}

export async function signIn(payload) {
  try {
    const user = await Auth.signIn(payload.email, payload.password);
    return user;
  } catch (error) {
    console.log("error signing in: ", error);
  }
}

export async function getSession() {
  try {
    const session = await Auth.currentSession();
    return session;
  } catch (error) {
    console.log("error getting session: ", error);
  }
}

export async function getUserAttributes() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    return attributes;
  } catch (error) {
    console.log("error getting info: ", error);
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
