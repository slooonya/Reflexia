import { useState } from 'react';
import { Toggle } from '../../components/Toggle';
import { SignUpForm } from './SignUpForm';
import { SignInForm } from './SignInForm';
import { PolaroidSwiper } from '../../components/PolaroidSwiper';

import './AuthPage.css';
import { Link } from 'react-router';

export function AuthPage() {
  const [mode, setMode] = useState("Sign In");

  return (
    <>
      <title>Authentication</title>

      <div className="auth-page-content">
        <div className="auth-left-container">
          <Link to="/" className="logo-link">Reflexia</Link>
          <div className="swiper-container">
            <PolaroidSwiper />
          </div>
        </div>

        <div className="auth-right-container">
          <div className="toggle-container">
            <Toggle options={["Sign In", "Sign Up"]} active={mode} variant="black" onChange={setMode} />
          </div>

          <div className={`auth-form-container ${mode === "Sign Up" ? "signup" : "signin"}`}>
            <SignInForm />
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
}