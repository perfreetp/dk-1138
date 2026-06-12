import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { MoodType, MOOD_LABELS } from '@/types';
import { moodStorage } from '@/utils/storage';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const [currentMood, setCurrentMood] = React.useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = React.useState('');
  const [stats, setStats] = React.useState({ questions: 0, answers: 23, collections: 0, likes: 156 });

  React.useEffect(() => {
    const moodRecords = moodStorage.getRecords();
    if (moodRecords.length > 0) {
      setCurrentMood(moodRecords[0].mood);
      setMoodNote(moodRecords[0].note || '');
    }
    const collections = Taro.getStorageSync('my_collections') || [];
    setStats(prev => ({ ...prev, collections: collections.length }));
    const questions = Taro.getStorageSync('my_questions') || [];
    setStats(prev => ({ ...prev, questions: questions.length }));
  }, []);

  const menuItems = [
    {
      icon: '问',
      title: '我的提问',
      desc: '查看发布的所有问题',
      path: '/pages/my-questions/index'
    },
    {
      icon: '藏',
      title: '我的收藏',
      desc: '收藏的经验和模板话术',
      path: '/pages/my-collections/index'
    },
    {
      icon: '答',
      title: '我的回答',
      desc: '查看所有回答记录',
      path: '/pages/question-detail/index?action=my'
    },
    {
      icon: '情',
      title: '情绪记录',
      desc: '记录职场心情变化',
      path: '/pages/mood-records/index'
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
        <Text className={styles.headerDesc}>管理你的提问、收藏和情绪记录</Text>
      </View>

      <View className={styles.statsSection}>
        <View className={styles.statsGrid}>
          <View className={styles.statItem}>
            <Text className={styles.statNumber}>{stats.questions}</Text>
            <Text className={styles.statLabel}>提问</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNumber}>{stats.answers}</Text>
            <Text className={styles.statLabel}>回答</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNumber}>{stats.collections}</Text>
            <Text className={styles.statLabel}>收藏</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statNumber}>{stats.likes}</Text>
            <Text className={styles.statLabel}>获赞</Text>
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
                <Text className={styles.menuItemDesc}>{item.desc}</Text>
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
            {currentMood && (
              <Text 
                className={styles.moodValue}
                style={{ color: getMoodColor(currentMood) }}
              >
                {MOOD_LABELS[currentMood]}
              </Text>
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