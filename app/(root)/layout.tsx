import StreamVideoprovider from '@/providers/StreamProviders';
import { ReactNode } from 'react';


const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoprovider>
        {children}
      </StreamVideoprovider>
    </main>
  );
};

export default RootLayout;