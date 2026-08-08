import { Link } from 'react-router';
import type { ButtonHTMLAttributes, ReactNode, ComponentType, SVGProps } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  to?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', to, icon: Icon, className= '', ...props}: ButtonProps) {
  const fullClassName = `btn ${variant} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="btn-icon" />}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={fullClassName}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={fullClassName} {...props}>
      {content}
    </button>
  )
}