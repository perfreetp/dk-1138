import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Experience, TOPIC_LABELS } from '@/types';
import styles from './index.module.scss';

interface ExperienceCardProps {
  experience: Experience;
  onClick?: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/experience-detail/index?id=${experience.id}`
      });
    }
  };

  return (
    <View className={styles.cardContainer} onClick={handleClick}>
      <View className={styles.cardHeader}>
        <Text className={styles.topicBadge}>{TOPIC_LABELS[experience.topic]}</Text>
        <Text className={styles.authorText}>{experience.author}</Text>
      </View>
      <Text className={styles.cardTitle}>{experience.title}</Text>
      <Text className={styles.cardContent}>{experience.content}</Text>
      <View className={styles.cardFooter}>
        <View className={styles.statsInfo}>
          <Text className={styles.statText}>{experience.likeCount} 赞</Text>
          <Text className={styles.statText}>{experience.saveCount} 收藏</Text>
        </View>
        <Text className={styles.timeText}>{experience.createdAt}</Text>
      </View>
    </View>
  );
};

export default ExperienceCard;