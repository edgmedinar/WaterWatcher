import React, { useEffect, useState } from "react";
import AlertCard from "../../components/AlertComponents/AlertCard/AlertCard";
import AlertForm from "../../components/AlertComponents/AlertForm/AlertForm";
import NewCard from "../../components/Utils/NewCard/NewCard";
import CardContainer from "./../../components/Utils/CardContainer/CardContainer";
import Modal from "../../components/Utils/Modal/Modal";
import EditAlertForm from "../../components/AlertComponents/EditAlertForm/EditAlertForm";
import Error from "../../components/Utils/Error/Error";

export default function Alerts() {
  const [showModal, setShowModal] = useState(false);
  const [editAlert, setEditAlert] = useState(null);
  const [error, setError] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState(null);
  const [user, setUser] = useState(null);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const dismissModal = () => {
    setShowModal(false);
  };

  const showEditModal = (alertID) => {
    setEditAlert(alertID);
  };

  const dismissEditModal = () => {
    setEditAlert(null);
  };

  async function getUser() {
    try {
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
      return data.user;
    } catch {
      alert("Something went wrong while getting user Data");
      setError(true);
      setIsLoading(false);
    }
  }

  async function getUserAlerts() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/alerts`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not get alerts.");
      }
      setAlerts(data.alerts);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    } catch {
      alert("Something went wrong while getting alerts");
      setError(true);
      setIsLoading(false);
    }
  }

  async function getUserDevices() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/boards`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not get user devices");
      }
      localStorage.setItem("devices", data.data);
      setDevices(data.data);
    } catch {
      setError(true);
      alert("Could not get user devices");
    }
  }

  useEffect(() => {
    getUserAlerts();
    getUserDevices();
    getUser();
  }, []);

  async function postAlert(newAlert) {
    console.log(newAlert);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/alerts`,
        {
          method: "POST",
          body: JSON.stringify(newAlert),
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not post alert");
      }

      getUserAlerts();
      dismissModal();
    } catch {
      alert("Something went wrong");
    }
  }

  const updateVolumeURL =

    `${process.env.REACT_APP_BACKEND_URL}/alerts/updateVolume`;
  const updateScheduleURL =
    `${process.env.REACT_APP_BACKEND_URL}/alerts/updateSchedule`;
  const updateTimeURL =
    `${process.env.REACT_APP_BACKEND_URL}/alerts/updateTime`;

    
  async function putAlert(editedAlert) {
    let updateURL =
      editedAlert.type === "VOLUME"
        ? updateVolumeURL
        : editedAlert.type === "SCHEDULE"
        ? updateScheduleURL
        : updateTimeURL;

    try {
    } catch {}
    const response = await fetch(updateURL, {
      method: "PUT",
      body: JSON.stringify(editedAlert),
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not edit alert");
    }

    getUserAlerts();
    dismissEditModal();
  }

  async function deleteAlert(idAlert) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/alerts/${idAlert}`,
        {
          method: "DELETE",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not DELETE alert");
      }

      getUserAlerts();
      dismissModal();
    } catch {
      alert("Something went wrong");
    }
  }

  return (
    <>
      {error && <Error></Error>}
      {!error && showModal && (
        <Modal title="New Alert" onConfirm={postAlert} onCancel={dismissModal}>
          <AlertForm
            user={user}
            devices={devices}
            onCancel={dismissModal}
            onSave={postAlert}
          ></AlertForm>
        </Modal>
      )}
      {!error && editAlert && (
        <Modal
          title="Edit Alert"
          onConfirm={putAlert}
          onCancel={dismissEditModal}
        >
          <EditAlertForm
            user={user}
            alert={editAlert}
            devices={devices}
            onCancel={dismissEditModal}
            onSave={putAlert}
          ></EditAlertForm>
        </Modal>
      )}
      {!error && (
        <CardContainer
          elements={alerts}
          isLoading={isLoading}
          getElements={getUserAlerts}
        >
          {alerts &&
            alerts.map((alert) => (
              <AlertCard
                key={alert._id}
                alert={alert}
                onEdit={showEditModal}
                onDelete={deleteAlert}
              ></AlertCard>
            ))}
          <NewCard Modaltitle="New Alert" onClick={showModalHandler}></NewCard>
        </CardContainer>
      )}
    </>
  );
}
