import { useQueries } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import type { EnvClassResponse } from '@/api/get-env';
import { getEnvClass } from '@/api/get-env';
import type { MathClassResponse } from '@/api/get-math';
import { getMathClass } from '@/api/get-math';
import { useGetUser } from '@/api/users/use-get-user';
import { translate } from '@/core';
import { getItem } from '@/core/storage';
import {
  Button,
  FocusAwareStatusBar,
  getInitials,
  Image,
  ProgressBar,
  Text,
} from '@/ui';
import Skeleton from '@/ui/skeleton';

export default function Home() {
  const image = true;

  const { data, isLoading } = useGetUser();

  const [mathData, envData] = useQueries({
    queries: [
      {
        queryFn: getMathClass,
        queryKey: ['math', 'subject'],
      },
      {
        queryFn: getEnvClass,
        queryKey: ['env', 'subject'],
      },
    ],
  }) as [
    { data: MathClassResponse | undefined; isLoading: boolean },
    { data: EnvClassResponse | undefined; isLoading: boolean }
  ];

  const mathSummary = mathData.data?.summary;
  const envSummary = envData.data?.summary;

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6900" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar />
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.innerContainer}>
            {data?.profile_picture_url ? (
              <Image
                source={require('../../../assets/avatar.png')}
                style={styles.profileImage}
                contentFit="contain"
              />
            ) : (
              <Text style={styles.addImageText}>
                {getInitials(data?.name as string)}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.greeting}>Good Afternoon!</Text>
          <Text style={styles.name}>{data?.name}</Text>
        </View>
        <View style={styles.rewardsContainer}>
          {/* <LinearGradient
            colors={['#FF6D0799', '#A8450099']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.linearGradientRewards}
          >
            <JewleryIcon />
            <Text style={styles.rewardNumber}>12,000</Text>
          </LinearGradient> */}
        </View>
      </View>
      <View style={styles.winnerContainer}>
        <Text style={styles.winnerText}>Winner of the week</Text>
        <View style={styles.contentContainer}>
          <View style={styles.winnerImageContainer}>
            <View style={styles.innerContainer}>
              {image ? (
                <Image
                  source={require('../../../assets/avatar.png')}
                  style={styles.profileImage}
                  contentFit="contain"
                />
              ) : (
                <Text style={styles.addImageText}>
                  {getInitials(getItem('name'))}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.winnerWelcomeContainer}>
            <Text style={styles.winnerName}>{data?.name}</Text>
            <Text style={styles.winnerGreeting}>12000 Points</Text>
          </View>
        </View>
        <Image
          source={require('../../../assets/crown.png')}
          style={styles.crownImage}
          contentFit="contain"
        />
      </View>

      <View style={styles.quizContainer}>
        <View>
          <Text style={styles.quizTitle}>Daily Quiz</Text>
          <Text style={styles.quizSubTitle}>Play, compete, earn</Text>
          <Button
            onPress={() =>
              router.push({
                pathname: '/quiz',
                params: { quiz_id: 'daily' },
              })
            }
            label="Join Now"
            variant="destructive"
            style={{
              backgroundColor: '#C35A1E',
              borderBottomColor: 'none',
              width: 111,
              height: 32,
              borderColor: 'transparent',
              marginTop: 14,
            }}
            textStyle={{
              fontSize: 12,
              fontFamily: 'Poppins_500Medium',
            }}
          />
        </View>
        <View>
          <Image
            source={require('../../../assets/quiz.png')}
            style={styles.quizImage}
            contentFit="cover"
          />
        </View>
      </View>
      <Text style={styles.exploreText}>Explore Classes</Text>
      {mathData.isLoading ? (
        <Skeleton />
      ) : (
        <Pressable
          style={styles.mathsContainer}
          onPress={() => {
            router.push({
              pathname: '/lessons',
              params: { subject: 'math' },
            });
          }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.winnerImageContainer}>
              <View style={styles.innerContainer}>
                <Image
                  source={{ uri: mathSummary?.image_url }}
                  style={styles.profileImage}
                  contentFit="contain"
                />
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.progressText}>
                  {translate('home.math')}
                </Text>
                <ProgressBar
                  key={
                    mathSummary
                      ? (mathSummary.completed / mathSummary.total) * 100
                      : 0
                  }
                  initialProgress={
                    mathSummary
                      ? (mathSummary.completed / mathSummary.total) * 100
                      : 0
                  }
                  height={6}
                  color="#60167F"
                  style={styles.progressBar}
                  bgColor="#fff"
                />
              </View>
              <Text style={styles.doneNumber}>
                {mathSummary
                  ? `${mathSummary.completed}/${mathSummary.total}`
                  : '0/0'}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
      {envData.isLoading ? (
        <Skeleton />
      ) : (
        <Pressable
          style={styles.englishContainer}
          onPress={() => {
            router.push({
              pathname: '/lessons',
              params: { subject: 'env' },
            });
          }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.winnerImageContainer}>
              <View style={styles.innerContainer}>
                <Image
                  source={{ uri: envSummary?.image_url }}
                  style={styles.profileImage}
                  contentFit="contain"
                />
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.progressText,
                    {
                      color: '#175375',
                    },
                  ]}
                >
                  {translate('home.env')}
                </Text>
                <ProgressBar
                  key={
                    envSummary
                      ? `${envSummary.completed}-${envSummary.total}`
                      : 'loading'
                  }
                  initialProgress={
                    envSummary
                      ? (envSummary.completed / envSummary.total) * 100
                      : 0
                  }
                  height={6}
                  color="#175375"
                  style={styles.progressBar}
                  bgColor="#fff"
                />
              </View>
              <Text
                style={[
                  styles.doneNumber,
                  {
                    color: '#175375',
                  },
                ]}
              >
                {envSummary
                  ? `${envSummary.completed}/${envSummary.total}`
                  : '0/0'}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 51,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 12,
    backgroundColor: '#FF6D0799',
    borderRadius: 28,
  },
  winnerImageContainer: {
    backgroundColor: '#A84500D9',
    borderRadius: 28,
  },
  innerContainer: {
    height: 55,
    width: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    height: 55,
    width: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 28,
  },
  addImageText: {
    fontSize: 20,
    color: '#9A501C',
    textAlign: 'center',
  },
  welcomeContainer: {
    // marginLeft: 12,
  },
  greeting: {
    fontSize: 12,
    color: '#696969',
    fontFamily: 'Poppins_500Medium',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
    marginTop: 5,
  },
  rewardsContainer: {
    marginLeft: 'auto',
  },
  rewardNumber: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#fff',
  },
  linearGradientRewards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 30,
    width: 85,
  },
  winnerContainer: {
    marginTop: 29,
    backgroundColor: '#736EE1',
    paddingHorizontal: 16,
    paddingVertical: 18,
    position: 'relative',
    borderRadius: 16,
    width: '100%',
    marginBottom: 24,
  },
  winnerText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 9,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  winnerWelcomeContainer: {
    marginLeft: 8,
    maxHeight: 116,
  },
  winnerName: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',

    color: '#fff',
    marginBottom: 8,
  },
  winnerGreeting: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins_500Medium',
  },
  crownImage: {
    position: 'absolute',
    right: '-29%',
    bottom: 7,
    height: '100%',
    width: '100%',
  },
  quizContainer: {
    backgroundColor: '#FF6900',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
    borderRadius: 16,
    width: '100%',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 158,
  },
  quizTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
    color: '#F5F5F5',
  },
  quizSubTitle: {
    fontSize: 14,
    color: '#F5F5F5',
    fontFamily: 'Poppins_500Medium',
  },
  quizImage: {
    width: 170,
    height: 170,
  },
  exploreText: {
    marginBottom: 12,
    color: '#4C4C4C',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  mathsContainer: {
    backgroundColor: '#EEDDF5',
    paddingHorizontal: 12,
    paddingVertical: 12,
    position: 'relative',
    borderRadius: 16,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#540077',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  progressContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  progressText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#60167F',
    marginBottom: 12,
  },
  doneNumber: {
    fontSize: 16,
    color: '#60167F',
    fontFamily: 'Poppins_500Medium',
  },
  progressBarContainer: {
    flex: 1,
    borderRadius: 33,
    height: 6,
  },
  progressBar: {
    borderRadius: 33,
  },

  englishContainer: {
    backgroundColor: '#D8EDF9',
    paddingHorizontal: 12,
    paddingVertical: 12,
    position: 'relative',
    borderRadius: 16,
    width: '100%',
    shadowColor: '#004E7B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
