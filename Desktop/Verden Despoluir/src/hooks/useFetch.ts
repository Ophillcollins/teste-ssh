import { useEffect, useState } from 'react';
import api from '../service/api';

// options? podemos passar headers e options

export function useFetch<T = unknown>(url: string, dispatch?: string) {
  const [data, setData] = useState<T | any>([''] as any);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get(url)
      .then((response: any) => {
        setData('');
        setData(response.data);
      })
      .catch((err: any) => {
        console.log(err);
        console.log(err.response);
        setError(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [dispatch]);

  return {
    data,
    isFetching,
    error,
  };
}
