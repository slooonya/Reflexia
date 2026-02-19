import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { login } from '../../api/auth';

import GoogleIcon from '../../assets/icons/google-icon.svg';
import './AuthForm.css';
import axios from 'axios';

export function SignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const data = await login({ email, password });
      localStorage.setItem("access_token", data.access_token);

      navigate("/gallery");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || "Invalid email or password");
      } else {
        setError("Something went wrong");
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