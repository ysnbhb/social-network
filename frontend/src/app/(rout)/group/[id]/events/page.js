import { Event } from '@/components/event';
import '../../../../../styles/groupEvents.css';

export default  async function GroupEvents({ params }) {
  const { id } =  await params;
  return (
    <Event id={id} />
  )
  
}
