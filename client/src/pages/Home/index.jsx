import React, { useState, useEffect } from "react";
import axios from "../../axiosinstance";

const Home = () => {
  const [communities, setCommunities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");

  useEffect(() => {
    axios
      .get("/communitie/place")
      .then((response) => {
        setCommunities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching place:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      axios
        .get(`/group/groups-by-community/${selectedCommunity._id}`)
        .then((response) => {
          setGroups(response.data);
        });
    }
  }, [selectedCommunity]);

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    axios
      .post(`group/join-group/${group._id}`)
      .then(() => {
        console.log("Joined Group");
        alert("You joined the group");
      })
      .catch((error) => {
        console.error("Error joining group:", error);
      });
  };

  const handleCreateGroup = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewGroupName("");
    setNewGroupDescription("");
  };

  const handleModalSubmit = () => {
  axios
    .post("group/groups", {
      name: newGroupName,
      description: newGroupDescription,
      communityId: selectedCommunity._id, // Include the community ID
    })
    .then((response) => {
      console.log("New group created:", response.data);
      handleCloseModal();

      axios.get(`/group/groups-by-community/${selectedCommunity._id}`)
        .then((response) => {
          setGroups(response.data);
        })
        .catch((error) => {
          console.error("Error fetching updated groups", error);
        });
    })
    .catch((error) => {
      console.error("Error creating new group", error);
    });
};


  return (
    <>
      {showModal && (
        <div className="modal">
          <form>
            <label>
              Group Name:
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </label>
            <label>
              Description:
              <textarea
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleModalSubmit}>
              Submit
            </button>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {selectedCommunity && (
        <button
          onClick={() => {
            setSelectedCommunity(null);
            setGroups([]);
          }}
        >
          Back
        </button>
      )}
      <div>
        {!selectedCommunity && (
          <div>
            <h2>Communities</h2>
            {communities.map((community) => (
              <div
                key={community.id}
                onClick={() => handleCommunityClick(community)}
              >
                <h3>{community.name}</h3>
                <p>{community.description}</p>
              </div>
            ))}
          </div>
        )}

        {selectedCommunity && (
          <div>
            <h2>{selectedCommunity.name}</h2>
            {groups.map((group) => (
              <div key={group.id}>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <button onClick={() => handleGroupClick(group)}>Join Group</button>
              </div>
            ))}
            <button onClick={handleCreateGroup}>Add Group</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
