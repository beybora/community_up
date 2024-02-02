// MyCommunities.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../axiosinstance'; // Import your axios instance

const MyCommunities = ({ onSelectCommunity }) => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);

  useEffect(() => {
    const fetchJoinedCommunities = async () => {
      try {
        const response = await axios.get('users/joined-communities');
        setJoinedCommunities(response.data);
      } catch (error) {
        console.log('Error fetching joined communities', error);
      }
    };

    fetchJoinedCommunities();
  }, []);

  return (
    <div className="my-communities">
      <h2>My Communities</h2>
      <ul>
        {joinedCommunities.map((community) => (
          <li key={community._id} onClick={() => onSelectCommunity(community)}>
            <h3>{community.name}</h3>
            <p>{community.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCommunities;
