import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { MoodType, MOOD_LABELS } from '@/types';
import { 
  moodStorage, 
  collectionStorage, 
  questionStorage, 
  answerStorage,
  reportStorage,
  followupStorage,
  voteStorage 
} from '@/utils/storage';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const [currentMood, setCurrentMood] = React.useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = React.useState('');
  const [stats, setStats] = React.useState({
    questions: 0,
    answers: 0,
    collections: 0,
    moods: 0,
    reports: 0,
    followups: 0,
    votes: 0
  });

  const loadData = React.useCallback(() => {
    const moodRecords = moodStorage.getRecords();
    if (moodRecords.length > 0) {
      setCurrentMood(moodRecords[0].mood);
      setMoodNote(moodRecords[0].note || '');
    } else {
      setCurrentMood(null);
      setMoodNote('');
    }
    
    setStats({
      questions: questionStorage.getMyQuestions().length,
      answers: answerStorage.getAnswerCount(),
      collections: collectionStorage.getCollectionCount(),
      moods: moodStorage.getRecordCount(),
      reports: reportStorage.getReportCount(),
      followups: followupStorage.getFollowupCount(),
      votes: voteStorage.getVotedCount()
    });
  }, []);

  useDidShow(() => {
    loadData();
  });

  const menuItems = [
    {
      icon: '问',
      title: '我的提问',
      count: stats.questions,
      path: '/pages/my-questions/index'
    },
    {
      icon: '答',
      title: '我的回答',
      count: stats.answers,
      path: '/pages/question-detail/index?action=my'
    },
    {
      icon: '藏',
      title: '我的收藏',
      count: stats.collections,
      path: '/pages/my-collections/index'
    },
    {
      icon: '情',
      title: '情绪记录',
      count: stats.moods,
      path: '/pages/mood-records/index'
    },
    {
      icon: '投',
      title: '已投投票',
      count: stats.votes,
      path: '/pages/vote/index'
    },
    {
      icon: '举',
      title: '我的举报',
      count: stats.reports,
      path: '/pages/my-reports/index'
    },
    {
      icon: '追',
      title: '我的追问',
      count: stats.followups,
      path: '/pages/my-followups/index'
    }
  ];

  const handleMenuClick = (path: string) => {
    if (path) {
      Taro.navigateTo({ url: path });
    }
  };

  const handleReport = () => {
    Taro.showModal({
      title: '举报内容',
      content: '请描述您要举报的内容类型（泄密或人身攻击）',
      showCancel: true
    });
  };

  const getMoodColor = (mood: MoodType) => {
    const colors: Record<MoodType, string> = {
      happy: '#10b981',
      calm: '#3b82f6',
      anxious: '#f59e0b',
      sad: '#8b5cf6',
      angry: '#ef4444'
    };
    return colors[mood];
  };

  return (
    <View className={styles.minePage}>
      <View className={styles.headerSection}>
        <Text className={styles.headerTitle}>个人中心</Text>
        <Text className={styles.headerDesc}>管理你的职场树洞数据</Text>
      </View>

      <View className={styles.dashboardSection}>
        <Text className={styles.dashboardTitle}>数据看板</Text>
        <View className={styles.dashboardGrid}>
          <View className={styles.dashboardItem}>
            <Text className={styles.dashboardNumber}>{stats.questions}</Text>
            <Text className={styles.dashboardLabel}>提问</Text>
          </View>
          <View className={styles.dashboardItem}>
            <Text className={styles.dashboardNumber}>{stats.answers}</Text>
            <Text className={styles.dashboardLabel}>回答</Text>
          </View>
          <View className={styles.dashboardItem}>
            <Text className={styles.dashboardNumber}>{stats.collections}</Text>
            <Text className={styles.dashboardLabel}>收藏</Text>
          </View>
          <View className={styles.dashboardItem}>
            <Text className={styles.dashboardNumber}>{stats.moods}</Text>
            <Text className={styles.dashboardLabel}>情绪</Text>
          </View>
          <View className={styles.dashboardItem}>
            <Text className={styles.dashboardNumber}>{stats.votes}</Text>
            <Text className={styles.dashboardLabel}>投票</Text>
          </View>
          <View className={styles.dashboardItem}>
            <Text className={styles.dashboardNumber}>{stats.reports + stats.followups}</Text>
            <Text className={styles.dashboardLabel}>互动</Text>
          </View>
        </View>
      </View>

      <View className={styles.menuSection}>
        <Text className={styles.menuTitle}>功能菜单</Text>
        <View className={styles.menuList}>
          {menuItems.map((item, index) => (
            <View
              key={index}
              className={styles.menuItem}
              onClick={() => handleMenuClick(item.path)}
            >
              <View className={styles.menuIcon}>
                <Text className={styles.menuIconText}>{item.icon}</Text>
              </View>
              <View className={styles.menuContent}>
                <Text className={styles.menuItemTitle}>{item.title}</Text>
                <Text className={styles.menuItemCount}>{item.count} 条</Text>
              </View>
              <Text className={styles.menuArrow}>→</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.moodSection}>
        <Text className={styles.moodTitle}>今日情绪</Text>
        <View className={styles.moodCard}>
          <View className={styles.moodHeader}>
            <Text className={styles.moodLabel}>当前状态</Text>
            {currentMood ? (
              <Text 
                className={styles.moodValue}
                style={{ color: getMoodColor(currentMood) }}
              >
                {MOOD_LABELS[currentMood]}
              </Text>
            ) : (
              <Text className={styles.moodEmpty}>未记录</Text>
            )}
          </View>
          {moodNote && <Text className={styles.moodNote}>{moodNote}</Text>}
          <Button 
            className={styles.moodButton}
            onClick={() => Taro.navigateTo({ url: '/pages/mood-records/index' })}
          >
            {currentMood ? '查看记录' : '记录心情'}
          </Button>
        </View>
      </View>

      <View className={styles.reportSection}>
        <View className={styles.reportCard}>
          <Text className={styles.reportTitle}>举报管理</Text>
          <Text className={styles.reportDesc}>
            如果发现泄密或人身攻击等违规内容，请及时举报，我们会尽快处理。
          </Text>
          <Button className={styles.reportButton} onClick={handleReport}>
            提交举报
          </Button>
        </View>
      </View>
    </View>
  );
};

export default MinePage;