import { router } from 'expo-router';

import { client } from '../common';

export type User = {
  id: string;
  phone_number: string;
  name: string;
  email: string;
  fcm_token: string;
  profile_picture_url: string;
  vak_profile: {
    v: number;
    a: number;
    k: number;
  };
};

export const getUser = async (): Promise<{
  user: User;
}> => {
  try {
    const response = await client.get('/user');
    return response.data;
  } catch (error) {
    router.push('/register');

    throw error;
  }
};
