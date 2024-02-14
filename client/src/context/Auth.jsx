import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "../axiosinstance";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchUser, setFetchUser] = useState(false);
  const [errors, setErrors] = useState(null);
  const toast = useToast();

  const setState = (user, loading, errors) => {
    setUser(user);
    setLoading(loading);
    setErrors(errors);
  };

  useEffect(() => {
    axios
      .get("/api/users/currentUser")
      .then((res) => {
        setLoading(false);
        setUser(res.data.user);
      })
      .catch((error) => {
        setUser(null);
        setLoading(false);
        // navigate("/");
      });
  }, [fetchUser]);

  const register = (user) => {
    setLoading(true);
    axios
      .post("/api/users/register", user)
      .then((res) => {
        toast({
          title: "Successfully Registered!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: "Registration failed!",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(null, false, err.response.data.errors);
      });
  };

  const login = (user) => {
    // setLoading(true);
    axios
      .post("/api/users/login", user)
      .then((res) => {
        toast({
          title: "Successfully Logged In!",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: "Invalid credentials!",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
        setState(null, false, err.response.data);
      });
  };

  const logout = () => {
    axios.post("/api/users/logout", {}).then((res) => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        loading,
        user,
        setUser,
        fetchUser,
        setFetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
