import React from 'react';

const Pill = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full gap-1 bg-background-raised rounded-[4px] px-2 py-1">
      {children}
    </div>
  );
};

export default Pill;
