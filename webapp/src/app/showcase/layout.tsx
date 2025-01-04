import React from 'react';

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Components</h2>
        <nav className="space-y-2">
          <a href="#buttons" className="block text-gray-700 hover:text-gray-900">Buttons</a>
          <a href="#inputs" className="block text-gray-700 hover:text-gray-900">Inputs</a>
          <a href="#forms" className="block text-gray-700 hover:text-gray-900">Forms</a>
          <a href="#cards" className="block text-gray-700 hover:text-gray-900">Cards</a>
          <a href="#layout" className="block text-gray-700 hover:text-gray-900">Layout</a>
          <a href="#navigation" className="block text-gray-700 hover:text-gray-900">Navigation</a>
          <a href="#feedback" className="block text-gray-700 hover:text-gray-900">Feedback</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 