import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <View className={styles.emptyContainer}>
      <View className={styles.emptyIcon}>
        <Text className={styles.emptyIconText}>空</Text>
      </View>
      <Text className={styles.emptyTitle}>{title}</Text>
      {description && <Text className={styles.emptyDesc}>{description}</Text>}
    </View>
  );
};

export default EmptyState;