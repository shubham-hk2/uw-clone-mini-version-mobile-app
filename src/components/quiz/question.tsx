import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Image, Text } from '@/ui';
import FullWidthSkeleton from '@/ui/full-width-skeleton';

const ALPHAPETCHOICES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function Question({
  question,
  activeIndex,
  setActiveIndex,
  showResults,
}: {
  question: any;
  activeIndex: number;
  setActiveIndex: any;
  showResults?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const renderTextAnswers = () => {
    return question.text_answers.map((answer: string, index: number) => {
      const isCorrect = index === question?.correct_answer_index;
      const isChosen = activeIndex === index;
      return (
        <Pressable
          key={index}
          style={[
            styles.options_box,
            showResults
              ? isChosen && isCorrect
                ? styles.option_chosen
                : isCorrect
                ? styles.correct
                : isChosen && !isCorrect
                ? styles.wrong
                : null
              : isChosen
              ? styles.option_chosen
              : null,
          ]}
          onPress={() => !showResults && setActiveIndex(index)}
        >
          <View style={styles.option_container}>
            <Text style={styles.option}>
              <Text style={styles.option_label}>
                {ALPHAPETCHOICES[index]}.{' '}
              </Text>
              {answer}
            </Text>
          </View>
          {showResults && (
            <View style={styles.mark_container}>
              {isCorrect ? (
                <FontAwesome5 name="check-circle" size={24} color="#449803" />
              ) : (
                <FontAwesome5 name="times-circle" size={24} color="#B60000" />
              )}
            </View>
          )}
        </Pressable>
      );
    });
  };

  const renderImageAnswers = () => {
    return question.image_answer_urls.map((option: string, index: number) => {
      const isCorrect = index === question?.correct_answer_index;
      const isChosen = activeIndex === index;

      return (
        <Pressable
          key={index}
          style={[
            styles.image_option_card,
            showResults
              ? isCorrect
                ? styles.correct
                : isChosen
                ? styles.wrong
                : null
              : isChosen
              ? styles.option_chosen
              : null,
          ]}
          onPress={() => !showResults && setActiveIndex(index)}
        >
          <Text style={styles.alphapet_choice}>{ALPHAPETCHOICES[index]}. </Text>
          <Image
            style={styles.image_option}
            key={index}
            source={{ uri: option }}
            contentFit="contain"
          />
          {showResults && (
            <>
              {isCorrect ? (
                <FontAwesome5
                  name="check-circle"
                  size={24}
                  style={styles.mark_image_options}
                  color="#449803"
                />
              ) : (
                <FontAwesome5
                  name="times-circle"
                  size={24}
                  style={styles.mark_image_options}
                  color="#B60000"
                />
              )}
            </>
          )}
        </Pressable>
      );
    });
  };

  return (
    <>
      {question && question?.question_image_url && (
        <View style={styles.image_container}>
          <Image
            style={[styles.image, !imageLoaded && styles.hidden_image]}
            source={{ uri: question?.question_image_url }}
            contentFit="contain"
            onLoadEnd={() => {
              setImageLoaded(true);
            }}
          />
          {!imageLoaded && <FullWidthSkeleton />}
        </View>
      )}
      <Text style={styles.question}>{question.question_text}</Text>
      {question?.text_answers?.length > 0 ? (
        <View style={styles.options}>{renderTextAnswers()}</View>
      ) : (
        <ScrollView
          style={styles.images_options_container}
          contentContainerStyle={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingVertical: 10,
          }}
        >
          {renderImageAnswers()}
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    lineHeight: 24,
  },
  options: {
    marginTop: 20,
  },
  image_container: {
    marginBottom: 10,
  },
  option_image_container: {
    padding: 10,
    marginBottom: 10,
    width: '49%',
    marginRight: '1%',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 5,
    borderLeftWidth: 2,
    borderWidth: 2,
    borderColor: '#E9E9E9',
    borderRadius: 12,
    justifyContent: 'flex-start', // Align content to start (top)
  },

  hidden_image: {
    opacity: 0,
    position: 'absolute',
  },
  option_text: {
    fontFamily: 'Poppins_500Medium',
    marginTop: 1,
  },
  option_chosen: {
    borderColor: '#FF6900',
    backgroundColor: '#FFF8F3',
  },
  option_image: {
    width: 76,
    height: 82,
    marginTop: -15,
    marginBottom: 5,
    alignSelf: 'center', // Center the image horizontally within its parent container
  },
  image: {
    width: '100%',
    height: 131,
    alignItems: 'center',
    position: 'relative',
  },
  mark_container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  options_box: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#E9E9E9',
    flexDirection: 'row',
    alignItems: 'center',
  },

  option_container: {
    flex: 1,
  },

  option: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  option_label: {
    fontFamily: 'Poppins_700Bold',
  },
  correct: {
    borderColor: '#71B73B',
    backgroundColor: '#EDFFDF',
  },
  wrong: {
    borderColor: '#FF6900',
    backgroundColor: '#FFF8F3',
  },

  images_options_container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 20,
    // flexWrap: 'wrap',
  },
  image_option_card: {
    marginBottom: 10,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#E9E9E9',
    borderRadius: 12,
    padding: 10,
    width: '48%',
    marginRight: '1%',
    justifyContent: 'center',
  },
  image_option: {
    width: 76,
    height: 82,
    marginTop: -15,
    marginBottom: 5,
    alignSelf: 'center', // Center the image horizontally within its parent container
  },
  mark_image_options: {
    position: 'absolute',
    right: -4,
    top: -8,
    backgroundColor: 'white',
  },
  alphapet_choice: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'left',
  },
});
