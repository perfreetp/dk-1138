import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Question, TAG_LABELS, TOPIC_LABELS } from '@/types';
import TagBadge from '@/components/TagBadge';
import styles from './index.module.scss';

interface QuestionCardProps {
  question: Question;
  onClick?: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/question-detail/index?id=${question.id}`
      });
    }
  };

  return (
    <View className={styles.cardContainer} onClick={handleClick}>
      <View className={styles.cardHeader}>
        <TagBadge tag={question.tag} size="small" />
        <Text className={styles.topicText}>{TOPIC_LABELS[question.topic]}</Text>
      </View>
      <Text className={styles.cardTitle}>{question.title}</Text>
      <Text className={styles.cardContent}>{question.content}</Text>
      <View className={styles.cardFooter}>
        <View className={styles.authorInfo}>
          <Text className={styles.authorText}>{question.author}</Text>
          {question.floor && <Text className={styles.floorText}>{question.floor}</Text>}
          {question.industry && <Text className={styles.industryText}>{question.industry}</Text>}
        </View>
        <View className={styles.statsInfo}>
          <Text className={styles.statText}>{question.answerCount} 回答</Text>
          <Text className={styles.statText}>{question.likeCount} 赞</Text>
        </View>
      </View>
      <Text className={styles.timeText}>{question.createdAt}</Text>
    </View>
  );
};

export default QuestionCard;