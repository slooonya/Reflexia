import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Polaroid } from "../../components/Polaroid";
import { Toggle } from "../../components/Toggle";
import { EditProfile } from "./EditProfile";
import { Settings } from "./Settings";

import TestPfp from '../../assets/images/test-pfp.png';
import './UserProfilePage.css';

export function UserProfilePage() {
  const [mode, setMode] = useState("Editing");

  return (
    <>
      <title>Profile</title>

      <Navbar />

      <div className="profile-page-content">
        <div className="profile-left-container">
          <div className="pfp-container">
            <Polaroid imageSrc={TestPfp} caption={"Slooonya"}/>
          </div>
        </div>
        
        <div className="profile-right-container">
          <Toggle options={["Editing", "Settings"]} active={mode} variant="black" onChange={setMode}/>

          <div className={`option-container ${mode === "Editing" ? "edit" : "settings"}`}>
            <div className="view-mode edit">
              <EditProfile />
            </div>
            <div className="view-mode settings">
              <Settings />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}