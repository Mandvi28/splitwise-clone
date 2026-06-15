import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");

  // GET GROUPS
  const fetchGroups = async () => {
    try {
      const res = await api.get("groups/list/");
      setGroups(res.data);
    } catch (err) {
      console.log("Error fetching groups", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // CREATE GROUP
  const createGroup = async () => {
    if (!name) return;

    try {
      await api.post("groups/", {
        name: name,
      });

      setName("");
      fetchGroups();
    } catch (err) {
      console.log("Error creating group", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-4">Groups</h1>

      {/* CREATE GROUP */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name"
          className="border p-2 rounded w-64"
        />

        <button
          onClick={createGroup}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* GROUP LIST */}
      <div className="grid gap-4">

        {groups.length === 0 ? (
          <p>No groups found</p>
        ) : (
          groups.map((g) => (
            <GroupCard key={g.id} group={g} />
          ))
        )}

      </div>
    </div>
  );
}

/* =========================
   GROUP CARD COMPONENT
========================= */

function GroupCard({ group }) {
  const [userId, setUserId] = useState("");

  const addMember = async () => {
    if (!userId) return;

    try {
      await api.post(`groups/${group.id}/members/add/`, {
        user_id: userId,
      });

      alert("Member added successfully ✅");
      setUserId("");
    } catch (err) {
      console.log("Error adding member", err);
      alert("Failed to add member ❌");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">

      {/* GROUP NAME */}
      <h2 className="text-lg font-bold mb-2">{group.name}</h2>

      {/* ADD MEMBER */}
      <div className="flex gap-2 items-center">
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="border p-1 rounded w-40"
        />

        <button
          onClick={addMember}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add Member
        </button>
      </div>

    </div>
  );
}