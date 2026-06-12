import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const VoteDetailPage: React.FC = () => {
  return (
    <View className={styles.voteDetailPage}>
      <View className={styles.placeholderContainer}>
        <View className={styles.placeholderIcon}>
          <Text className={styles.placeholderIconText}>投</Text>
        </View>
        <Text className={styles.placeholderTitle}>投票详情</Text>
        <Text className={styles.placeholderDesc}>功能正在开发中...</Text>
      </View>
    </View>
  );
};

export default VoteDetailPage;