import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'ProductHub',
  description: 'Manage your products easily with ProductHub',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
