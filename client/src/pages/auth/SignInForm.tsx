import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import { FormInput } from '../../components/FormInput';
import { login } from '../../api/auth';

import axios from 'axios';
import GoogleIcon from '../../assets/icons/google-icon.svg';
import './AuthForm.css';

export function SignInForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reason = params.get("reason");
 
  let message = location.state?.message;

  if (reason === "expired") {
    message = "Your session has expired. Please sign in again.";
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    if (error) setError("");
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (error) setError("");
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const data = await login({ email, password });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token)

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

  function handleGoogleLogin() {
    window.location.href = "/api/auth/google";
  }

  return (
    <form className="auth-form signin" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="form-intro">
        <h2>Welcome back</h2>
        <p>Continue your journey toward mindful media consumption.</p>
      </div>

      {error && (
        <div className="form-error-banner">
          {error}
        </div>
      )}

      {message && !error && !email && !password && (
        <div className="form-success-banner">
          {message}
        </div>
      )}

      <FormInput type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <FormInput type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />

      <Button type="submit" disabled={loading || !email || !password || error != ""}>Sign in with Email</Button>

      <div className="auth-divider">
        <div className="line" />
        <span>Or continue with</span>
        <div className="line" />
      </div>

      <Button variant="secondary" icon={GoogleIcon} onClick={handleGoogleLogin}>Google</Button>
    </form>
  );
}