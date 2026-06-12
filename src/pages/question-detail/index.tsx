import React, { useState, useEffect } from 'react';
import { View, Text, Input, Textarea, Button } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { Question, TAG_LABELS, TOPIC_LABELS } from '@/types';
import { mockQuestions, getQuestionById } from '@/data/questions';
import { questionStorage, answerStorage, AnswerItem, followupStorage } from '@/utils/storage';
import TagBadge from '@/components/TagBadge';
import styles from './index.module.scss';

const QuestionDetailPage: React.FC = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [replyText, setReplyText] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportTarget, setReportTarget] = useState<{ type: string; id: string } | null>(null);
  const [followedUp, setFollowedUp] = useState<Set<string>>(new Set());
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = () => {
    const id = router.params.id;
    let foundQuestion: Question | null = null;
    
    if (id && id !== 'undefined') {
      const myQuestions = questionStorage.getMyQuestions();
      const localQuestion = myQuestions.find(q => q.id === id);
      
      if (localQuestion) {
        foundQuestion = localQuestion;
        setLikeCount(localQuestion.likeCount || 0);
        const localAnswers = answerStorage.getAnswersByQuestion(id);
        setAnswers(localAnswers);
        const localFollowups = followupStorage.getFollowups();
        const followedIds = new Set(localFollowups.map(f => f.answerId));
        setFollowedUp(followedIds);
      }
      
      if (!foundQuestion) {
        const mockQuestion = getQuestionById(id);
        if (mockQuestion) {
          foundQuestion = mockQuestion;
          setLikeCount(mockQuestion.likeCount);
        }
      }
    }
    
    if (!foundQuestion) {
      const myQuestions = questionStorage.getMyQuestions();
      if (myQuestions.length > 0) {
        const q = myQuestions[0];
        foundQuestion = q;
        setLikeCount(q.likeCount || 0);
        const localAnswers = answerStorage.getAnswersByQuestion(q.id);
        setAnswers(localAnswers);
      }
    }
    
    if (foundQuestion) {
      setQuestion(foundQuestion);
    }
  };

  const handleLike = (answerId?: string) => {
    if (answerId && question) {
      const myAnswers = answerStorage.getMyAnswers();
      const answerIndex = myAnswers.findIndex(a => a.id === answerId);
      if (answerIndex !== -1) {
        const updated = { ...myAnswers[answerIndex], likeCount: myAnswers[answerIndex].likeCount + 1 };
        myAnswers[answerIndex] = updated;
        Taro.setStorageSync('my_answers', myAnswers);
        setAnswers([...myAnswers.filter(a => a.questionId === question.id)]);
        Taro.showToast({ title: '点赞成功', icon: 'success' });
        return;
      }
    }
    
    if (question) {
      const newCount = likeCount + 1;
      setLikeCount(newCount);
      setQuestion({ ...question, likeCount: newCount });
      
      const myQuestions = questionStorage.getMyQuestions();
      const index = myQuestions.findIndex(q => q.id === question.id);
      if (index !== -1) {
        myQuestions[index] = { ...question, likeCount: newCount };
        Taro.setStorageSync('my_questions', myQuestions);
      }
      Taro.showToast({ title: '点赞成功', icon: 'success' });
    }
  };

  const handleAdopt = (answerId: string) => {
    Taro.showModal({
      title: '采纳回答',
      content: '确定采纳这个回答为最佳答案吗？',
      success: (res) => {
        if (res.confirm) {
          if (question) {
            const myAnswers = answerStorage.getMyAnswers();
            const answerIndex = myAnswers.findIndex(a => a.id === answerId);
            if (answerIndex !== -1) {
              myAnswers.forEach((a, idx) => {
                if (idx === answerIndex) {
                  a.isAdopted = true;
                } else if (a.questionId === question.id) {
                  a.isAdopted = false;
                }
              });
              Taro.setStorageSync('my_answers', myAnswers);
              setAnswers([...myAnswers.filter(a => a.questionId === question.id)]);
            }
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

    if (reportTarget?.type === 'followup' && question) {
      const newFollowup = {
        id: `f_${Date.now()}`,
        answerId: reportTarget.id,
        questionId: question.id,
        questionTitle: question.title,
        content: reportReason.replace('追问：', ''),
        createdAt: new Date().toLocaleString('zh-CN')
      };
      followupStorage.addFollowup(newFollowup);
      setFollowedUp(prev => new Set([...prev, reportTarget.id]));
      Taro.showToast({ title: '追问已发送', icon: 'success' });
    } else if (question) {
      const newReport = {
        id: `r_${Date.now()}`,
        type: reportTarget?.type as 'question' | 'answer' | 'experience',
        targetId: reportTarget?.id || question.id,
        targetContent: reportTarget?.type === 'answer' ? '回答内容' : question.title,
        reason: reportReason,
        status: 'pending' as const,
        createdAt: new Date().toLocaleString('zh-CN')
      };
      Taro.setStorageSync('my_reports', [newReport, ...(Taro.getStorageSync('my_reports') || [])]);
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

    if (!question) return;

    const newAnswer: AnswerItem = {
      id: `a_${Date.now()}`,
      questionId: question.id,
      content: replyText.trim(),
      author: '匿名用户',
      likeCount: 0,
      isAdopted: false,
      createdAt: new Date().toLocaleString('zh-CN')
    };

    answerStorage.addAnswer(newAnswer);
    const allAnswers = answerStorage.getAnswersByQuestion(question.id);
    setAnswers(allAnswers);
    
    setQuestion({ ...question, answerCount: question.answerCount + 1 });
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
            <View 
              className={`${styles.statItem} ${styles.statItemClickable}`}
              onClick={() => handleLike()}
            >
              <Text className={styles.statIcon}>👍</Text>
              <Text className={styles.statText}>{likeCount}</Text>
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
                      <Text>{followedUp.has(answer.id) ? '已追问' : '追问'}</Text>
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