'use client';

import React, { ReactNode } from 'react';

export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <p className="text-gray-600 text-lg">Loading CV Hero...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
