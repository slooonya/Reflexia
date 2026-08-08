import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Button } from '../../components/Button';
import { logout } from '../../api/auth';
import { SettingRow } from './SettingRow';

import './Settings.css';

export function Settings() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';

    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  async function handleLogout() {
    await logout();
    navigate("/auth", { state: { message: "You have been logged out." } });
  }

  function cancel() {
    setShowConfirm(false);
  }

  return (
    <div className="settings-section">

      <SettingRow title={"Reminders"} description={"Remind me to upload my watch history every month."}>
        <label className="switch">
          <input type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} />
          <span className="switch-slider" />
        </label>
      </SettingRow>

      <SettingRow title={"Dark Mode"} description={"Enable dark mode for the app."}>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)}/>
          <span className="switch-slider" />
        </label>
      </SettingRow>

      <div className="settings-section settings-account">
        <Button onClick={() => setShowConfirm(true)}>Logout</Button>
      </div>

      {showConfirm && (
        <ConfirmModal title={"Confirm Logout"} message={"Are you sure you want to logout?"} 
                      confirmLabel={"Logout"} onCancel={cancel} onConfirm={handleLogout}/>
      )}
    </div>
  );
}