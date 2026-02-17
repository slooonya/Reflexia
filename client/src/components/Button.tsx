import { Link } from 'react-router';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  to?: string;
  icon?: string;
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', to, icon, className= '', ...props}: ButtonProps) {
  const fullClassName = `btn ${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={fullClassName}>
        {icon && <img src={icon} className="btn-icon" />}
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={fullClassName} {...props}>
      {icon && <img src={icon} className="btn-icon" />}
      <span>{children}</span>
    </button>
  )
}