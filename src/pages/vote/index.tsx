import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { mockVotes } from '@/data/votes';
import { voteStorage } from '@/utils/storage';
import VoteCard from '@/components/VoteCard';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const VotePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'voted' | 'notVoted'>('all');
  const [votes, setVotes] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadVotes = () => {
    const myVotes = voteStorage.getMyVotes();
    let allVotes: any[] = [];
    
    myVotes.forEach(vote => {
      const existingIndex = allVotes.findIndex(v => v.id === vote.id);
      if (existingIndex === -1) {
        allVotes.push(vote);
      }
    });
    
    mockVotes.forEach(vote => {
      const existingIndex = allVotes.findIndex(v => v.id === vote.id);
      if (existingIndex === -1) {
        allVotes.push(vote);
      }
    });
    
    if (activeFilter === 'voted') {
      allVotes = allVotes.filter(v => v.hasVoted === true);
    } else if (activeFilter === 'notVoted') {
      allVotes = allVotes.filter(v => v.hasVoted !== true);
    }
    
    setVotes(allVotes);
    setIsLoaded(true);
  };

  useDidShow(() => {
    loadVotes();
  });

  const handleFilterClick = (filter: 'all' | 'voted' | 'notVoted') => {
    setActiveFilter(filter);
    
    const myVotes = voteStorage.getMyVotes();
    let allVotes: any[] = [];
    
    myVotes.forEach(vote => {
      const existingIndex = allVotes.findIndex(v => v.id === vote.id);
      if (existingIndex === -1) {
        allVotes.push(vote);
      }
    });
    
    mockVotes.forEach(vote => {
      const existingIndex = allVotes.findIndex(v => v.id === vote.id);
      if (existingIndex === -1) {
        allVotes.push(vote);
      }
    });
    
    if (filter === 'voted') {
      allVotes = allVotes.filter(v => v.hasVoted === true);
    } else if (filter === 'notVoted') {
      allVotes = allVotes.filter(v => v.hasVoted !== true);
    }
    
    setVotes(allVotes);
  };

  const handlePublish = () => {
    Taro.navigateTo({
      url: '/pages/publish-vote/index'
    });
  };

  return (
    <View className={styles.votePage}>
      <View className={styles.headerSection}>
        <Text className={styles.headerTitle}>投票箱</Text>
        <Text className={styles.headerDesc}>匿名投票，了解团队真实感受</Text>
      </View>

      <View className={styles.publishSection}>
        <View className={styles.publishHeader}>
          <Text className={styles.publishTitle}>发起投票</Text>
          <Button className={styles.publishButton} onClick={handlePublish}>
            创建投票
          </Button>
        </View>
      </View>

      <View className={styles.filterSection}>
        <Text className={styles.filterTitle}>筛选投票</Text>
        <View className={styles.filterTags}>
          <Button
            className={`${styles.filterTag} ${activeFilter === 'all' ? styles.filterTagActive : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            全部
          </Button>
          <Button
            className={`${styles.filterTag} ${activeFilter === 'voted' ? styles.filterTagActive : ''}`}
            onClick={() => handleFilterClick('voted')}
          >
            已参与
          </Button>
          <Button
            className={`${styles.filterTag} ${activeFilter === 'notVoted' ? styles.filterTagActive : ''}`}
            onClick={() => handleFilterClick('notVoted')}
          >
            未参与
          </Button>
        </View>
      </View>

      <View className={styles.listSection}>
        <Text className={styles.listTitle}>进行中的投票</Text>
        <ScrollView className={styles.scrollView} scrollY>
          {isLoaded && votes.length > 0 ? (
            votes.map(vote => (
              <VoteCard key={vote.id} vote={vote} />
            ))
          ) : (
            <EmptyState title="暂无投票" description="点击上方按钮创建投票" />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default VotePage;