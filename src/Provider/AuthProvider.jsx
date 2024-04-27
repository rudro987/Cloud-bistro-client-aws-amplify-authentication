import { createContext, useEffect, useState } from "react";
import {
  autoSignIn,
  confirmSignUp,
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
    const hubListenerCancelToken = Hub.listen("auth", ({ payload }) => {
      
      switch (payload.event) {
        case "signedIn":
          localStorage.setItem(
            "userData",
            JSON.stringify(payload.data.signInDetails.loginId)
          );
          console.log("user signed in");
          axiosPublic
            .post("/jwt", { email: payload.data.signInDetails.loginId })
            .then((res) => {
              if (res.data.token) {
                localStorage.setItem("access-token", res.data.token);
                setUser(payload.data.signInDetails.loginId);
                setLoading(false);
              }
            });

          break;
        case "signedOut":
          localStorage.removeItem("userData");
          localStorage.removeItem("access-token");
          console.log("user signed out");
          setUser(null);
          setLoading(true);
          break;
        case "signInWithRedirect":
          setLoading(false);
          break;
        default:
          break;
      }
    });
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


    return () => hubListenerCancelToken();

    
    // return () => currentAuthenticatedUser();
  }, [axiosPublic]);

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


// import { createContext, useEffect, useState } from "react";
// import { Hub } from "aws-amplify/utils";
// import { autoSignIn, confirmSignUp, getCurrentUser, signIn, signOut, signUp } from "aws-amplify/auth";
// import useAxiosPublic from "../Hooks/useAxiosPublic";

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const authUser = await getCurrentUser();
//         setUser(authUser);
//         setLoading(false);
//       } catch (error) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();

//     const authListener = Hub.listen("auth", async (data) => {
//       const { payload } = data;
//       if (payload.event === "signIn") {
//         fetchUser(); // Update user state upon sign-in
//       } else if (payload.event === "signOut") {
//         setUser(null); // Clear user state upon sign-out
//       }
//     });

//     return () => {
//       authListener(); // Clean up event listener
//     };
//   }, []);

//   const handleSignUp = async (name, email, image, password) => {
//     try {
//       setLoading(true);
//       const signUpResponse = await signUp({
//         username: email,
//         password,
//         attributes: {
//           email,
//           name,
//           picture: image,
//         },
//       });
//       // Handle successful sign-up
//       return signUpResponse;
//     } catch (error) {
//       // Handle sign-up error
//       console.log("Sign-up error:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignIn = async (email, password) => {
//     try {
//       setLoading(true);
//       const signInResponse = await signIn({username:email, password});
//       // Handle successful sign-in
//       return signInResponse;
//     } catch (error) {
//       // Handle sign-in error
//       console.log("Sign-in error:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//     const handleConfirmSignUp = async (username, confirmationCode) => {
//     try {
//       setLoading(true);
//       const confirmSignUpResponse = await confirmSignUp({username, confirmationCode});
//       // Handle successful sign-in
//       return confirmSignUpResponse;
//     } catch (error) {
//       // Handle sign-in error
//       console.log("Sign-in error:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAutoSignIn = async () => {
//     try {
//       const autoSignInResponse = await autoSignIn();
//       return autoSignInResponse;
//     } catch (error) {
//       console.log("Auto Sign-in error:", error);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       setLoading(true);
//       await signOut();
//       // Handle successful sign-out
//     } catch (error) {
//       // Handle sign-out error
//       console.log("Sign-out error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const authInfo = {
//     user,
//     loading,
//     handleSignUp,
//     handleSignIn,
//     handleSignOut,
//     handleConfirmSignUp,
//     handleAutoSignIn,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

