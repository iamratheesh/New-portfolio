import '@/styles/globals.scss';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Background_base from '@/components/layout/background_base/Background_base';

export const metadata = {
  title: 'Portfolio',
  description: 'Modern Next.js Portfolio'
};



export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body>
        <Background_base>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        </Background_base>
      </body>
    </html>
  );
}
