import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

import { type Question as QuestionType } from '@/api/get-quizzes';
import { useStartQuiz } from '@/api/quiz/use-start-quiz';
import Question from '@/components/quiz/question';
import { Text, View } from '@/ui';

import Header from '../components/quiz/header';
import NextBtn from '../components/quiz/next-btn';
export default function Quiz() {
  const params = useLocalSearchParams();
  const quizId = params.quiz_id;
  const [id, setId] = useState('');

  const { mutate, isError, error, isPending, isSuccess } = useStartQuiz({
    onSuccess: (data) => {
      setQuestionsArray(data?.questions);
      setId(data?.id);
    },
  });
  useEffect(() => {
    if (quizId) {
      mutate({ quiz_id: quizId as string });
    }
  }, [mutate, quizId]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [question, setQuestion] = useState<QuestionType>(
    questionsArray?.[currentQuestionIndex]
  );
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    setQuestion(questionsArray?.[currentQuestionIndex]);
  }, [currentQuestionIndex, questionsArray]);

  // const isChosenOption = question.options.some((option) => option.chosen);

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isPending || !questionsArray.length) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6900" />
      </View>
    );
  }

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header  */}
        <View style={styles.header}>
          <Header
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questionsArray?.length}
            time={question?.allowed_time}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            questions_length={questionsArray?.length}
            setActiveIndex={setActiveIndex}
            selectedAnswerIndex={activeIndex}
            questionId={question?.question_id}
            id={id}
          />
        </View>
        {/* Question */}
        <View style={styles.question}>
          <Question
            question={question}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            showResults={false}
          />
        </View>

        {/* Next */}
        <View style={styles.nextbtn}>
          <NextBtn
            isChosenOption={activeIndex !== -1}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            questions_length={questionsArray?.length}
            setActiveIndex={setActiveIndex}
            selectedAnswerIndex={activeIndex}
            questionId={question?.question_id}
            id={id}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flex: 1,
  },
  question: {
    flex: 6,
  },
  nextbtn: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
