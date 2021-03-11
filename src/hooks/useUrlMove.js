import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useUrlMove = () => {
  const router = useRouter();
  const _useUrlMove = useCallback((url) => {
    router.push(url ,url.as)
  }, [router]);
  return [_useUrlMove];
};
