import React, { useState, useEffect } from 'react';
import { View, Text, Input, Textarea, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { Question, Answer, TAG_LABELS, TOPIC_LABELS } from '@/types';
import { mockQuestions, getQuestionById } from '@/data/questions';
import { questionStorage, reportStorage } from '@/utils/storage';
import TagBadge from '@/components/TagBadge';
import styles from './index.module.scss';

interface AnswerItem {
  id: string;
  content: string;
  author: string;
  likeCount: number;
  isAdopted: boolean;
  createdAt: string;
}

const QuestionDetailPage: React.FC = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [replyText, setReplyText] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportTarget, setReportTarget] = useState<{ type: string; id: string } | null>(null);
  const [followedUp, setFollowedUp] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = router.params.id;
    if (id && id !== 'undefined') {
      const q = getQuestionById(id);
      if (q) {
        setQuestion(q);
        setAnswers(mockAnswers);
      }
    } else {
      const myQuestions = questionStorage.getMyQuestions();
      if (myQuestions.length > 0) {
        setQuestion(myQuestions[0]);
        setAnswers(mockAnswers);
      }
    }
  }, []);

  const mockAnswers: AnswerItem[] = [
    {
      id: 'a1',
      content: '我之前也遇到过类似的情况，后来主动和老员工沟通，发现其实他们并不是故意排挤我，只是工作太忙没时间照顾新人。建议你找个机会主动和他们聊聊，展现你的诚意和积极性。',
      author: '职场老鸟',
      likeCount: 23,
      isAdopted: false,
      createdAt: '2024-01-15 12:30'
    },
    {
      id: 'a2',
      content: '刚入职被排挤很正常，不要太在意。做好自己的本职工作，虚心请教，时间久了大家自然会接受你的。也可以参加一些团队活动，增进彼此了解。',
      author: '热心同事',
      likeCount: 15,
      isAdopted: false,
      createdAt: '2024-01-15 14:20'
    }
  ];

  const handleLike = (answerId: string) => {
    setAnswers(prev => prev.map(a => 
      a.id === answerId 
        ? { ...a, likeCount: a.likeCount + 1 }
        : a
    ));
    Taro.showToast({ title: '点赞成功', icon: 'success' });
  };

  const handleAdopt = (answerId: string) => {
    Taro.showModal({
      title: '采纳回答',
      content: '确定采纳这个回答为最佳答案吗？',
      success: (res) => {
        if (res.confirm) {
          setAnswers(prev => prev.map(a => ({
            ...a,
            isAdopted: a.id === answerId
          })));
          if (question) {
            setQuestion({ ...question, answerCount: question.answerCount + 1 });
          }
          Taro.showToast({ title: '已采纳', icon: 'success' });
        }
      }
    });
  };

  const handleFollowUp = (answerId: string) => {
    if (followedUp.has(answerId)) {
      Taro.showToast({ title: '已经追问过了', icon: 'none' });
      return;
    }
    setShowReportModal(true);
    setReportTarget({ type: 'followup', id: answerId });
    setReportReason('追问：');
  };

  const handleReport = (type: string, id: string) => {
    setShowReportModal(true);
    setReportTarget({ type, id });
    setReportReason('');
  };

  const submitReport = () => {
    if (!reportReason.trim()) {
      Taro.showToast({ title: '请填写内容', icon: 'none' });
      return;
    }

    if (reportTarget?.type === 'followup') {
      setFollowedUp(prev => new Set([...prev, reportTarget.id]));
      Taro.showToast({ title: '追问已发送', icon: 'success' });
    } else {
      reportStorage.addReport({
        id: `r_${Date.now()}`,
        targetType: reportTarget?.type || 'question',
        targetId: reportTarget?.id || question?.id || '',
        reason: reportReason,
        createdAt: new Date().toLocaleString('zh-CN'),
        status: 'pending'
      });
      Taro.showToast({ title: '举报已提交', icon: 'success' });
    }

    setShowReportModal(false);
    setReportReason('');
    setReportTarget(null);
  };

  const submitAnswer = () => {
    if (!replyText.trim()) {
      Taro.showToast({ title: '请输入回答内容', icon: 'none' });
      return;
    }

    const newAnswer: AnswerItem = {
      id: `a_${Date.now()}`,
      content: replyText.trim(),
      author: '匿名用户',
      likeCount: 0,
      isAdopted: false,
      createdAt: new Date().toLocaleString('zh-CN')
    };

    setAnswers(prev => [...prev, newAnswer]);
    if (question) {
      setQuestion({ ...question, answerCount: question.answerCount + 1 });
    }
    setReplyText('');
    Taro.showToast({ title: '回答发布成功', icon: 'success' });
  };

  if (!question) {
    return (
      <View className={styles.questionDetailPage}>
        <View className={styles.emptyAnswers}>
          <Text className={styles.emptyAnswersText}>问题不存在</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.questionDetailPage}>
      <View className={styles.questionSection}>
        <View className={styles.questionHeader}>
          <View className={styles.questionTags}>
            <TagBadge tag={question.tag} size="small" />
            <Text className={styles.topicTag}>{TOPIC_LABELS[question.topic]}</Text>
          </View>
          <Button 
            className={styles.reportButton}
            onClick={() => handleReport('question', question.id)}
          >
            举报
          </Button>
        </View>

        <Text className={styles.questionTitle}>{question.title}</Text>
        <Text className={styles.questionContent}>{question.content}</Text>

        <View className={styles.questionMeta}>
          <View className={styles.questionAuthor}>
            <View className={styles.authorAvatar}>
              <Text className={styles.authorAvatarText}>匿</Text>
            </View>
            <Text className={styles.authorName}>{question.author}</Text>
          </View>
          <View className={styles.questionStats}>
            <View className={styles.statItem}>
              <Text className={styles.statIcon}>💬</Text>
              <Text className={styles.statText}>{question.answerCount}</Text>
            </View>
            <View className={styles.statItem}>
              <Text className={styles.statIcon}>👍</Text>
              <Text className={styles.statText}>{question.likeCount}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.answerSection}>
        <View className={styles.answerHeader}>
          <Text className={styles.answerTitle}>回答</Text>
          <Text className={styles.answerCount}>{answers.length} 条回答</Text>
        </View>

        {answers.length > 0 ? (
          <View className={styles.answerList}>
            {answers.map(answer => (
              <View key={answer.id} className={styles.answerItem}>
                <View className={styles.answerHeader}>
                  <View className={styles.answerAuthor}>
                    <View className={styles.authorAvatar}>
                      <Text className={styles.authorAvatarText}>匿</Text>
                    </View>
                    <Text className={styles.authorName}>{answer.author}</Text>
                    {answer.isAdopted && (
                      <Text className={styles.adoptedBadge}>已采纳</Text>
                    )}
                  </View>
                  <Button 
                    className={styles.reportButton}
                    onClick={() => handleReport('answer', answer.id)}
                  >
                    举报
                  </Button>
                </View>

                <Text className={styles.answerContent}>{answer.content}</Text>

                <View className={styles.answerActions}>
                  <View className={styles.actionLeft}>
                    <View 
                      className={`${styles.actionButton} ${styles.actionButtonActive}`}
                      onClick={() => handleLike(answer.id)}
                    >
                      <Text>👍</Text>
                      <Text>{answer.likeCount}</Text>
                    </View>
                    <View 
                      className={styles.actionButton}
                      onClick={() => handleFollowUp(answer.id)}
                    >
                      <Text>追问</Text>
                    </View>
                  </View>
                  {!answer.isAdopted && (
                    <Button 
                      className={styles.adoptButton}
                      onClick={() => handleAdopt(answer.id)}
                    >
                      采纳
                    </Button>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className={styles.emptyAnswers}>
            <Text className={styles.emptyAnswersText}>暂无回答，来说点什么吧</Text>
          </View>
        )}
      </View>

      <View className={styles.bottomSection}>
        <View className={styles.replyInput}>
          <View className={styles.replyField}>
            <Input
              className={styles.replyFieldInput}
              placeholder="写下你的回答..."
              value={replyText}
              onInput={(e) => setReplyText(e.detail.value)}
            />
          </View>
          <Button 
            className={styles.replySendButton}
            onClick={submitAnswer}
          >
            发送
          </Button>
        </View>
      </View>

      {showReportModal && (
        <View className={styles.modalOverlay} onClick={() => setShowReportModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>
              {reportTarget?.type === 'followup' ? '匿名追问' : '举报内容'}
            </Text>
            <Textarea
              className={styles.modalTextarea}
              placeholder={reportTarget?.type === 'followup' ? '请输入追问内容...' : '请描述举报原因（泄密或人身攻击）...'}
              value={reportReason}
              onInput={(e) => setReportReason(e.detail.value)}
            />
            <View className={styles.modalButtons}>
              <Button 
                className={`${styles.modalButton} ${styles.modalButtonCancel}`}
                onClick={() => setShowReportModal(false)}
              >
                取消
              </Button>
              <Button 
                className={`${styles.modalButton} ${styles.modalButtonConfirm}`}
                onClick={submitReport}
              >
                提交
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default QuestionDetailPage;