import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Vote } from '@/types';
import styles from './index.module.scss';

interface VoteCardProps {
  vote: Vote;
  onClick?: () => void;
}

const VoteCard: React.FC<VoteCardProps> = ({ vote, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/vote-detail/index?id=${vote.id}`
      });
    }
  };

  const topOption = vote.options.reduce((prev, current) => 
    current.voteCount > prev.voteCount ? current : prev
  );

  return (
    <View className={styles.cardContainer} onClick={handleClick}>
      <View className={styles.cardHeader}>
        <Text className={styles.voteType}>{vote.isMultiple ? '多选' : '单选'}</Text>
        {vote.hasVoted && <Text className={styles.votedBadge}>已参与</Text>}
      </View>
      <Text className={styles.cardTitle}>{vote.title}</Text>
      <View className={styles.topOption}>
        <Text className={styles.topOptionLabel}>当前领先：</Text>
        <Text className={styles.topOptionText}>{topOption.text}</Text>
        <Text className={styles.topOptionPercent}>{topOption.percentage}%</Text>
      </View>
      <View className={styles.cardFooter}>
        <Text className={styles.voteCount}>{vote.totalVotes} 人参与</Text>
        <Text className={styles.expireText}>截止：{vote.expireAt}</Text>
      </View>
    </View>
  );
};

export default VoteCard;