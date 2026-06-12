import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { reportStorage, ReportItem } from '@/utils/storage';
import EmptyState from '@/components/EmptyState';
import styles from './index.module.scss';

const MyReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadReports = () => {
    const myReports = reportStorage.getReports();
    setReports(myReports);
    setIsLoaded(true);
  };

  useDidShow(() => {
    loadReports();
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'question':
        return '问题';
      case 'answer':
        return '回答';
      case 'experience':
        return '经验';
      default:
        return '其他';
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'question':
        return styles.typeQuestion;
      case 'answer':
        return styles.typeAnswer;
      case 'experience':
        return styles.typeExperience;
      default:
        return '';
    }
  };

  const handleClick = (report: ReportItem) => {
    if (report.type === 'question' || report.type === 'answer') {
      wx.navigateTo({
        url: `/pages/question-detail/index?id=${report.targetId}`
      });
    } else if (report.type === 'experience') {
      wx.navigateTo({
        url: `/pages/experience-detail/index?id=${report.targetId}`
      });
    }
  };

  return (
    <View className={styles.myReportsPage}>
      <View className={styles.listSection}>
        <Text className={styles.listTitle}>举报记录</Text>
        <ScrollView scrollY style={{ height: 'calc(100vh - 200rpx)' }}>
          {isLoaded && reports.length > 0 ? (
            reports.map(report => (
              <View key={report.id} className={styles.reportItem} onClick={() => handleClick(report)}>
                <View className={styles.reportHeader}>
                  <Text className={`${styles.reportType} ${getTypeStyle(report.type)}`}>
                    {getTypeLabel(report.type)}
                  </Text>
                  <Text className={`${styles.reportStatus} ${report.status === 'pending' ? styles.statusPending : styles.statusProcessed}`}>
                    {report.status === 'pending' ? '处理中' : '已处理'}
                  </Text>
                </View>
                <Text className={styles.reportTitle}>举报内容：{report.targetContent || '未知内容'}</Text>
                <Text className={styles.reportReason}>举报原因：{report.reason}</Text>
                <Text className={styles.reportTime}>{report.createdAt}</Text>
              </View>
            ))
          ) : (
            <EmptyState 
              title="暂无举报" 
              description="提交的举报记录将显示在这里" 
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyReportsPage;