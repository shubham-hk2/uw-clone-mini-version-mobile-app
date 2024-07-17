import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import type { Badge } from '@/api/badges/get-badges';
import { getBadges } from '@/api/badges/get-badges';
import { Button, Image, SafeAreaView, ScrollView, Text, View } from '@/ui';
import { Lock } from '@/ui/icons/lock';

export default function Badges() {
  const { data, isLoading } = useQuery<{ badges: Badge[] }>({
    queryKey: ['badges'],
    queryFn: getBadges,
  });

  const params = useLocalSearchParams();

  const badge = params.badgeData;

  useEffect(() => {
    console.log(badge);
  }, [badge]);

  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBadgeSelect = (badge: Badge) => {
    setSelectedBadge(badge);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBadge(null);
  };

  const handleShare = async () => {
    if (selectedBadge) {
      try {
        await Share.share({
          message: `I just unlocked the ${selectedBadge.title} badge!`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6900" />
      </View>
    );
  }

  const badges = data?.badges;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My badges</Text>
        <Text style={styles.text}>
          You have unlocked {badges?.length || 0} badges
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.badgesContainer}>
          {badges &&
            badges.map((badge, index) => (
              <TouchableOpacity
                key={index}
                style={styles.badgeWrapper}
                onPress={() => handleBadgeSelect(badge)}
              >
                <View style={styles.badgeContainer}>
                  {badge.unlocked === false ? (
                    <View style={styles.closedCircle}>
                      <Lock />
                    </View>
                  ) : (
                    <Image
                      source={{ uri: badge.image_url }}
                      style={styles.circle}
                    />
                  )}
                  <Text style={styles.badgeTitle}>{badge.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={handleCloseModal}
        >
          <View style={styles.modalContent}>
            {selectedBadge?.unlocked ? (
              <LottieView
                source={{ uri: selectedBadge.lottie_url as string }}
                loop
                autoPlay
                style={[styles.modalAnimation]}
                containerProps={{ style: styles.modalAnimation }}
              />
            ) : (
              <View style={styles.modalLockedAnimation}>
                <Lock />
              </View>
            )}
            <Text style={styles.modalTitle}>{selectedBadge?.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedBadge?.description}
            </Text>
            <View
              style={{
                width: '100%',
              }}
            >
              <Button
                label="Got it"
                style={styles.confirmButton}
                onPress={handleCloseModal}
              />
              {selectedBadge?.unlocked && (
                <Button
                  label="Share with your friends"
                  style={styles.shareButton}
                  variant="outline"
                  onPress={handleShare}
                  textStyle={styles.shareButtonText}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 5,
    paddingBottom: 40,
  },
  header: {
    padding: 10,
    paddingTop: 25,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 32,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeWrapper: {
    width: '33%',
    marginBottom: 33,
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  closedCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    width: 84,
    borderRadius: 9999,
    borderWidth: 4,
    backgroundColor: '#C4C4C4D9',
    borderColor: '#E4E4E4',
  },
  circle: {
    height: 84,
    width: 84,
  },
  badgeTitle: {
    fontSize: 10,
    color: '#525252',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    maxWidth: 84,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalLockedAnimation: {
    marginTop: -70,
    height: 132,
    width: 132,
    marginBottom: 40,
    borderRadius: 9999,
    borderWidth: 4,
    backgroundColor: '#C4C4C4D9',
    borderColor: '#E4E4E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    height: 132,
    width: 132,
    borderRadius: 66,
    marginTop: -70,
    marginBottom: 40,
  },
  modalAnimation: {
    marginTop: -70,
    borderRadius: 66,
    height: 132,
    width: 132,
    marginBottom: 40,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 36,
    fontFamily: 'Poppins_500Medium',
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#FF6900',
    borderColor: '#C45100',
    width: '100%',
    marginBottom: 10,
  },
  shareButton: {
    padding: 15,
    width: '100%',
    borderColor: '#DEDEDE',
    borderBottomWidth: 4,
  },
  shareButtonText: {
    color: '#C45100',
    fontFamily: 'Poppins_700Bold',
  },
});
