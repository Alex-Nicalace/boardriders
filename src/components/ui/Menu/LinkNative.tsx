export function LinkNative({
  children,
  to,
  className,
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
}): JSX.Element {
  return (
    <a className={className} href={to}>
      {children}
    </a>
  );
}
