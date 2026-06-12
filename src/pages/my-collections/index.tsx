import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { collectionStorage, CollectionItem } from '@/utils/storage';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const MyCollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadCollections = () => {
    const myCollections = collectionStorage.getCollections();
    setCollections(myCollections);
    setIsLoaded(true);
  };

  useDidShow(() => {
    loadCollections();
  });

  const handleRemove = (id: string) => {
    collectionStorage.removeCollection(id);
    loadCollections();
    Taro.showToast({ title: '已取消收藏', icon: 'success' });
  };

  const handleClick = (item: CollectionItem) => {
    if (item.type === 'experience') {
      Taro.navigateTo({ url: `/pages/experience-detail/index?id=${item.relatedId}` });
    }
  };

  const handleCopyTemplate = (content: string) => {
    Taro.setClipboardData({
      data: content,
      success: () => {
        Taro.showToast({ title: '已复制', icon: 'success' });
      }
    });
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

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'experience':
        return styles.typeExperience;
      case 'template':
        return styles.typeTemplate;
      default:
        return '';
    }
  };

  return (
    <View className={styles.myCollectionsPage}>
      <View className={styles.listSection}>
        <ScrollView className={styles.scrollView} scrollY>
          {isLoaded && collections.length > 0 ? (
            collections.map(item => (
              <View key={item.id} className={styles.collectionItem}>
                <View onClick={() => handleClick(item)}>
                  <View className={styles.collectionHeader}>
                    <Text className={`${styles.collectionType} ${getTypeStyle(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </Text>
                  </View>
                  <Text className={styles.collectionTitle}>{item.title}</Text>
                  {item.type === 'template' && item.content && (
                    <Text className={styles.templateContent} numberOfLines={2}>
                      {item.content}
                    </Text>
                  )}
                  <Text className={styles.collectionTime}>{item.createdAt}</Text>
                </View>
                <View className={styles.actionButtons}>
                  {item.type === 'template' && item.content && (
                    <Button 
                      className={styles.copyButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyTemplate(item.content!);
                      }}
                    >
                      复制
                    </Button>
                  )}
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