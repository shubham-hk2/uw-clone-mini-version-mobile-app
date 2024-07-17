import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';

type Variables = void;
type Response = any;

export const useGetUser = createQuery<Response, Variables, AxiosError>({
  queryKey: ['user'],
  fetcher: () => {
    return client.get(`/user`).then((response) => response.data);
  },
});
