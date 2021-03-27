import Follow from '@component/MyBoard/MyBoard__Follow';
import { useRouter } from 'next/router';

export default function Follows() {
  const router = useRouter();
  return <Follow route={router.query.id} />;
}
