import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { OTPResponse } from './types';

type Variables = { phone_number: string };
type Response = OTPResponse;

export const useGenerateOTP = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    try {
      const response = await client({
        url: 'user/register',
        method: 'POST',
        data: variables,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});
