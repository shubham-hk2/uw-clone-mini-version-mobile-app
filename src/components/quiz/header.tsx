import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { useAnswersStore } from '@/core/stores/answers-store';
import type { ProgressBarRef } from '@/ui';
import { Text, View } from '@/ui';
import { ProgressBar } from '@/ui';

export default function Header({
  totalQuestions,
  currentQuestionIndex,
  time,
  isTimeLeft = true,
  setCurrentQuestionIndex = () => {},
  questionId,
  selectedAnswerIndex,
  questions_length,
  id,
  setActiveIndex,
}: {
  totalQuestions: number;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  time?: number;
  isTimeLeft?: boolean;
  questionId: string;
  selectedAnswerIndex: number;
  questions_length: number;
  id: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [timeLeft, setTimeLeft] = useState(time);
  const progressBarRef = useRef<ProgressBarRef>(null);
  const { addAnswer } = useAnswersStore();

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
      selected_answer_index: selectedAnswerIndex ?? 0,
      time_taken: timeTaken,
    });

    const isLastQuestion = questions_length - 1 === currentQuestionIndex;
    if (isLastQuestion) {
      router.push({
        pathname: '/results',
        params: { quiz_id: id },
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setActiveIndex(-1);
    }
    // Reset the timer
    setTimeTaken(0);
  };

  useEffect(() => {
    if (isTimeLeft) {
      if (time) {
        setTimeLeft(time);
        let progress = 0;
        const interval = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            if (prevTimeLeft ?? 0) {
              progress = progress + 100 / time;
              progressBarRef.current?.setProgress(progress);
              if (prevTimeLeft) return prevTimeLeft - 1;
            } else {
              // progressBarRef.current?.setProgress(100);
              // clearInterval(interval);
              // handleNext(); // Handle the next question or submission
              return 0;
            }
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    } else {
      // Calculate progress based on current question index
      const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
      progressBarRef.current?.setProgress(progress);
    }
  }, [currentQuestionIndex, time, isTimeLeft, totalQuestions]);

  return (
    <>
      <View style={styles.header_container}>
        <View style={styles.page_number_container}>
          <Text style={styles.progress_text}>
            {currentQuestionIndex + 1}/{totalQuestions}
          </Text>
        </View>
        <View style={styles.logo_container}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{ width: 58, height: 32.92 }}
          />
        </View>
        <View style={styles.question_mark_container}>
          <FontAwesome name="question-circle-o" size={24} color="black" />
        </View>
      </View>

      <ProgressBar
        initialProgress={0}
        ref={progressBarRef}
        isTimeLeft={isTimeLeft}
        innerText={isTimeLeft ? `${timeLeft}s` : ''}
        isGradient={true}
        gradientColors={['#FF6900', '#DB6614']}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  page_number_container: {
    alignItems: 'flex-start',
  },
  progress_bar_container: {
    flex: 5,
  },
  progress_text: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    flexShrink: 1,
  },
  logo_container: {
    alignItems: 'center',
  },
  question_mark_container: {
    alignItems: 'flex-end',
  },
});
