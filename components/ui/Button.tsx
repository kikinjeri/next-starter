type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
}
