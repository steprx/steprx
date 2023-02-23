import { Auth } from "aws-amplify";
import { createContext } from "react";

export const AuthContext = createContext({
  currentUser: null,
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  resendSignUp: () => null,
  confirmSignUp: () => null,
});

export const AuthProvider = ({ children }) => {
  const currentUser = useRef(null);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signIn: async (payload) => {
          try {
            console.log(
              "logging in user",
              "email: ",
              payload.email,
              "password: ",
              payload.password
            );
            return await Auth.signIn(payload.email, payload.password).then(
              (result) => {
                return result;
              }
            );
          } catch (error) {
            console.log("error signing in", error);
          }
        },
        signUp: async (payload) => {
          try {
            console.log(
              "creating user",
              "first name: ",
              payload.firstName,
              "last name: ",
              payload.lastName,
              "email: ",
              payload.email,
              "password: ",
              payload.password
            );
            return await Auth.signUp({
              email,
              password,
              attributes: {
                given_name,
                family_name,
                updated_at,
              },
              autoSignIn: {
                enabled: true,
              },
            }).then((result) => {
              return result;
            });
          } catch (error) {
            ConsoleLogger.log("error signing up", error);
          }
        },
        signOut: async () => {
          try {
            console.log("signing out user: ", currentUser.current?.userSub);
            await Auth.signOut();
          } catch (error) {
            console.log("error signing out: ", error);
          }
        },
        resendSignUp: async () => {
          try {
            await Auth.resendSignUp(email);
            console.log("code resent successfully");
          } catch (error) {
            console.log("error resending code: ", error);
          }
        },
        confirmSignUp: async () => {
          try {
            await Auth.confirmSignUp(email, code, {
              forceAliasCreation: false,
            });
          } catch (error) {
            console.log("error confirming sign up", error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
