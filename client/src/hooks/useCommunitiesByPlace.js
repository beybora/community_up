import { useState, useEffect } from "react";
import axios from "../axiosinstance";

const useCommunitiesByPlace = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios
      .get("/community/place")
      .then((response) => {
        setCommunities(response.data);
      })
      .catch((error) => {
        console.log("Error fetching communities by place", error);
      });
  }, []);
};

export default useCommunitiesByPlace;