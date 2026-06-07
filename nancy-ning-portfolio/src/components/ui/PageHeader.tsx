interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base font-sans text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
