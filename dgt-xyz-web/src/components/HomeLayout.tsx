interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    /* This is now purely the 'Stage' for your content */
    <div className="landing-page-frame" style={{ padding: "2rem" }}>
      {/* No Header or Footer here! 
            They are already provided by (main)/layout.tsx 
        */}
      {children}
    </div>
  );
}
