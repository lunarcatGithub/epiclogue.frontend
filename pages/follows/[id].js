import React from 'react';
import Follow from '@component/MyBoard/MyBoard__Follow';

// export default function Follows({id = null, tab = null}) {
//   return ( <Follow routeId={id} routeTab={tab} /> );
// }

export default function Follows({id = null, tab = null}) {
  return ( <Follow routeId={id} routeTab={tab} /> );
}
// export async function getServerSideProps(context) {
//   console.log(context)

//   return {
//     props: {id:context?.query?.id, tab:context?.query?.tab},
//   };
// }