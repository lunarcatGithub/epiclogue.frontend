import React, { useEffect } from 'react';
import { AdmimMain } from '@Component/Main/AdmimMain';

// Hooks
import { useUrlMove } from '@hooks/useUrlMove';

export default function DashboardPage() {
  // router
  const [goBack] = useUrlMove();

  useEffect(() => {
    // if(){ // 어드민일 경우 통과

    // } else { // 아니면 메인으로
    //   goBack({pathname:'/'})
    // }

  }, []);

  return <AdmimMain />;
}
