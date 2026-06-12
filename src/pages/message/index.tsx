import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { MessageType } from '@/types';
import { mockMessages, getUnreadCount, getMessagesByType } from '@/data/messages';
import MessageCard from '@/components/MessageCard';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const MessagePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<MessageType | 'all'>('all');
  const [messages, setMessages] = useState(mockMessages);
  const unreadCount = getUnreadCount();

  const filterLabels: Record<MessageType | 'all', string> = {
    all: '全部',
    reply: '回复',
    like: '点赞',
    adopt: '采纳',
    system: '系统'
  };

  const handleFilterClick = (filter: MessageType | 'all') => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setMessages(mockMessages);
    } else {
      setMessages(getMessagesByType(filter));
    }
  };

  return (
    <View className={styles.messagePage}>
      <View className={styles.headerSection}>
        <View className={styles.headerRow}>
          <Text className={styles.headerTitle}>消息中心</Text>
          {unreadCount > 0 && (
            <View className={styles.unreadBadge}>
              <Text>{unreadCount} 条未读</Text>
            </View>
          )}
        </View>
        <Text className={styles.headerDesc}>查看回复、点赞和系统通知</Text>
      </View>

      <View className={styles.filterSection}>
        <Text className={styles.filterTitle}>消息类型</Text>
        <View className={styles.filterTags}>
          {(['all', 'reply', 'like', 'adopt', 'system'] as (MessageType | 'all')[]).map(filter => (
            <View
              key={filter}
              className={`${styles.filterTag} ${activeFilter === filter ? styles.filterTagActive : ''}`}
              onClick={() => handleFilterClick(filter)}
            >
              <Text>{filterLabels[filter]}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.listSection}>
        <Text className={styles.listTitle}>消息列表</Text>
        <ScrollView className={styles.scrollView} scrollY>
          {messages.length > 0 ? (
            messages.map(msg => (
              <MessageCard key={msg.id} message={msg} />
            ))
          ) : (
            <EmptyState title="暂无消息" description="还没有收到任何消息" />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MessagePage;