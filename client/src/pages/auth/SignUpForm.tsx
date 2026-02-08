import { Button } from '../../components/Button';

import GoogleIcon from '../../assets/icons/google-icon.svg';
import './AuthForm.css';

export function SignUpForm() {
  return (
    <div className="auth-form signup">
      <div className="form-intro">
        <h2>Create account</h2>
        <p>Begin your journey toward mindful media consumption.</p>
      </div>

      <input type="email" placeholder="Email"/>
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />

      <Button>Create account</Button>

      <div className="auth-divider">
        <div className="line" />
        <span>Or continue with</span>
        <div className="line" />
      </div>

      <Button variant="secondary" icon={GoogleIcon}>Google</Button>
    </div>
  );
}