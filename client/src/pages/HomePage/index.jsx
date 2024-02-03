import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "../../axiosinstance";
import BrowseSection from "../../components/BrowseSection"; // Adjust the path accordingly
import MyCommunities from "../../components/MyCommunities";
import MyCommunitiesGroups from "../../components/MyCommunitiesGroups";
// import MyCommunitiesGroups from './MyCommunitiesGroups';
// import DetailsSection from './DetailsSection';

const HomePage = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isCommunitySelected, setIsCommunitySelected] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get("/communitie/place");
        setCommunities(response.data);
      } catch (error) {
        console.log("Error fetching communities by place", error);
      }
    };

    fetchCommunities();
  }, []);

  useEffect(() => {
    const fetchGroupsByCommunity = async () => {
      if (selectedCommunity) {
        try {
          const response = await axios.get(
            `group/groups-by-community/${selectedCommunity._id}`
          );
          console.log("response data", response.data);
          setGroups(response.data);
        } catch (error) {
          console.log("Error fetching groups by community", error);
        }
      }
    };

    fetchGroupsByCommunity();
  }, [selectedCommunity]);

  const handleSelect = (item) => {
    if (item.hasOwnProperty("groups")) {
      setSelectedCommunity(item);
      setIsCommunitySelected(true);
      setSelectedGroup(null);
    } else {
      setSelectedGroup(item);
    }
  };

  return (
    <div className="home-page">
      <div>
        {isCommunitySelected && (
          <div>
            <button
              onClick={() => {
                setSelectedCommunity(null);
                setIsCommunitySelected(false);
                setGroups([]);
              }}
            >
              Back
            </button>
          </div>
        )}
        <BrowseSection
          data={selectedCommunity ? groups : communities}
          onSelect={handleSelect}
        />
      </div>
      
      <div className="home-page__joined-groups-and-communities">
        <MyCommunitiesGroups
          communityId={selectedCommunity ? selectedCommunity._id : null}
          onSelectGroup={(group) => setSelectedGroup(group)}
        />
        <MyCommunities
          onSelectCommunity={(community) => {
            setSelectedCommunity(community);
            setSelectedGroup(null);
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
