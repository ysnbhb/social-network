'use client';
import '../../../styles/groupHome.css';
import GroupNav from '../../../components/groupNav';

export default function RootLayout({ children }) {

  return (
    <div>
        <main className="main-content">
        <GroupNav />
        {children}
        </main>
    </div>
  );
}