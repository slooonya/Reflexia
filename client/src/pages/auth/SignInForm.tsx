import { useState } from 'react';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { login } from '../../api/auth';

import GoogleIcon from '../../assets/icons/google-icon.svg';
import './AuthForm.css';
import axios from 'axios';

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);

      // TODO: redirect here
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Invalid email or password");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form signin">
      <div className="form-intro">
        <h2>Welcome back</h2>
        <p>Continue your journey toward mindful media consumption.</p>
      </div>

      {error && (
        <div className="form-error-banner">
          {error}
        </div>
      )}

      <FormInput type="email" placeholder="Email" value={email} onChange={setEmail} />
      <FormInput type="password" placeholder="Password" value={password} onChange={setPassword} />

      <Button onClick={handleSubmit} disabled={loading || !email || !password }>Sign in with Email</Button>

      <div className="auth-divider">
        <div className="line" />
        <span>Or continue with</span>
        <div className="line" />
      </div>

      <Button variant="secondary" icon={GoogleIcon}>Google</Button>
    </div>
  );
}