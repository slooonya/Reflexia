import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Polaroid } from "../../components/Polaroid";
import { Toggle } from "../../components/Toggle";
import { Loader } from "../../components/Loader";
import { EditProfile } from "./EditProfile";
import { Settings } from "./Settings";
import type { Profile } from "../../types/profile";
import { getProfile } from "../../api/profile";

import TestPfp from '../../assets/images/test-pfp.png';
import './UserProfilePage.css';

export function UserProfilePage() {
  const [mode, setMode] = useState("Editing");
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  if (!user) return <Loader />;

  return (
    <>
      <title>Profile</title>

      <Navbar />

      <div className="profile-page-content">
        <div className="profile-left-container">
          <div className="pfp-container">
            <Polaroid imageSrc={user.pfpUrl ?? TestPfp} caption={user.username}/>
          </div>
        </div>
        
        <div className="profile-right-container">
          <Toggle options={["Editing", "Settings"]} active={mode} variant="black" onChange={setMode}/>

          <div className={`option-container ${mode === "Editing" ? "edit" : "settings"}`}>
            <div className="view-mode edit">
              <EditProfile user={user} onProfileUpdated={setUser}/>
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