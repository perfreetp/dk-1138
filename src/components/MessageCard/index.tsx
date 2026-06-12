import React from 'react';
import { View, Text } from '@tarojs/components';
import { Message } from '@/types';
import styles from './index.module.scss';

interface MessageCardProps {
  message: Message;
  onClick?: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onClick }) => {
  const getTypeStyle = () => {
    switch (message.type) {
      case 'reply':
        return styles.typeReply;
      case 'like':
        return styles.typeLike;
      case 'adopt':
        return styles.typeAdopt;
      case 'system':
        return styles.typeSystem;
      default:
        return '';
    }
  };

  const getTypeLabel = () => {
    switch (message.type) {
      case 'reply':
        return '回复';
      case 'like':
        return '点赞';
      case 'adopt':
        return '采纳';
      case 'system':
        return '系统';
      default:
        return '';
    }
  };

  return (
    <View className={`${styles.cardContainer} ${message.isRead ? styles.read : ''}`} onClick={onClick}>
      <View className={styles.cardHeader}>
        <Text className={`${styles.typeBadge} ${getTypeStyle()}`}>{getTypeLabel()}</Text>
        {!message.isRead && <View className={styles.unreadDot} />}
      </View>
      <Text className={styles.cardTitle}>{message.title}</Text>
      <Text className={styles.cardContent}>{message.content}</Text>
      <View className={styles.cardFooter}>
        {message.sender && <Text className={styles.senderText}>来自：{message.sender}</Text>}
        <Text className={styles.timeText}>{message.createdAt}</Text>
      </View>
    </View>
  );
};

export default MessageCard;