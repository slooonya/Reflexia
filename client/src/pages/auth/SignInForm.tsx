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

      <button className="primary-btn">Sign in with Email</button>

      <div className="auth-divider">
        <div className="line" />
        <span>Or continue with</span>
        <div className="line" />
      </div>

      <button className="secondary-btn">
        <img src={GoogleIcon} />
        Google
      </button>
    </div>
  );
}