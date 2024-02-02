import { useState, useEffect } from "react";
import axios from "../axiosinstance";

const useGetJoinedCommunities = () => {
  const [joinedCommunities, setjoinedCommunities] = useState([]);

  useEffect(() => {
    axios
      .get(`/user/joined-communities`)
      .then((response) => {
        setjoinedCommunities(response.data);
      })
      .catch((error) => {
        console.log("Error fetchig joined groups", error);
      });
  }, []);
};

export default useGetJoinedCommunities;