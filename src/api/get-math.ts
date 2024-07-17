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
export interface MathClassResponse {
  summary: Summary;
  lessons: Lesson[];
}

export const getMathClass = async (): Promise<MathClassResponse> => {
  const response = await client.get('/lesson/math');
  return response.data;
};
