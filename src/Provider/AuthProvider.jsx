import { createContext, useEffect, useState } from "react";
import {
  autoSignIn,
  confirmSignUp,
  fetchUserAttributes,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

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
    const hubListenerCancelToken = Hub.listen("auth", async ({ payload }) => {
      
      if(payload.event === 'signedIn'){
        const currentUser = await fetchUserAttributes();
        console.log(currentUser);
        console.log(currentUser.email);
        localStorage.setItem(
          "userData",
          JSON.stringify(currentUser)
        );
        console.log("user signed in");
        axiosPublic
          .post("/jwt", { email: payload.data.signInDetails.loginId })
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              setUser(currentUser);
              setLoading(false);
            }
          });
      }else if(payload.event === 'signedOut'){
        localStorage.removeItem("userData");
          localStorage.removeItem("access-token");
          console.log("user signed out");
          setUser(null);
          setLoading(true);
      }else{
        setLoading(false);
      }
    });
    return () => hubListenerCancelToken();

  }, [axiosPublic]);


  //Another way for handling auth flow....

  // useEffect(() => {
  //   const hubListenerCancelToken = Hub.listen("auth", ({ payload }) => {
  //     switch (payload.event) {
  //       case "signedIn":
  //         console.log("user signed in");
  //         axiosPublic
  //           .post("/jwt", { email: payload.data.signInDetails.loginId })
  //           .then(async (res) => {
  //             if (res.data.token) {
  //               localStorage.setItem("access-token", res.data.token);
  //               await currentUser();
  //               setLoading(false);
  //             }
  //           });

  //         break;
  //       case "signedOut":
  //         localStorage.removeItem("access-token");
  //         console.log("user signed out");
  //         setUser(null);
  //         setLoading(true);
  //         break;
  //       case "signInWithRedirect":
  //         setLoading(false);
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  //     currentUser();
  //   return () => hubListenerCancelToken();

  // }, [axiosPublic]);
    

  // const currentUser = async () => {
  //     const userAttributes = await fetchUserAttributes();
  //     setUser(userAttributes.email);
  //     setLoading(false);
  // }

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