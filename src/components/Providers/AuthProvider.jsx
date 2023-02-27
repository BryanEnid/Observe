import React from "react";
import {
  createUserWithEmailAndPassword as createUser,
  signOut as fbSignOut,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { useProfile } from "../../hooks/useProfile";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState("");
  const [initialized, setInitialized] = React.useState(false);
  const [user, setUser] = React.useState();
  const { createProfile } = useProfile();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialized(true);
    });

    return () => {
      unsubscribe();
      setInitialized(false);
    };
  }, []);

  const signUp = async (email, password, profilePayload) => {
    const { user: rawUser } = await createUser(auth, email, password);
    createProfile({ uid: rawUser.uid, ...profilePayload }).catch(console.error);

    setInitialized(true);
    setUser(rawUser);
    return rawUser;
  };

  const signIn = async (email, password) => {
    let error = false;
    let user = false;

    // ! NOTE: try and catch doesn't work since Firebase SDK has its own built-in promise events
    await signInWithEmailAndPassword(auth, email, password)
      .then((v) => (user = v))
      .catch((e) => (error = e));

    if (error) throw error;
    return user;
  };

  const signOut = () => {
    fbSignOut(auth);
    setToken(null);
  };

  const anonymousSignIn = async () => {
    return signInAnonymously(auth);
    // const token = `anonymous_${uuid.v4()}`;
    // setToken(token);
    // AsyncStorage.setItem("session-token", token);
  };

  const triggerFederatedLogin = async (type) => {};

  return (
    <AuthContext.Provider
      value={{
        token,
        signUp,
        signIn,
        signOut,
        anonymousSignIn,
        initialized,
        triggerFederatedLogin,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
