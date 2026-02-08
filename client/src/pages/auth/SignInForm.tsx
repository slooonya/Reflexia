import { Button } from '../../components/Button';

import GoogleIcon from '../../assets/icons/google-icon.svg';
import './AuthForm.css';

export function SignInForm() {
  return (
    <div className="auth-form signin">
      <div className="form-intro">
        <h2>Welcome back</h2>
        <p>Continue your journey toward mindful media consumption.</p>
      </div>

      <input type="email" placeholder="Email"/>
      <input type="password" placeholder="Password"/>

      <Button>Sign in with Email</Button>

      <div className="auth-divider">
        <div className="line" />
        <span>Or continue with</span>
        <div className="line" />
      </div>

      <Button variant="secondary" icon={GoogleIcon}>Google</Button>
    </div>
  );
}