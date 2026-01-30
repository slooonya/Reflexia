import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Polaroid } from "../../components/Polaroid";
import { Toggle } from "../../components/Toggle";
import { EditProfile } from "./EditProfile";
import { Settings } from "./Settings";

import TestPfp from '../../assets/images/test-pfp.png';
import './UserProfilePage.css';

export function UserProfilePage() {
  const [mode, setMode] = useState("Edit Profile");

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
          <Toggle options={["Edit Profile", "Settings"]} active={mode} variant="black" onChange={setMode}/>

          {mode === "Edit Profile" && (
            <EditProfile />
          )}
          
          {mode === "Settings" && (
            <Settings />
          )}
        </div>
      </div>
    </>
  );
}