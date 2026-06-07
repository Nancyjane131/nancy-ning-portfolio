interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-border text-text-secondary">
      {label}
    </span>
  );
}
