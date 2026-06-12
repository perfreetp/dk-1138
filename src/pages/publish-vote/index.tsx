import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const PublishVotePage: React.FC = () => {
  return (
    <View className={styles.publishVotePage}>
      <View className={styles.placeholderContainer}>
        <View className={styles.placeholderIcon}>
          <Text className={styles.placeholderIconText}>创</Text>
        </View>
        <Text className={styles.placeholderTitle}>发布投票</Text>
        <Text className={styles.placeholderDesc}>功能正在开发中...</Text>
      </View>
    </View>
  );
};

export default PublishVotePage;