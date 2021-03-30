import Follow from '@component/MyBoard/MyBoard__Follow';

export default function Follows({id, tab}) {
  
  return <Follow routeId={id} routeTab={tab} />;
}

export async function getServerSideProps(context) {
  return {
    props: {id:context.query.id, tab:context.query.tab},
  };
}