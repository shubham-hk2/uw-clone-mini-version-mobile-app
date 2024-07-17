import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Question, Statistics } from '../get-quizzes';

type Variables = { id: string; data: any };

export type QuizResult = {
  completed: boolean;
  date_completed: number;
  date_created: number;
  id: string;
  language: string;
  phone_number: string;
  questions: Question[];
  quiz_id: string;
  release_date: string;
  statistics: Statistics;
};

export const useSubmitDetails = createMutation<
  QuizResult,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      url: `results?id=${variables.id}`,
      method: 'POST',
      data: { results: variables.data },
    }).then((response) => response.data),
});
