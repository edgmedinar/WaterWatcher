import React, { useEffect, useState } from "react";
import DeviceForm from "../../components/DevicesComponents/DeviceForm/DeviceForm";
import CardContainer from "../../components/Utils/CardContainer/CardContainer";
import DeviceCard from "../../components/DevicesComponents/DeviceCard/DeviceCard";
import NewCard from "../../components/Utils/NewCard/NewCard";
import Modal from "../../components/Utils/Modal/Modal";
import Error from "../../components/Utils/Error/Error";
import YamlModal from "../../components/YamlModal/YamlModal";
import classes from "./Devices.module.css";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [YAMLstring, setYAML] = useState("sensor");
  const [showYAML, setshowYAML] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const dismissModal = () => {
    setShowModal(false);
  };

  const showYamlModal = () => {
    setshowYAML(true);
  };

  const dismissYamlModal = () => {
    setshowYAML(false);
  };

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
      setDevices(data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    } catch {
      alert("Something went wrong while getting user Devices");
      setError(true);
    }
  }

  useEffect(() => {
    async function fetchDevices() {
      await getUserDevices().then(() => {});
    }

    fetchDevices();
  }, []);

  async function postUserDevice(newDevice) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/boards`,
        {
          method: "POST",
          body: JSON.stringify(newDevice),
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not post device");
      }

      getUserDevices();
      dismissModal();
    } catch {
      alert("Something went wrong while posting new Device");
      setError(true);
    }
  }


  return (
    <>
      {devices.length>0 && <button className={classes.buttonYaml} onClick={showYamlModal}>
        Show YAML
      </button>}
      {showYAML && (
        <YamlModal onCancel={dismissYamlModal} devices={devices}></YamlModal>
      )}
      <CardContainer elements={devices} isLoading={isLoading}>
        <>
          {error && <Error></Error>}
          {!error && showModal && (
            <Modal
              title="New Device"
              onConfirm={postUserDevice}
              onCancel={dismissModal}
            >
              <DeviceForm
                yaml={YAMLstring}
                onCancel={dismissModal}
                onSave={postUserDevice}
              ></DeviceForm>
            </Modal>
          )}
          {!error &&
            devices &&
            devices.map((device) => (
              <DeviceCard key={device._id} device={device}></DeviceCard>
            ))}
          {!error && <NewCard onClick={showModalHandler}></NewCard>}
        </>
      </CardContainer>
    </>
  );
}
