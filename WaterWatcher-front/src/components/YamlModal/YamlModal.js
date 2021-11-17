
import React, { useState } from "react";
import Modal from "../../components/Utils/Modal/Modal";

import { FaClone} from "react-icons/fa";

export default function YamlModal(props) {
  const [copied, setCopied] = useState(false);
  let YAMLdraft = "sensor:";
  const confirmCopyStyle = {
    margin: "1px",
    color: "green",
    fontSize: '.8rem',
  };

  const buttonstyle={
        cursor: 'pointer',
        backgroundColor:'#262675',
        color: 'white',
        border: '0px solid white',
        borderRadius: '4px',
        padding: '5px',
        margin:'5px 0px'
  }
  props.devices.forEach((device) => {
    YAMLdraft += `
  - platform: rest 
    resource: https://waterwatcher-back.herokuapp.com/api/data/lastData 
    headers:
      authorization:  ${localStorage.getItem("token")}
      idboard: ${device.idBoard}
    name: ${device.name}
    unit_of_measurement: L
    value_template: "{{ value_json.data.volume}}"`;
  });

  const copyHandler = () => {
    navigator.clipboard.writeText(YAMLdraft);
    setCopied(true);
  };
  return (
    <div>
      <>
        <Modal title="HomeAssitant YAML script" onCancel={props.onCancel}>
          <h2>Copy this to HomeAssistant to visualize your data</h2>
          {/* <button style={buttonstyle} onClick={copyHandler}>Copy <FaClone></FaClone></button> */}
          {copied && <p style={confirmCopyStyle}>Copied to clipboard!</p>}
          <textarea readOnly value={YAMLdraft}></textarea>
        </Modal>
      </>
    </div>
  );
}
