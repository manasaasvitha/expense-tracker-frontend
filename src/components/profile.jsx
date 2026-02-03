import React, { useState } from "react";
import Navbar from "./Navbar";
import API from "../api/axios";
import { toast } from "react-toastify";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(storedUser?.name);
  const [email, setEmail] = useState(storedUser?.email);

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        "/auth/update-profile",
        { name, email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile updated successfully");
      setEdit(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">


          <div className="profile-avatar">
            {name?.charAt(0).toUpperCase()}
          </div>

          {!edit ? (
            <>
              <h2>{name}</h2>
              <p>{email}</p>

              <div className="profile-info">
                <div className="info-box">
                  <span className="info-label">Status</span>
                  <span className="info-value active">Active</span>
                </div>
              </div>


              <button className="edit-profile-btn" onClick={() => setEdit(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <input
                className="profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="edit-profile-btn" onClick={saveProfile}>
                Save Changes
              </button>
            </>
          )}

          

        </div>
      </div>
    </>
  );
};

export default Profile;
