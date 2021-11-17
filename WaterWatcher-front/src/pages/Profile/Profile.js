import React, { useState, useEffect } from "react";
import ProfileForm from "../../components/ProfileComponents/ProfileForm";
import LoadingSpinner from "../../components/Utils/LoadingSpinner/LoadingSpinner";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUser() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/user`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not get user");
      }
      setUser(data.user);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
      return data.user;
    } catch {
      alert("Something went wrong while getting user Data");
    }
  }

  async function updateHandler(userData) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/user`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not edit user");
      }
      getUser();
    } catch {}
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {(!user || isLoading) && <LoadingSpinner />}
      {user && !isLoading && (
        <ProfileForm user={user} updateUser={updateHandler}></ProfileForm>
      )}
    </div>
  );
}
