import { client } from './common';

export type User = {
  id: string;
  phone_number: string;
  name: string;
  email: string;
  fcm_token: string;
  language: 'si' | 'ta' | 'en';
  profile_picture_url: string;
  vak_profile: {
    v: number;
    a: number;
    k: number;
  } | null;
};

export const getUser = async (): Promise<{
  user: User;
}> => {
  const response = await client.get('/user');
  return response.data;
};
