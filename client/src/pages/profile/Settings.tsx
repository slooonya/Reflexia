import { useState } from 'react';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Button } from '../../components/Button';

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
      <Button onClick={() => setShowConfirm(true)}>Logout</Button>

      {showConfirm && (
        <ConfirmModal title={"Confirm Logout"} message={"Are you sure you want to logout?"} 
                      confirmLabel={"Logout"} onCancel={cancel} onConfirm={logout}/>
      )}
    </>
  );
}