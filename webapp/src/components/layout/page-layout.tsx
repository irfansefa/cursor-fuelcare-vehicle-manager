'use client';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="pt-14 md:pt-16">
      <div className="w-full">
        <div className="container py-6">
          {children}
        </div>
      </div>
    </div>
  );
} 