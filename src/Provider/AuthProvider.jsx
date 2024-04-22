import { createContext, useEffect, useState } from "react";
import {
  autoSignIn,
  confirmSignUp,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignUp = (name, email, image, password) => {
    setLoading(true);
    return signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email: email,
          name: name,
          picture: image,
        },
        autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      },
    });
  };

  const handleConfirmSignUp = (username, confirmationCode) => {
    setLoading(true);
    return confirmSignUp({ username, confirmationCode });
  };

  const handleAutoSignIn = () => {
    setLoading(true);
    return autoSignIn();
  };

  const handleSignIn = (email, password) => {
    setLoading(true);
    return signIn({ username: email, password });
  };

  const handleSignOut = async () => {
    setLoading(true);
    return await signOut();
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      setLoading(false);
    }
    const hubListenerCancelToken = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          localStorage.setItem(
            "userData",
            JSON.stringify(payload.data.signInDetails.loginId)
          );
          console.log("user signed in");
          setUser(payload.data.signInDetails.loginId);
          setLoading(false);
          break;
        case "signedOut":
          localStorage.removeItem("userData");
          console.log("user signed out");
          setUser(null);
          setLoading(false);
          break;
        case "signInWithRedirect":
          setLoading(false);
          break;
        default:
          break;
      }
    });
    return () => hubListenerCancelToken();

    // const currentAuthenticatedUser = async () => {
    //   try {
    //     const { username, userId, signInDetails } = await getCurrentUser();
    //     setUser(signInDetails.loginId);
    //     setLoading(false);
    //     console.log(`The username: ${username}`);
    //     console.log(`The userId: ${userId}`);
    //     console.log(`The signInDetails: ${signInDetails}`);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // currentAuthenticatedUser();
    // return () => currentAuthenticatedUser();
  }, []);

  console.log(user);
  console.log(loading);

  const authInfo = {
    user,
    loading,
    handleSignUp,
    handleSignIn,
    handleConfirmSignUp,
    handleAutoSignIn,
    handleSignOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
