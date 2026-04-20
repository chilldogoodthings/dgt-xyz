export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bare-wrapper">
      {/* No Header or Footer components here. 
          Just the raw content of whatever page is inside this group.
      */}
      {children}
    </div>
  );
}
