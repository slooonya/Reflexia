import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Button } from '../../components/Button';
import { logout } from '../../api/auth';

export function Settings() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/auth", { state: { message: "You have been logged out." } });
  }

  function cancel() {
    setShowConfirm(false);
  }

  return (
    <>
      <Button onClick={() => setShowConfirm(true)}>Logout</Button>

      {showConfirm && (
        <ConfirmModal title={"Confirm Logout"} message={"Are you sure you want to logout?"} 
                      confirmLabel={"Logout"} onCancel={cancel} onConfirm={handleLogout}/>
      )}
    </>
  );
}