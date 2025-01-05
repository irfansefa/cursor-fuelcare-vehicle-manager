'use client';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
} 