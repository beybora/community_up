import React, { useState, useEffect } from 'react';
import useCommunitiesByPlace from '../../hooks/useCommunitiesByPlace';
import useGroupsByCommunity from '../../hooks/useGroupsByCommunity';
import BrowserSection from '../../components/BrowseSection';

const HomePage = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Flag to track loading state

  // Fetch communities using the useCommunitiesByPlace hook
  const fetchCommunities = async () => {
    const fetchedCommunities = await useCommunitiesByPlace();
    setCommunities(fetchedCommunities);
    setLoading(false); // Set loading to false when data is fetched
  };

  // Fetch groups using the useGroupsByCommunity hook whenever selectedCommunity changes
  const fetchGroups = async () => {
    if (selectedCommunity) {
      const fetchedGroups = await useGroupsByCommunity(selectedCommunity?._id);
      setGroups(fetchedGroups);
      setData(fetchedGroups);
    } else {
      setData(communities);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [selectedCommunity, communities]);

  return (
    <div className="home-page">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BrowserSection
          data={data}
          onSelect={(item) => {
            setSelectedCommunity(item);
            setSelectedGroup(null);
          }}
        />
      )}
      {/* ... */}
    </div>
  );
};

export default HomePage;
