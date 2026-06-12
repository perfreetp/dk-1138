import React, { useState, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { mockVotes, getVoteById } from '@/data/votes';
import { voteStorage } from '@/utils/storage';
import styles from './index.module.scss';

interface VoteOption {
  id: string;
  text: string;
  voteCount: number;
  percentage: number;
}

interface VoteData {
  id: string;
  title: string;
  options: VoteOption[];
  totalVotes: number;
  isMultiple: boolean;
  isAnonymous: boolean;
  expireAt: string;
  createdAt: string;
  author: string;
  hasVoted: boolean;
}

const VoteDetailPage: React.FC = () => {
  const router = useRouter();
  const [vote, setVote] = useState<VoteData | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadVote();
  }, []);

  const loadVote = () => {
    const id = router.params.id;
    
    if (id && id !== 'undefined') {
      const localVote = voteStorage.getVoteById(id);
      if (localVote) {
        setVote(localVote);
        setSelectedOptions([]);
        setIsLoaded(true);
        return;
      }
      
      const mockVote = getVoteById(id);
      if (mockVote) {
        setVote(mockVote);
        setSelectedOptions([]);
        setIsLoaded(true);
        return;
      }
    }
    
    const myVotes = voteStorage.getMyVotes();
    if (myVotes.length > 0) {
      setVote(myVotes[0]);
      setSelectedOptions([]);
      setIsLoaded(true);
    }
  };

  const toggleOption = (optionId: string) => {
    if (vote?.hasVoted) return;

    if (vote?.isMultiple) {
      setSelectedOptions(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions(prev => 
        prev.includes(optionId) ? [] : [optionId]
      );
    }
  };

  const calculatePercentage = (option: VoteOption, total: number) => {
    if (total === 0) return 0;
    return Math.round((option.voteCount / total) * 100);
  };

  const handleVote = () => {
    if (!vote || selectedOptions.length === 0) {
      Taro.showToast({ title: '请选择选项', icon: 'none' });
      return;
    }

    const updatedOptions = vote.options.map(opt => {
      if (selectedOptions.includes(opt.id)) {
        return {
          ...opt,
          voteCount: opt.voteCount + 1
        };
      }
      return opt;
    });

    const total = vote.totalVotes + selectedOptions.length;
    const finalOptions = updatedOptions.map(opt => ({
      ...opt,
      percentage: calculatePercentage(opt, total)
    }));

    const updatedVote: VoteData = {
      ...vote,
      options: finalOptions,
      totalVotes: total,
      hasVoted: true
    };

    voteStorage.updateVote(updatedVote);
    setVote(updatedVote);
    
    const myVotes = voteStorage.getMyVotes();
    const index = myVotes.findIndex(v => v.id === vote.id);
    if (index !== -1) {
      myVotes[index] = updatedVote;
      Taro.setStorageSync('my_votes', myVotes);
    }

    Taro.showToast({ title: '投票成功', icon: 'success' });
  };

  if (!isLoaded) {
    return (
      <View className={styles.voteDetailPage}>
        <View className={styles.emptyVote}>
          <Text className={styles.emptyVoteText}>加载中...</Text>
        </View>
      </View>
    );
  }

  if (!vote) {
    return (
      <View className={styles.voteDetailPage}>
        <View className={styles.emptyVote}>
          <Text className={styles.emptyVoteText}>投票不存在</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.voteDetailPage}>
      <View className={styles.voteHeader}>
        <View className={styles.voteTypeRow}>
          <Text className={styles.voteType}>{vote.isMultiple ? '多选' : '单选'}</Text>
          <Text className={`${styles.voteStatus} ${vote.hasVoted ? styles.voteStatusVoted : ''}`}>
            {vote.hasVoted ? '已投票' : '进行中'}
          </Text>
        </View>
        <Text className={styles.voteTitle}>{vote.title}</Text>
        <View className={styles.voteMeta}>
          <Text className={styles.voteAuthor}>发布者：{vote.author}</Text>
          <Text className={styles.voteStats}>{vote.totalVotes} 人已投票</Text>
        </View>
      </View>

      <View className={styles.optionsSection}>
        <Text className={styles.optionsTitle}>
          {vote.isMultiple ? '可多选，请选择' : '请选择一个选项'}
        </Text>
        <View className={styles.optionsList}>
          {vote.options.map(option => {
            const isSelected = selectedOptions.includes(option.id) || (vote.hasVoted && option.voteCount > 0);
            return (
              <View
                key={option.id}
                className={`${styles.optionItem} ${selectedOptions.includes(option.id) && !vote.hasVoted ? styles.optionItemSelected : ''} ${vote.hasVoted ? styles.optionItemDisabled : ''}`}
                onClick={() => toggleOption(option.id)}
              >
                <View className={styles.optionHeader}>
                  <View className={styles.optionContent}>
                    <Text className={styles.optionText}>{option.text}</Text>
                    {vote.hasVoted && (
                      <Text className={styles.optionPercent}>{option.percentage}%</Text>
                    )}
                  </View>
                  {selectedOptions.includes(option.id) && !vote.hasVoted && (
                    <View className={styles.checkmark}>
                      <Text className={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                  {vote.hasVoted && option.voteCount > 0 && (
                    <View className={styles.checkmark} style={{ backgroundColor: '#10b981' }}>
                      <Text className={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </View>
                {vote.hasVoted && (
                  <View className={styles.progressBar}>
                    <View 
                      className={styles.progressFill}
                      style={{ width: `${option.percentage}%` }}
                    />
                  </View>
                )}
                {vote.hasVoted && (
                  <Text className={styles.optionVoteCount}>
                    {option.voteCount} 票
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <View className={styles.bottomSection}>
        <Button
          className={`${styles.voteButton} ${vote.hasVoted || selectedOptions.length === 0 ? styles.voteButtonDisabled : ''} ${vote.hasVoted ? styles.votedButton : ''}`}
          onClick={handleVote}
          disabled={vote.hasVoted || selectedOptions.length === 0}
        >
          {vote.hasVoted ? '已投票' : '确认投票'}
        </Button>
      </View>
    </View>
  );
};

export default VoteDetailPage;