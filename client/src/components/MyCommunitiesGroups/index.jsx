import React, { useEffect, useState } from "react";
import axios from "../../axiosinstance"; // Import your axios instance

const MyCommunitiesGroups = ({ onSelectGroup }) => {
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get("/users/all-groups"); // Updated endpoint
        setUserGroups(response.data);
      } catch (error) {
        console.log("Error fetching user groups", error);
      }
    };

    fetchUserGroups();
  }, []);

  return (
    <div className="my-communities-groups">
      <h2>All My Groups</h2>
      <ul>
        {userGroups.map((group) => (
          <li key={group._id} onClick={() => onSelectGroup(group)}>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCommunitiesGroups;
