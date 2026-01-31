import { useState } from 'react';
import { ConfirmModal } from '../../components/ConfirmModal';
import './Settings.css'

export function Settings() {
  const [showConfirm, setShowConfirm] = useState(false);

  function logout() {
    console.log("Logged out");
  }

  function cancel() {
    setShowConfirm(false);
  }

  return (
    <>
      <button className="logout" onClick={() => setShowConfirm(true)}>Logout</button>

      {showConfirm && (
        <ConfirmModal title={"Confirm Logout"} message={"Are you sure you want to logout?"} 
                      confirmLabel={"Logout"} onCancel={cancel} onConfirm={logout}/>
      )}
    </>
  );
}