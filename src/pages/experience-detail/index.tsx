import React, { useState, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { Experience, TOPIC_LABELS } from '@/types';
import { mockExperiences, getExperienceById } from '@/data/experiences';
import { collectionStorage } from '@/utils/storage';
import styles from './index.module.scss';

const ExperienceDetailPage: React.FC = () => {
  const router = useRouter();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [isCollected, setIsCollected] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const id = router.params.id;
    if (id && id !== 'undefined') {
      const exp = getExperienceById(id);
      if (exp) {
        setExperience(exp);
        setIsCollected(collectionStorage.isCollected(exp.id, 'experience'));
      }
    }
  }, []);

  const handleLike = () => {
    if (experience) {
      setExperience({
        ...experience,
        likeCount: experience.likeCount + 1
      });
      Taro.showToast({ title: '点赞成功', icon: 'success' });
    }
  };

  const handleCollect = () => {
    if (!experience) return;

    if (isCollected) {
      Taro.showToast({ title: '已取消收藏', icon: 'none' });
      setIsCollected(false);
    } else {
      collectionStorage.addCollection({
        id: `c_${Date.now()}`,
        type: 'experience',
        relatedId: experience.id,
        title: experience.title,
        createdAt: new Date().toLocaleString('zh-CN')
      });
      setIsCollected(true);
      Taro.showToast({ title: '收藏成功', icon: 'success' });
    }
  };

  const handleCopyTemplate = () => {
    if (experience?.template) {
      Taro.setClipboardData({
        data: experience.template,
        success: () => {
          setCopySuccess(true);
          Taro.showToast({ title: '模板已复制', icon: 'success' });
          setTimeout(() => setCopySuccess(false), 2000);
        }
      });
    }
  };

  if (!experience) {
    return (
      <View className={styles.experienceDetailPage}>
        <View className={styles.experienceHeader}>
          <Text className={styles.experienceTitle}>经验不存在</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.experienceDetailPage}>
      <View className={styles.experienceHeader}>
        <Text className={styles.topicBadge}>{TOPIC_LABELS[experience.topic]}</Text>
        <Text className={styles.experienceTitle}>{experience.title}</Text>
        
        <View className={styles.experienceMeta}>
          <View className={styles.authorInfo}>
            <View className={styles.authorAvatar}>
              <Text className={styles.authorAvatarText}>经</Text>
            </View>
            <Text className={styles.authorName}>{experience.author}</Text>
          </View>
          <View className={styles.experienceStats}>
            <View className={styles.statItem}>
              <Text className={styles.statIcon}>👍</Text>
              <Text className={styles.statText}>{experience.likeCount}</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={styles.statIcon}>⭐</Text>
              <Text className={styles.statText}>{experience.saveCount}</Text>
            </View>
          </View>
        </View>

        <View className={styles.actionButtons}>
          <Button 
            className={styles.actionButton}
            onClick={handleLike}
          >
            👍 点赞
          </Button>
          <Button 
            className={`${styles.actionButton} ${isCollected ? styles.actionButtonActive : ''}`}
            onClick={handleCollect}
          >
            {isCollected ? '⭐ 已收藏' : '☆ 收藏'}
          </Button>
        </View>
      </View>

      <View className={styles.contentSection}>
        <Text className={styles.sectionTitle}>经验内容</Text>
        <Text className={styles.experienceContent}>{experience.content}</Text>
      </View>

      {experience.template && (
        <View className={styles.templateSection}>
          <View className={styles.templateHeader}>
            <Text className={styles.templateLabel}>模板话术</Text>
            <Text className={styles.templateBadge}>可直接使用</Text>
          </View>
          <View className={styles.templateContent}>
            <Text className={styles.templateText}>{experience.template}</Text>
          </View>
          <View className={styles.actionButtons}>
            <Button 
              className={`${styles.actionButton} ${copySuccess ? styles.copySuccess : ''}`}
              onClick={handleCopyTemplate}
            >
              {copySuccess ? '✓ 已复制' : '复制模板'}
            </Button>
            <Button 
              className={`${styles.actionButton} ${isCollected ? styles.actionButtonActive : ''}`}
              onClick={handleCollect}
            >
              {isCollected ? '✓ 已收藏' : '收藏模板'}
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExperienceDetailPage;