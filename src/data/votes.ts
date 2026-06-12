import { Vote } from '@/types';

const generateVotes = (): Vote[] => {
  const votes: Vote[] = [
    {
      id: 'v1',
      title: '你希望团建活动安排在什么时候？',
      options: [
        { id: 'v1o1', text: '工作日下班后', voteCount: 23, percentage: 15 },
        { id: 'v1o2', text: '周末白天', voteCount: 67, percentage: 44 },
        { id: 'v1o3', text: '周末晚上', voteCount: 45, percentage: 30 },
        { id: 'v1o4', text: '不希望有团建', voteCount: 16, percentage: 11 }
      ],
      totalVotes: 151,
      isMultiple: false,
      isAnonymous: true,
      expireAt: '2024-01-20 18:00',
      createdAt: '2024-01-15 09:00',
      author: '匿名用户',
      hasVoted: false
    },
    {
      id: 'v2',
      title: '你认为目前的加班频率合理吗？',
      options: [
        { id: 'v2o1', text: '非常合理', voteCount: 12, percentage: 8 },
        { id: 'v2o2', text: '基本合理', voteCount: 34, percentage: 23 },
        { id: 'v2o3', text: '有点频繁', voteCount: 56, percentage: 38 },
        { id: 'v2o4', text: '非常不合理', voteCount: 45, percentage: 31 }
      ],
      totalVotes: 147,
      isMultiple: false,
      isAnonymous: true,
      expireAt: '2024-01-18 18:00',
      createdAt: '2024-01-14 10:30',
      author: '匿名用户',
      hasVoted: true
    },
    {
      id: 'v3',
      title: '你希望增加哪些福利？（多选）',
      options: [
        { id: 'v3o1', text: '弹性工作时间', voteCount: 89, percentage: 60 },
        { id: 'v3o2', text: '健身房/运动补贴', voteCount: 67, percentage: 45 },
        { id: 'v3o3', text: '免费下午茶', voteCount: 78, percentage: 53 },
        { id: 'v3o4', text: '培训学习预算', voteCount: 56, percentage: 38 },
        { id: 'v3o5', text: '补充医疗保险', voteCount: 45, percentage: 30 }
      ],
      totalVotes: 148,
      isMultiple: true,
      isAnonymous: true,
      expireAt: '2024-01-22 18:00',
      createdAt: '2024-01-13 14:00',
      author: '匿名用户',
      hasVoted: false
    },
    {
      id: 'v4',
      title: '你对目前的远程办公政策满意吗？',
      options: [
        { id: 'v4o1', text: '非常满意', voteCount: 34, percentage: 23 },
        { id: 'v4o2', text: '比较满意', voteCount: 56, percentage: 38 },
        { id: 'v4o3', text: '一般', voteCount: 45, percentage: 30 },
        { id: 'v4o4', text: '不满意', voteCount: 14, percentage: 9 }
      ],
      totalVotes: 149,
      isMultiple: false,
      isAnonymous: true,
      expireAt: '2024-01-19 18:00',
      createdAt: '2024-01-12 11:20',
      author: '匿名用户',
      hasVoted: false
    },
    {
      id: 'v5',
      title: '你希望年终奖发放形式是？',
      options: [
        { id: 'v5o1', text: '一次性发放', voteCount: 89, percentage: 60 },
        { id: 'v5o2', text: '分两次发放', voteCount: 34, percentage: 23 },
        { id: 'v5o3', text: '按月发放', voteCount: 26, percentage: 17 }
      ],
      totalVotes: 149,
      isMultiple: false,
      isAnonymous: true,
      expireAt: '2024-01-17 18:00',
      createdAt: '2024-01-11 16:45',
      author: '匿名用户',
      hasVoted: true
    },
    {
      id: 'v6',
      title: '你认为团队沟通中最需要改进的是什么？',
      options: [
        { id: 'v6o1', text: '会议效率', voteCount: 67, percentage: 45 },
        { id: 'v6o2', text: '信息同步及时性', voteCount: 56, percentage: 38 },
        { id: 'v6o3', text: '跨部门协作', voteCount: 78, percentage: 52 },
        { id: 'v6o4', text: '反馈机制', voteCount: 45, percentage: 30 }
      ],
      totalVotes: 150,
      isMultiple: true,
      isAnonymous: true,
      expireAt: '2024-01-21 18:00',
      createdAt: '2024-01-10 09:30',
      author: '匿名用户',
      hasVoted: false
    },
    {
      id: 'v7',
      title: '你希望公司提供哪些培训？',
      options: [
        { id: 'v7o1', text: '专业技能培训', voteCount: 89, percentage: 60 },
        { id: 'v7o2', text: '管理能力培训', voteCount: 56, percentage: 38 },
        { id: 'v7o3', text: '沟通技巧培训', voteCount: 67, percentage: 45 },
        { id: 'v7o4', text: '行业趋势分享', voteCount: 45, percentage: 30 }
      ],
      totalVotes: 148,
      isMultiple: true,
      isAnonymous: true,
      expireAt: '2024-01-23 18:00',
      createdAt: '2024-01-09 14:20',
      author: '匿名用户',
      hasVoted: false
    },
    {
      id: 'v8',
      title: '你对目前的绩效考核方式满意吗？',
      options: [
        { id: 'v8o1', text: '非常满意', voteCount: 12, percentage: 8 },
        { id: 'v8o2', text: '比较满意', voteCount: 34, percentage: 23 },
        { id: 'v8o3', text: '一般', voteCount: 67, percentage: 45 },
        { id: 'v8o4', text: '不满意', voteCount: 36, percentage: 24 }
      ],
      totalVotes: 149,
      isMultiple: false,
      isAnonymous: true,
      expireAt: '2024-01-16 18:00',
      createdAt: '2024-01-08 10:15',
      author: '匿名用户',
      hasVoted: true
    }
  ];
  return votes;
};

export const mockVotes = generateVotes();

export const getVoteById = (id: string): Vote | undefined => {
  return mockVotes.find(v => v.id === id);
};