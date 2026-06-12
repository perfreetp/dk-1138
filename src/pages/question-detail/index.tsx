import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const QuestionDetailPage: React.FC = () => {
  return (
    <View className={styles.questionDetailPage}>
      <View className={styles.placeholderContainer}>
        <View className={styles.placeholderIcon}>
          <Text className={styles.placeholderIconText}>问</Text>
        </View>
        <Text className={styles.placeholderTitle}>问题详情</Text>
        <Text className={styles.placeholderDesc}>功能正在开发中...</Text>
      </View>
    </View>
  );
};

export default QuestionDetailPage;