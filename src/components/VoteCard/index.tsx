import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Vote } from '@/types';
import { voteStorage } from '@/utils/storage';
import styles from './index.module.scss';

interface VoteCardProps {
  vote: any;
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

  const localVote = voteStorage.getVoteById(vote.id);
  const displayVote = localVote || vote;
  
  const topOption = displayVote.options.reduce((prev, current) => 
    current.voteCount > prev.voteCount ? current : prev
  );

  return (
    <View className={styles.cardContainer} onClick={handleClick}>
      <View className={styles.cardHeader}>
        <Text className={styles.voteType}>{displayVote.isMultiple ? '多选' : '单选'}</Text>
        {displayVote.hasVoted && <Text className={styles.votedBadge}>已参与</Text>}
      </View>
      <Text className={styles.cardTitle}>{displayVote.title}</Text>
      <View className={styles.topOption}>
        <Text className={styles.topOptionLabel}>当前领先：</Text>
        <Text className={styles.topOptionText}>{topOption.text}</Text>
        <Text className={styles.topOptionPercent}>{topOption.percentage}%</Text>
      </View>
      <View className={styles.cardFooter}>
        <Text className={styles.voteCount}>{displayVote.totalVotes} 人参与</Text>
        <Text className={styles.expireText}>截止：{displayVote.expireAt}</Text>
      </View>
    </View>
  );
};

export default VoteCard;