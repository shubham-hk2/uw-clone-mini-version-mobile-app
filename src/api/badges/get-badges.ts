import { client } from '../common';

export type Badge = {
  title: string;
  description: string;
  lottie_url: string;
  unlocked: boolean;
  image_url: string;
};

export const getBadges = async (): Promise<{
  badges: Badge[];
}> => {
  const response = await client.get('/badges');
  return response.data;
};
