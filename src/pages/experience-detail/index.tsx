import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const ExperienceDetailPage: React.FC = () => {
  return (
    <View className={styles.experienceDetailPage}>
      <View className={styles.placeholderContainer}>
        <View className={styles.placeholderIcon}>
          <Text className={styles.placeholderIconText}>经</Text>
        </View>
        <Text className={styles.placeholderTitle}>经验详情</Text>
        <Text className={styles.placeholderDesc}>功能正在开发中...</Text>
      </View>
    </View>
  );
};

export default ExperienceDetailPage;