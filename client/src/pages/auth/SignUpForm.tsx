import { useState } from 'react';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { validateEmail, validatePassword } from '../../utils/validator';

import GoogleIcon from '../../assets/icons/google-icon.svg';
import './AuthForm.css';

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clicked, setClicked] = useState({ email: false, password: false, confirmPassword: false });

  const emailError = clicked.email ? validateEmail(email) : "";
  const passwordError = clicked.password ? validatePassword(password) : "";
  const confirmPasswordError = clicked.confirmPassword && confirmPassword !== password ? "Passwords do not match" : "";

  const isValid = !emailError && !passwordError && !confirmPasswordError;

  function handleSubmit() {
    setClicked({ email: true, password: true, confirmPassword: true });
    if (!isValid) return

    // TODO: backend req to register
  }

  return (
    <div className="auth-form signup">
      <div className="form-intro">
        <h2>Create account</h2>
        <p>Begin your journey toward mindful media consumption.</p>
      </div>

      <FormInput type="email" placeholder="Email" value={email} onChange={setEmail} 
                 onBlur={() => setClicked(c => ({ ...c, email: true }))} error={emailError} />

      <FormInput type="password" placeholder="Password" value={password} onChange={setPassword} 
                 onBlur={() => setClicked(c => ({ ...c, password: true }))} error={passwordError} />

      <FormInput type="password" placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} 
                 onBlur={() => setClicked(c => ({ ...c, confirmPassword: true }))} error={confirmPasswordError} />

      <Button disabled={!isValid} onClick={handleSubmit}>Create account</Button>

      <div className="auth-divider">
        <div className="line" />
        <span>Or continue with</span>
        <div className="line" />
      </div>

      <Button variant="secondary" icon={GoogleIcon}>Google</Button>
    </div>
  );
}