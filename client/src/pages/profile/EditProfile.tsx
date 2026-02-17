import axios from 'axios';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { updateProfile } from '../../api/profile';

import './EditProfile.css';

export function EditProfile({ user, onProfileUpdated }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [clicked, setClicked] = useState({ username: false, email: false, password: false });
  const [serverErrors, setServerErrors] = useState({ username: "", email: "", password: "" });

  const usernameChanged = username !== user.username;
  const emailChanged = email !== user.email;
  const passwordChanged = password.length > 0;

  const usernameError = clicked.username && usernameChanged && !username ? "Username required" : serverErrors.username;
  const emailError = clicked.email && emailChanged && !email ? "Email required" : serverErrors.email;
  const passwordError = clicked.password && passwordChanged && password.length < 8 ? "Password too short" : serverErrors.password;
  const confirmPasswordError = passwordChanged && confirmPassword !== password ? "Passwords do not match" : "";
  
  const hasChanges = usernameChanged || emailChanged || passwordChanged;
  const isValid = !usernameError && !emailError && !passwordError && !confirmPasswordError;

  function clearServerError(field) {
    setServerErrors(e => ({ ...e, [field]: "" }));
  }

  async function handleSubmit() {
    if (!hasChanges) return;

    setClicked({ username: true, email: true, password: true });

    if (!isValid) return;

    const payload: any = {};

    if (usernameChanged) payload.username = username;
    if (emailChanged) payload.email = email;
    if (passwordChanged) payload.password = password;

    try {
      const update = await updateProfile(payload);
      onProfileUpdated(update);

      alert("Profile updated");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (data?.field) {
          setServerErrors(prev => ({ ...prev, [data.field]: data.message }));
        }
      }
    }
  }

  return (
    <>
      <div className="pfp-controls">
        <div className="pfp-upload">
          <label htmlFor="upload" className="btn primary">
            <input type="file" id="upload" accept="image/*"/>
            <span>Update Photo</span>
          </label>
        </div>
        
        <div className="pfp-remove">
          <Button variant="secondary">Remove Image</Button>
        </div>
      </div>

      <div className="text-fields">
        <FormInput type="text" placeholder="Username" value={username} 
                   onChange={(v) => { setUsername(v); clearServerError("username"); }} 
                   onBlur={() => setClicked(c => ({ ...c, username: true }))} error={usernameError} />

        <FormInput type="text" placeholder="Email" value={email} 
                   onChange={(v) => { setEmail(v); clearServerError("email"); }} 
                   onBlur={() => setClicked(c => ({ ...c, email: true }))} error={emailError} />

        <FormInput type="text" placeholder="New password" value={password} 
                   onChange={(v) => {setPassword(v); clearServerError("password"); }} 
                   onBlur={() => setClicked(c => ({ ...c, password: true }))} error={passwordError} />

        <FormInput type="text" placeholder="Confirm Password" value={confirmPassword} 
                   onChange={setConfirmPassword} error={confirmPasswordError}/>
      </div>

      <Button disabled={!isValid} onClick={handleSubmit}>Confirm Changes</Button>
    </>
  );
}