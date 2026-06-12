import Taro from '@tarojs/taro';

const STORAGE_KEYS = {
  MY_QUESTIONS: 'my_questions',
  MY_ANSWERS: 'my_answers',
  MY_COLLECTIONS: 'my_collections',
  MOOD_RECORDS: 'mood_records',
  MY_VOTES: 'my_votes',
  MY_REPORTS: 'my_reports',
  MY_FOLLOWUPS: 'my_followups'
};

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const value = Taro.getStorageSync(key);
      return value !== '' ? value : defaultValue;
    } catch (error) {
      console.error('[Storage] Get error:', error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      Taro.setStorageSync(key, value);
    } catch (error) {
      console.error('[Storage] Set error:', error);
    }
  },

  remove: (key: string): void => {
    try {
      Taro.removeStorageSync(key);
    } catch (error) {
      console.error('[Storage] Remove error:', error);
    }
  }
};

export { STORAGE_KEYS };

export interface CollectionItem {
  id: string;
  type: 'question' | 'experience' | 'template';
  relatedId: string;
  title: string;
  content?: string;
  createdAt: string;
}

export interface AnswerItem {
  id: string;
  questionId: string;
  content: string;
  author: string;
  likeCount: number;
  isAdopted: boolean;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  type: 'question' | 'answer' | 'experience';
  targetId: string;
  targetContent?: string;
  reason: string;
  status: 'pending' | 'processed';
  createdAt: string;
}

export interface FollowupItem {
  id: string;
  answerId: string;
  questionId: string;
  questionTitle: string;
  content: string;
  createdAt: string;
}

export interface VoteRecord {
  id: string;
  voteId: string;
  voteTitle: string;
  selectedOptions: string[];
  totalOptions: number;
  participatedAt: string;
}

export const questionStorage = {
  getMyQuestions: () => storage.get(STORAGE_KEYS.MY_QUESTIONS, []),
  addQuestion: (question) => {
    const questions = questionStorage.getMyQuestions();
    questions.unshift(question);
    storage.set(STORAGE_KEYS.MY_QUESTIONS, questions);
  }
};

export const answerStorage = {
  getMyAnswers: () => storage.get(STORAGE_KEYS.MY_ANSWERS, []),
  getAnswersByQuestion: (questionId: string) => {
    const answers = answerStorage.getMyAnswers();
    return answers.filter(a => a.questionId === questionId);
  },
  addAnswer: (answer: AnswerItem) => {
    const answers = answerStorage.getMyAnswers();
    answers.unshift(answer);
    storage.set(STORAGE_KEYS.MY_ANSWERS, answers);
  },
  updateAnswer: (updatedAnswer: AnswerItem) => {
    const answers = answerStorage.getMyAnswers();
    const index = answers.findIndex(a => a.id === updatedAnswer.id);
    if (index !== -1) {
      answers[index] = updatedAnswer;
      storage.set(STORAGE_KEYS.MY_ANSWERS, answers);
    }
  },
  getAnswerCount: () => {
    return answerStorage.getMyAnswers().length;
  }
};

export const collectionStorage = {
  getCollections: (): CollectionItem[] => storage.get(STORAGE_KEYS.MY_COLLECTIONS, []),
  addCollection: (item: CollectionItem) => {
    const collections = collectionStorage.getCollections();
    const exists = collections.some(c => 
      (c.type === item.type && c.relatedId === item.relatedId) ||
      (item.type === 'template' && c.type === 'template' && c.content === item.content)
    );
    if (!exists) {
      collections.unshift(item);
      storage.set(STORAGE_KEYS.MY_COLLECTIONS, collections);
    }
  },
  removeCollection: (id: string) => {
    const collections = collectionStorage.getCollections();
    const filtered = collections.filter(c => c.id !== id);
    storage.set(STORAGE_KEYS.MY_COLLECTIONS, filtered);
  },
  removeByRelatedId: (relatedId: string, type: string) => {
    const collections = collectionStorage.getCollections();
    const filtered = collections.filter(c => !(c.relatedId === relatedId && c.type === type));
    storage.set(STORAGE_KEYS.MY_COLLECTIONS, filtered);
  },
  isCollected: (relatedId: string, type: string) => {
    const collections = collectionStorage.getCollections();
    return collections.some(c => c.relatedId === relatedId && c.type === type);
  },
  isTemplateCollected: (content: string) => {
    const collections = collectionStorage.getCollections();
    return collections.some(c => c.type === 'template' && c.content === content);
  },
  getCollectionCount: () => {
    return collectionStorage.getCollections().length;
  }
};

export const moodStorage = {
  getRecords: () => storage.get(STORAGE_KEYS.MOOD_RECORDS, []),
  addRecord: (record) => {
    const records = moodStorage.getRecords();
    records.unshift(record);
    storage.set(STORAGE_KEYS.MOOD_RECORDS, records);
  },
  getRecordCount: () => {
    return moodStorage.getRecords().length;
  }
};

export const voteStorage = {
  getMyVotes: () => storage.get(STORAGE_KEYS.MY_VOTES, []),
  addVote: (vote) => {
    const votes = voteStorage.getMyVotes();
    const exists = votes.some(v => v.id === vote.id);
    if (!exists) {
      votes.unshift(vote);
      storage.set(STORAGE_KEYS.MY_VOTES, votes);
    }
  },
  updateVote: (updatedVote) => {
    const votes = voteStorage.getMyVotes();
    const index = votes.findIndex(v => v.id === updatedVote.id);
    if (index !== -1) {
      votes[index] = updatedVote;
      storage.set(STORAGE_KEYS.MY_VOTES, votes);
    }
  },
  getVoteById: (id: string) => {
    const votes = voteStorage.getMyVotes();
    return votes.find(v => v.id === id);
  },
  getVotedCount: () => {
    const votes = voteStorage.getMyVotes();
    return votes.filter(v => v.hasVoted).length;
  }
};

export const reportStorage = {
  getReports: (): ReportItem[] => storage.get(STORAGE_KEYS.MY_REPORTS, []),
  addReport: (report: ReportItem) => {
    const reports = reportStorage.getReports();
    reports.unshift(report);
    storage.set(STORAGE_KEYS.MY_REPORTS, reports);
  },
  getReportCount: () => {
    return reportStorage.getReports().filter(r => r.status === 'pending').length;
  }
};

export const followupStorage = {
  getFollowups: (): FollowupItem[] => storage.get(STORAGE_KEYS.MY_FOLLOWUPS, []),
  addFollowup: (followup: FollowupItem) => {
    const followups = followupStorage.getFollowups();
    followups.unshift(followup);
    storage.set(STORAGE_KEYS.MY_FOLLOWUPS, followups);
  },
  getFollowupCount: () => {
    return followupStorage.getFollowups().length;
  }
};