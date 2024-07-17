import { client } from './common';

// Types for the lesson structure
interface Lesson {
  lesson_id: string;
  completed: boolean;
  title: string;
  key_points: string[];
  image_url: string;
  thumbnail_url: string;
}

// Type for the summary
interface Summary {
  title: string;
  image_url: string;
  total: number;
  completed: number;
}

// Main type for the entire response
export interface EnvClassResponse {
  summary: Summary;
  lessons: Lesson[];
}

// Updated function with the new type
export const getEnvClass = async (): Promise<EnvClassResponse> => {
  const response = await client.get('/lesson/env');
  return response.data;
};
