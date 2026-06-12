import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { TagType, TAG_LABELS } from '@/types';
import { mockQuestions, getQuestionsByTag } from '@/data/questions';
import { questionStorage } from '@/utils/storage';
import QuestionCard from '@/components/QuestionCard';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<TagType | 'all'>('all');
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadQuestions = () => {
    const stored = questionStorage.getMyQuestions();
    if (activeTag === 'all') {
      const combined = [...stored, ...mockQuestions];
      setQuestions(combined);
    } else {
      const filtered = getQuestionsByTag(activeTag);
      const combined = [...stored.filter(q => q.tag === activeTag), ...filtered];
      setQuestions(combined);
    }
    setIsLoaded(true);
  };

  useDidShow(() => {
    loadQuestions();
  });

  const handleTagClick = (tag: TagType | 'all') => {
    setActiveTag(tag);
    if (tag === 'all') {
      const stored = questionStorage.getMyQuestions();
      setQuestions([...stored, ...mockQuestions]);
    } else {
      const stored = questionStorage.getMyQuestions();
      const filtered = getQuestionsByTag(tag);
      setQuestions([...stored.filter(q => q.tag === tag), ...filtered]);
    }
  };

  const handlePublish = () => {
    Taro.navigateTo({
      url: '/pages/publish-question/index'
    });
  };

  return (
    <View className={styles.homePage}>
      <View className={styles.headerSection}>
        <Text className={styles.headerTitle}>职场树洞</Text>
        <Text className={styles.headerDesc}>匿名提问，安全倾诉职场困惑</Text>
      </View>

      <View className={styles.publishSection}>
        <View className={styles.publishHeader}>
          <Text className={styles.publishTitle}>发布你的困惑</Text>
          <Button className={styles.publishButton} onClick={handlePublish}>
            发布提问
          </Button>
        </View>
        <Text className={styles.publishContent}>
          选择标签让更多人看到你的问题，获得更好的帮助
        </Text>
      </View>

      <View className={styles.filterSection}>
        <Text className={styles.filterTitle}>按标签筛选</Text>
        <View className={styles.filterTags}>
          <Button
            className={`${styles.filterTag} ${activeTag === 'all' ? styles.filterTagActive : ''}`}
            onClick={() => handleTagClick('all')}
          >
            全部
          </Button>
          {(['comfort', 'solution', 'resource'] as TagType[]).map(tag => (
            <Button
              key={tag}
              className={`${styles.filterTag} ${activeTag === tag ? styles.filterTagActive : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {TAG_LABELS[tag]}
            </Button>
          ))}
        </View>
      </View>

      <View className={styles.listSection}>
        <Text className={styles.listTitle}>最新提问</Text>
        <ScrollView className={styles.scrollView} scrollY>
          {isLoaded && questions.length > 0 ? (
            questions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <EmptyState title="暂无提问" description="点击上方按钮发布你的困惑" />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomePage;