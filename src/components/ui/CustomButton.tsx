import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  to?: string; // For react-router Link
  as?: ElementType; // For polymorphic components
}

const CustomButton = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled,
  icon,
  iconPosition = 'left',
  to,
  as: Component = 'button',
  ...props
}: CustomButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-franchise-blue hover:bg-franchise-blue/90 text-white',
    secondary: 'bg-franchise-teal hover:bg-franchise-teal/90 text-white',
    outline: 'border border-franchise-blue hover:bg-franchise-blue/10 text-franchise-blue',
    ghost: 'hover:bg-franchise-blue/10 text-franchise-blue',
    link: 'underline-offset-4 hover:underline text-franchise-blue p-0 h-auto',
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 py-2',
    lg: 'h-12 px-6 py-3 text-lg',
  };
  
  const buttonStyles = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  if (to && Component === 'button') {
    return (
      <Link to={to} className={buttonStyles} {...props}>
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </Link>
    );
  }
  
  return (
    <Component
      className={buttonStyles}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </Component>
  );
};

export default CustomButton;
