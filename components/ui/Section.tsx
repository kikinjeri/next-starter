type SectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section className={`section ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
}
