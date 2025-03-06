import HomeFeed from '../../../../components/homeFeed.js';
import '../../../../styles/groupHome.css';

export default async function groupHome({params}) {
  const { id } = await params;  
  return (
    <div>
        <HomeFeed ishome={false} groupid={id} page={`/api/group/posts`}/>
    </div>
  );
}