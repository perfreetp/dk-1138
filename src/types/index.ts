export type TagType = 'comfort' | 'solution' | 'resource';

export type TopicType = 'overtime' | 'communication' | 'performance' | 'teamwork' | 'career' | 'other';

export type MoodType = 'happy' | 'calm' | 'anxious' | 'sad' | 'angry';

export type MessageType = 'reply' | 'like' | 'adopt' | 'system';

export interface Question {
  id: string;
  title: string;
  content: string;
  tag: TagType;
  topic: TopicType;
  author: string;
  floor?: string;
  industry?: string;
  answerCount: number;
  likeCount: number;
  createdAt: string;
  expireAt?: string;
  isAnonymous: boolean;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  author: string;
  likeCount: number;
  isAdopted: boolean;
  createdAt: string;
  isAnonymous: boolean;
}

export interface Experience {
  id: string;
  title: string;
  content: string;
  topic: TopicType;
  author: string;
  likeCount: number;
  saveCount: number;
  createdAt: string;
  template?: string;
}

export interface Vote {
  id: string;
  title: string;
  options: VoteOption[];
  totalVotes: number;
  isMultiple: boolean;
  isAnonymous: boolean;
  expireAt: string;
  createdAt: string;
  author: string;
  hasVoted: boolean;
}

export interface VoteOption {
  id: string;
  text: string;
  voteCount: number;
  percentage: number;
}

export interface Message {
  id: string;
  type: MessageType;
  title: string;
  content: string;
  sender?: string;
  relatedId?: string;
  relatedType?: 'question' | 'experience' | 'vote';
  isRead: boolean;
  createdAt: string;
}

export interface MoodRecord {
  id: string;
  mood: MoodType;
  note?: string;
  createdAt: string;
}

export interface UserCollection {
  id: string;
  type: 'question' | 'experience' | 'template';
  relatedId: string;
  title: string;
  createdAt: string;
}

export const TAG_LABELS: Record<TagType, string> = {
  comfort: '求安慰',
  solution: '求方案',
  resource: '求资源'
};

export const TOPIC_LABELS: Record<TopicType, string> = {
  overtime: '加班话题',
  communication: '沟通技巧',
  performance: '绩效管理',
  teamwork: '团队协作',
  career: '职业发展',
  other: '其他'
};

export const MOOD_LABELS: Record<MoodType, string> = {
  happy: '开心',
  calm: '平静',
  anxious: '焦虑',
  sad: '难过',
  angry: '愤怒'
};