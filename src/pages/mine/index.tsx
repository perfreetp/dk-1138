import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { MoodType, MOOD_LABELS } from '@/types';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const stats = {
    questions: 5,
    answers: 23,
    collections: 12,
    likes: 156
  };

  const currentMood: MoodType = 'calm';
  const moodNote = '今天工作顺利，完成了一个重要项目';

  const menuItems = [
    {
      icon: '问',
      title: '我的提问',
      desc: '查看发布的所有问题',
      path: '/pages/question-detail/index?action=my'
    },
    {
      icon: '藏',
      title: '我的收藏',
      desc: '收藏的经验和模板话术',
      path: '/pages/experience-detail/index?action=my'
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
      path: ''
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
            <Text className={`${styles.moodValue} ${styles[`mood${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}`]}`}>
              {MOOD_LABELS[currentMood]}
            </Text>
          </View>
          <Text className={styles.moodNote}>{moodNote}</Text>
          <Text className={styles.moodTime}>记录时间：2024-01-15 18:30</Text>
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