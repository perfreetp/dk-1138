import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { TopicType, TOPIC_LABELS } from '@/types';
import { mockExperiences, getExperiencesByTopic } from '@/data/experiences';
import ExperienceCard from '@/components/ExperienceCard';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const ExperiencePage: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<TopicType | 'all'>('all');
  const [experiences, setExperiences] = useState(mockExperiences);

  const handleTopicClick = (topic: TopicType | 'all') => {
    setActiveTopic(topic);
    if (topic === 'all') {
      setExperiences(mockExperiences);
    } else {
      setExperiences(getExperiencesByTopic(topic));
    }
  };

  const topics: (TopicType | 'all')[] = ['all', 'overtime', 'communication', 'performance', 'teamwork', 'career', 'other'];

  return (
    <View className={styles.experiencePage}>
      <View className={styles.headerSection}>
        <Text className={styles.headerTitle}>经验墙</Text>
        <Text className={styles.headerDesc}>职场前辈的经验分享，助你成长</Text>
      </View>

      <View className={styles.topicSection}>
        <Text className={styles.topicTitle}>话题分类</Text>
        <ScrollView className={styles.topicScroll} scrollX>
          <View className={styles.topicList}>
            {topics.map(topic => (
              <View
                key={topic}
                className={`${styles.topicItem} ${activeTopic === topic ? styles.topicItemActive : ''}`}
                onClick={() => handleTopicClick(topic)}
              >
                <Text>{topic === 'all' ? '全部' : TOPIC_LABELS[topic]}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className={styles.listSection}>
        <Text className={styles.listTitle}>热门经验</Text>
        <ScrollView className={styles.scrollView} scrollY>
          {experiences.length > 0 ? (
            experiences.map(exp => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))
          ) : (
            <EmptyState title="暂无经验" description="等待前辈们分享更多职场经验" />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ExperiencePage;