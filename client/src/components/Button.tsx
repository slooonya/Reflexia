import { Link } from 'react-router';
import type { ReactNode, MouseEventHandler } from 'react';
import './Button.css'

interface ButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler;
  variant?: 'primary' | 'secondary' | 'accent';
  to?: string;
  icon?: string;
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', to, icon, className= '', ...props}: ButtonProps) {
  const fullClassName = `btn ${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={fullClassName} {...props}>
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