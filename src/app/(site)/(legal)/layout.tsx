import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="pt-20 mx-4 md:mx-5">{children}</div>;
}
