import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { followupStorage, FollowupItem } from '@/utils/storage';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const MyFollowupsPage: React.FC = () => {
  const [followups, setFollowups] = useState<FollowupItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFollowups = () => {
    const myFollowups = followupStorage.getFollowups();
    setFollowups(myFollowups);
    setIsLoaded(true);
  };

  useDidShow(() => {
    loadFollowups();
  });

  const handleClick = (followup: FollowupItem) => {
    wx.navigateTo({
      url: `/pages/question-detail/index?id=${followup.questionId}`
    });
  };

  return (
    <View className={styles.myFollowupsPage}>
      <View className={styles.listSection}>
        <Text className={styles.listTitle}>发出的追问</Text>
        <ScrollView scrollY style={{ height: 'calc(100vh - 200rpx)' }}>
          {isLoaded && followups.length > 0 ? (
            followups.map(followup => (
              <View key={followup.id} className={styles.followupItem} onClick={() => handleClick(followup)}>
                <Text className={styles.followupQuestion}>问题：{followup.questionTitle}</Text>
                <Text className={styles.followupContent}>{followup.content}</Text>
                <Text className={styles.followupTime}>{followup.createdAt}</Text>
              </View>
            ))
          ) : (
            <EmptyState 
              title="暂无追问" 
              description="发出的追问记录将显示在这里，点击可跳转到关联问题" 
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyFollowupsPage;