import '../../../../styles/groupHome.css';
import GroupNav from '../../../../components/groupNav';

export default async function RootLayout({ children  , params}) {
  const { id } = await params;  
  return (
    <div>
        <main className="main-content">
        <GroupNav id={id} />
        {children}
        </main>
    </div>
  );
}