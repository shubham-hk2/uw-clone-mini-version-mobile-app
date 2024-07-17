import type { User } from '../get-user';

export type OTPResponse = {
  status: string;
  message: string;
  token: string;
  'TODO-REMOVE': string;
  user: User | null;
};
