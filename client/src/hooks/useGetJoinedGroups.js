import { useState, useEffect } from "react";
import axios from "../axiosinstance";

const useGetJoinedGroups = (communityId) => {
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
      if (communityId) {
          axios
              .get(`user/joined-groups`)
              .then((response) => {
                  setJoinedGroups(response.data)
              })
              .catch((error) => {
              console.log("Error fetching joined groups", error)
          })
    }
  }, [communityId]);
};

export default useGetJoinedGroups;
