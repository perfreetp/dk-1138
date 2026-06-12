import Taro from '@tarojs/taro';

const STORAGE_KEYS = {
  MY_QUESTIONS: 'my_questions',
  MY_COLLECTIONS: 'my_collections',
  MOOD_RECORDS: 'mood_records',
  MY_VOTES: 'my_votes',
  REPORTS: 'reports'
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

export const questionStorage = {
  getMyQuestions: () => storage.get(STORAGE_KEYS.MY_QUESTIONS, []),
  addQuestion: (question) => {
    const questions = questionStorage.getMyQuestions();
    questions.unshift(question);
    storage.set(STORAGE_KEYS.MY_QUESTIONS, questions);
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
  }
};

export const moodStorage = {
  getRecords: () => storage.get(STORAGE_KEYS.MOOD_RECORDS, []),
  addRecord: (record) => {
    const records = moodStorage.getRecords();
    records.unshift(record);
    storage.set(STORAGE_KEYS.MOOD_RECORDS, records);
  }
};

export const voteStorage = {
  getMyVotes: () => storage.get(STORAGE_KEYS.MY_VOTES, []),
  addVote: (vote) => {
    const votes = voteStorage.getMyVotes();
    votes.unshift(vote);
    storage.set(STORAGE_KEYS.MY_VOTES, votes);
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
  }
};

export const reportStorage = {
  getReports: () => storage.get(STORAGE_KEYS.REPORTS, []),
  addReport: (report) => {
    const reports = reportStorage.getReports();
    reports.unshift(report);
    storage.set(STORAGE_KEYS.REPORTS, reports);
  }
};