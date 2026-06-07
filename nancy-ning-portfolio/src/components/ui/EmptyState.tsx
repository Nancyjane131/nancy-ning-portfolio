interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-24">
      <p className="text-base font-sans text-text-secondary text-center max-w-sm leading-relaxed">
        {message}
      </p>
    </div>
  );
}
