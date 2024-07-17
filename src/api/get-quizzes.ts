import { client } from './common';

export type Question = {
  question_id: string;
  question_text: string;
  question_image_url: string;
  text_answers: string[];
  image_answer_urls: string[];
  correct_answer_index: number;
  response: number;
  allowed_time: number;
  coaching: {
    v_text: string;
    v_image_url: string;
    a_mp3_url: string;
    k_text: string;
  };
};

export type Statistics = {
  summary_text: string;
  percentage: number;
  questions_total: number;
  questions_correct: number;
  questions_incorrect: number;
  category_scores: {
    compare: number;
    pattern: number;
    shape: number;
    math: number;
    sinhala: number;
    sentence: number;
    time: number;
    logic: number;
  };
  time_total: number;
  time_average: number;
};

export type Quiz = {
  id: string;
  quiz_id: string;
  release_date: string;
  phone_number: string;
  language: string;
  questions: Question[];
  statistics: Statistics | null;
  completed: boolean;
  date_created: number;
  date_completed: number | null;
};

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await client.get('/quiz');
  return response.data;
};
