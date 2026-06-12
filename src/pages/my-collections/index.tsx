import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { collectionStorage } from '@/utils/storage';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

interface Collection {
  id: string;
  type: string;
  relatedId: string;
  title: string;
  createdAt: string;
}

const MyCollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const myCollections = collectionStorage.getCollections();
    setCollections(myCollections);
  }, []);

  const handleRemove = (id: string) => {
    collectionStorage.removeCollection(id);
    setCollections(collections.filter(c => c.id !== id));
    Taro.showToast({ title: '已取消收藏', icon: 'success' });
  };

  const handleClick = (item: Collection) => {
    if (item.type === 'experience') {
      Taro.navigateTo({ url: `/pages/experience-detail/index?id=${item.relatedId}` });
    } else if (item.type === 'question') {
      Taro.navigateTo({ url: `/pages/question-detail/index?id=${item.relatedId}` });
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'experience':
        return '经验';
      case 'template':
        return '模板';
      default:
        return '其他';
    }
  };

  return (
    <View className={styles.myCollectionsPage}>
      <View className={styles.listSection}>
        <ScrollView className={styles.scrollView} scrollY>
          {collections.length > 0 ? (
            collections.map(item => (
              <View key={item.id} className={styles.collectionItem} onClick={() => handleClick(item)}>
                <View className={styles.collectionContent}>
                  <Text className={styles.collectionType}>{getTypeLabel(item.type)}</Text>
                  <Text className={styles.collectionTitle}>{item.title}</Text>
                  <Text className={styles.collectionTime}>{item.createdAt}</Text>
                </View>
                <Button 
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                >
                  ×
                </Button>
              </View>
            ))
          ) : (
            <EmptyState 
              title="暂无收藏" 
              description="收藏的经验和模板将显示在这里" 
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyCollectionsPage;