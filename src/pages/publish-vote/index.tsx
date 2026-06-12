import React, { useState } from 'react';
import { View, Text, Button, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { voteStorage } from '@/utils/storage';
import styles from './index.module.scss';

interface VoteOption {
  id: string;
  text: string;
}

const PublishVotePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<VoteOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);
  const [isMultiple, setIsMultiple] = useState(false);
  const [expireDays, setExpireDays] = useState(7);

  const expireOptions = [
    { key: 1, label: '1天' },
    { key: 3, label: '3天' },
    { key: 7, label: '7天' },
    { key: 14, label: '14天' },
    { key: 30, label: '30天' }
  ];

  const addOption = () => {
    if (options.length >= 6) {
      Taro.showToast({ title: '最多6个选项', icon: 'none' });
      return;
    }
    setOptions([...options, { id: `opt_${Date.now()}`, text: '' }]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) {
      Taro.showToast({ title: '至少2个选项', icon: 'none' });
      return;
    }
    setOptions(options.filter(opt => opt.id !== id));
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, text } : opt
    ));
  };

  const validOptions = options.filter(opt => opt.text.trim().length > 0);
  const canSubmit = title.trim().length > 0 && validOptions.length >= 2;

  const handleSubmit = () => {
    if (!canSubmit) {
      Taro.showToast({ title: '请完善投票信息', icon: 'none' });
      return;
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expireDays);

    const newVote = {
      id: `v_${Date.now()}`,
      title: title.trim(),
      options: validOptions.map((opt, index) => ({
        id: `o_${Date.now()}_${index}`,
        text: opt.text.trim(),
        voteCount: 0,
        percentage: 0
      })),
      totalVotes: 0,
      isMultiple,
      isAnonymous: true,
      expireAt: expireDate.toLocaleString('zh-CN'),
      createdAt: new Date().toLocaleString('zh-CN'),
      author: '匿名用户',
      hasVoted: false
    };

    voteStorage.addVote(newVote);

    Taro.showToast({ title: '投票发布成功', icon: 'success' });

    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  return (
    <View className={styles.publishVotePage}>
      <View className={styles.formSection}>
        <View className={styles.formGroup}>
          <Text className={styles.formLabel}>投票标题</Text>
          <Input
            className={styles.formInput}
            placeholder="请输入投票标题"
            value={title}
            onInput={(e) => setTitle(e.detail.value)}
            maxlength={50}
          />
        </View>
      </View>

      <View className={styles.optionsSection}>
        <View className={styles.optionsHeader}>
          <Text className={styles.optionsTitle}>投票选项</Text>
          <Button className={styles.addOptionButton} onClick={addOption}>
            + 添加选项
          </Button>
        </View>
        <View className={styles.optionsList}>
          {options.map((option, index) => (
            <View key={option.id} className={styles.optionItem}>
              <Input
                className={styles.optionInput}
                placeholder={`选项${index + 1}`}
                value={option.text}
                onInput={(e) => updateOption(option.id, e.detail.value)}
              />
              {options.length > 2 && (
                <Button 
                  className={styles.removeOptionButton}
                  onClick={() => removeOption(option.id)}
                >
                  ×
                </Button>
              )}
            </View>
          ))}
        </View>
      </View>

      <View className={styles.settingSection}>
        <View className={styles.settingGroup}>
          <Text className={styles.settingLabel}>投票类型</Text>
          <View className={styles.settingGrid}>
            <View
              className={`${styles.settingItem} ${!isMultiple ? styles.settingItemActive : ''}`}
              onClick={() => setIsMultiple(false)}
            >
              <Text>单选</Text>
            </View>
            <View
              className={`${styles.settingItem} ${isMultiple ? styles.settingItemActive : ''}`}
              onClick={() => setIsMultiple(true)}
            >
              <Text>多选</Text>
            </View>
          </View>
        </View>

        <View className={styles.settingGroup}>
          <Text className={styles.settingLabel}>投票截止时间</Text>
          <View className={styles.settingGrid}>
            {expireOptions.map(item => (
              <View
                key={item.key}
                className={`${styles.settingItem} ${expireDays === item.key ? styles.settingItemActive : ''}`}
                onClick={() => setExpireDays(item.key)}
              >
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.submitSection}>
        <Button
          className={`${styles.submitButton} ${!canSubmit ? styles.submitButtonDisabled : ''}`}
          onClick={handleSubmit}
        >
          发布投票
        </Button>
        <Text className={styles.tipText}>匿名投票，保护你的选择</Text>
      </View>
    </View>
  );
};

export default PublishVotePage;