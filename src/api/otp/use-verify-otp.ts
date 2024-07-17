import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { OTPResponse } from './types';

type Variables = { phone_number: string; otp: string };
type Response = OTPResponse;

export const useVerifyOTP = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    try {
      const response = await client({
        url: 'user/verify',
        method: 'POST',
        data: variables,
      });
      return response.data;
    } catch (error) {
      // Handle or re-throw the error based on your error handling strategy
      throw error;
    }
  },
});
