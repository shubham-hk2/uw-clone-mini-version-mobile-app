import { usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { queryClient } from '@/api';
import { useAnswersStore } from '@/core/stores/answers-store';
import { Button, View } from '@/ui';

export default function NextBtn({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions_length,
  setActiveIndex,
  questionId,
  selectedAnswerIndex,
}: {
  isChosenOption: boolean;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  questions_length: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  questionId: string;
  selectedAnswerIndex: number;
  id?: any;
}) {
  const { addAnswer, answers, clearAnswers } = useAnswersStore();
  const pathname = usePathname();

  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeTaken((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeTaken]);

  const handleNext = async () => {
    // Add the answer to the store
    addAnswer({
      question_id: questionId,
      selected_answer_index: selectedAnswerIndex,
      time_taken: timeTaken,
    });

    const isLastQuestion = questions_length - 1 === currentQuestionIndex;
    if (isLastQuestion) {
      // Submit answers

      if (pathname.includes('vak-questions')) {
      } else {
        queryClient.invalidateQueries({
          queryKey: ['user', 'quizzes'],
        });
      }

      // Submit the answers
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setActiveIndex(-1);
    }
    // Reset the timer
    setTimeTaken(0);
  };

  return (
    <View style={styles.next_btn_container}>
      <Button
        label={
          questions_length - 1 === currentQuestionIndex ? 'Submit' : 'Next'
        }
        style={[styles.next_btn]}
        onPress={handleNext}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  next_btn_container: {
    flex: 1,
    fontFamily: 'Poppins_700Bold',
  },
  next_btn: {
    padding: 15,
    borderRadius: 12,
    width: '100%',
  },
  next_btn_text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  disabledButton: {
    backgroundColor: '#F2F5F7',
  },
});
