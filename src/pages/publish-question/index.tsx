import React, { useState } from 'react';
import { View, Text, Button, Input, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { TagType } from '@/types';
import { questionStorage } from '@/utils/storage';
import styles from './index.module.scss';

const PublishQuestionPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<TagType>('solution');
  const [invite, setInvite] = useState<string>('');
  const [expireDays, setExpireDays] = useState<number>(7);

  const tags: { key: TagType; label: string }[] = [
    { key: 'comfort', label: '求安慰' },
    { key: 'solution', label: '求方案' },
    { key: 'resource', label: '求资源' }
  ];

  const invites = [
    { key: '', label: '不限' },
    { key: 'sameFloor', label: '同楼层' },
    { key: 'sameIndustry', label: '同行业' }
  ];

  const expireOptions = [
    { key: 1, label: '1天' },
    { key: 3, label: '3天' },
    { key: 7, label: '7天' },
    { key: 14, label: '14天' },
    { key: 30, label: '30天' }
  ];

  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) {
      Taro.showToast({ title: '请填写标题和内容', icon: 'none' });
      return;
    }

    const newQuestion = {
      id: `q_${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      tag,
      topic: 'other' as const,
      author: '匿名用户',
      answerCount: 0,
      likeCount: 0,
      createdAt: new Date().toLocaleString('zh-CN'),
      isAnonymous: true,
      invite: invite || '不限',
      expireAt: expireDays > 0 ? `${expireDays}天后` : '永久'
    };

    questionStorage.addQuestion(newQuestion);

    Taro.showToast({ title: '发布成功', icon: 'success' });

    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  return (
    <View className={styles.publishQuestionPage}>
      <View className={styles.formSection}>
        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>问题标题</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入问题标题"
            value={title}
            onInput={(e) => setTitle(e.detail.value)}
            maxlength={50}
          />
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>问题详情</Text>
          <Textarea
            className={styles.formTextarea}
            placeholder="请详细描述你的困惑..."
            value={content}
            onInput={(e) => setContent(e.detail.value)}
            maxlength={500}
          />
        </View>
      </View>

      <View className={styles.tagSection}>
        <Text className={styles.tagTitle}>选择标签</Text>
        <View className={styles.tagGrid}>
          {tags.map(item => (
            <View
              key={item.key}
              className={`${styles.tagItem} ${tag === item.key ? styles.tagItemActive : ''}`}
              onClick={() => setTag(item.key)}
            >
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.inviteSection}>
        <Text className={styles.inviteTitle}>邀请回答</Text>
        <View className={styles.inviteGrid}>
          {invites.map(item => (
            <View
              key={item.key}
              className={`${styles.inviteItem} ${invite === item.key ? styles.inviteItemActive : ''}`}
              onClick={() => setInvite(item.key)}
            >
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.expireSection}>
        <Text className={styles.expireTitle}>内容过期时间</Text>
        <View className={styles.expireGrid}>
          {expireOptions.map(item => (
            <View
              key={item.key}
              className={`${styles.expireItem} ${expireDays === item.key ? styles.expireItemActive : ''}`}
              onClick={() => setExpireDays(item.key)}
            >
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.submitSection}>
        <Button
          className={`${styles.submitButton} ${!canSubmit ? styles.submitButtonDisabled : ''}`}
          onClick={handleSubmit}
        >
          发布提问
        </Button>
        <Text className={styles.tipText}>匿名发布，保护你的隐私</Text>
      </View>
    </View>
  );
};

export default PublishQuestionPage;