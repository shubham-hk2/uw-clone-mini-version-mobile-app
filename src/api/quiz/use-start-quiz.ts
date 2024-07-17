import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = { quiz_id: string };
type Response = any;

export const useStartQuiz = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: `quiz?quiz_id=${variables.quiz_id}`,
      method: 'POST',
    }).then((response) => response.data),
});
