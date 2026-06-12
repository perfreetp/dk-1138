import React, { useState } from 'react';
import { View, Text, Button, Textarea } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { MoodType, MOOD_LABELS } from '@/types';
import { moodStorage } from '@/utils/storage';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

interface MoodRecord {
  id: string;
  mood: MoodType;
  note?: string;
  createdAt: string;
}

const moodIcons: Record<MoodType, string> = {
  happy: '😊',
  calm: '😌',
  anxious: '😰',
  sad: '😢',
  angry: '😠'
};

const MoodRecordsPage: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [records, setRecords] = useState<MoodRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadRecords = () => {
    const moodRecords = moodStorage.getRecords();
    setRecords(moodRecords);
    setIsLoaded(true);
  };

  useDidShow(() => {
    loadRecords();
  });

  const handleSave = () => {
    if (!currentMood) {
      Taro.showToast({ title: '请选择心情', icon: 'none' });
      return;
    }

    const newRecord: MoodRecord = {
      id: `m_${Date.now()}`,
      mood: currentMood,
      note: note.trim() || undefined,
      createdAt: new Date().toLocaleString('zh-CN')
    };

    moodStorage.addRecord(newRecord);
    loadRecords();
    
    Taro.showToast({ title: '记录成功', icon: 'success' });
    setCurrentMood(null);
    setNote('');
  };

  const moods: MoodType[] = ['happy', 'calm', 'anxious', 'sad', 'angry'];

  return (
    <View className={styles.moodRecordsPage}>
      <View className={styles.recordSection}>
        <Text className={styles.sectionTitle}>记录今日心情</Text>
        
        <View className={styles.moodSelector}>
          {moods.map(mood => (
            <View 
              key={mood}
              className={`${styles.moodItem} ${currentMood === mood ? styles.moodItemActive : ''}`}
              onClick={() => setCurrentMood(mood)}
            >
              <View className={`${styles.moodIcon} ${styles[`mood${mood.charAt(0).toUpperCase() + mood.slice(1)}`]}`}>
                <Text>{moodIcons[mood]}</Text>
              </View>
              <Text className={styles.moodLabel}>{MOOD_LABELS[mood]}</Text>
            </View>
          ))}
        </View>

        <View className={styles.noteSection}>
          <Textarea
            className={styles.noteTextarea}
            placeholder="写点备注吧（可选）..."
            value={note}
            onInput={(e) => setNote(e.detail.value)}
            maxlength={200}
          />
        </View>

        <View className={styles.saveSection}>
          <Button
            className={`${styles.saveButton} ${!currentMood ? styles.saveButtonDisabled : ''}`}
            onClick={handleSave}
            disabled={!currentMood}
          >
            保存记录
          </Button>
        </View>
      </View>

      <View className={styles.historySection}>
        <Text className={styles.historyTitle}>历史记录</Text>
        <View className={styles.historyList}>
          {isLoaded && records.length > 0 ? (
            records.map(record => (
              <View key={record.id} className={styles.historyItem}>
                <View className={styles.historyHeader}>
                  <View className={styles.historyMood}>
                    <Text className={styles.historyMoodIcon}>{moodIcons[record.mood]}</Text>
                    <Text className={`${styles.historyMoodText} ${styles[`historyMood${record.mood.charAt(0).toUpperCase() + record.mood.slice(1)}`]}`}>
                      {MOOD_LABELS[record.mood]}
                    </Text>
                  </View>
                  <Text className={styles.historyTime}>{record.createdAt}</Text>
                </View>
                {record.note && (
                  <Text className={styles.historyNote}>{record.note}</Text>
                )}
              </View>
            ))
          ) : (
            <EmptyState 
              title="暂无记录" 
              description="记录你的职场心情变化" 
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default MoodRecordsPage;