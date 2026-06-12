import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { questionStorage } from '@/utils/storage';
import QuestionCard from '@/components/QuestionCard';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const MyQuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadQuestions = () => {
    const myQuestions = questionStorage.getMyQuestions();
    setQuestions(myQuestions);
    setIsLoaded(true);
  };

  useDidShow(() => {
    loadQuestions();
  });

  return (
    <View className={styles.myQuestionsPage}>
      <View className={styles.listSection}>
        <ScrollView className={styles.scrollView} scrollY>
          {isLoaded && questions.length > 0 ? (
            questions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <EmptyState 
              title="暂无提问" 
              description="点击底部「提问」发布你的第一个问题" 
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyQuestionsPage;