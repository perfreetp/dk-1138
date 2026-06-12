import React from 'react';
import { View, Text } from '@tarojs/components';
import { TagType, TAG_LABELS } from '@/types';
import styles from './index.module.scss';

interface TagBadgeProps {
  tag: TagType;
  size?: 'small' | 'medium';
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag, size = 'medium' }) => {
  const getTagStyle = () => {
    switch (tag) {
      case 'comfort':
        return styles.tagComfort;
      case 'solution':
        return styles.tagSolution;
      case 'resource':
        return styles.tagResource;
      default:
        return '';
    }
  };

  return (
    <View className={`${styles.tagBadge} ${getTagStyle()} ${size === 'small' ? styles.tagSmall : ''}`}>
      <Text className={styles.tagText}>{TAG_LABELS[tag]}</Text>
    </View>
  );
};

export default TagBadge;