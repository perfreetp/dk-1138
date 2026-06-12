import { Question, TagType, TopicType } from '@/types';

const generateQuestions = (): Question[] => {
  const questions: Question[] = [
    {
      id: 'q1',
      title: '刚入职被老员工排挤怎么办？',
      content: '入职一个月了，感觉老员工对我爱答不理的，工作上的问题问他们也不太愿意回答，感觉自己被孤立了，很焦虑...',
      tag: 'comfort',
      topic: 'teamwork',
      author: '匿名用户',
      floor: '3楼',
      industry: '互联网',
      answerCount: 23,
      likeCount: 156,
      createdAt: '2024-01-15 10:30',
      isAnonymous: true
    },
    {
      id: 'q2',
      title: '如何优雅地拒绝领导的不合理加班要求？',
      content: '领导经常下班前临时布置任务要求当天完成，导致经常加班到很晚，身体已经吃不消了，但不知道怎么拒绝...',
      tag: 'solution',
      topic: 'overtime',
      author: '匿名用户',
      industry: '金融',
      answerCount: 45,
      likeCount: 328,
      createdAt: '2024-01-14 18:20',
      isAnonymous: true
    },
    {
      id: 'q3',
      title: '有没有好用的项目管理工具推荐？',
      content: '团队现在用Excel管理项目，效率很低，想找一个好用的项目管理工具，最好支持看板和甘特图...',
      tag: 'resource',
      topic: 'teamwork',
      author: '匿名用户',
      floor: '5楼',
      answerCount: 18,
      likeCount: 89,
      createdAt: '2024-01-14 14:15',
      isAnonymous: true
    },
    {
      id: 'q4',
      title: '年终绩效被打了C，感觉很不公平',
      content: '这一年工作很努力，项目也都按时完成了，结果年终绩效被打了个C，领导说是因为"沟通能力不足"，但具体哪里不足也不说清楚...',
      tag: 'comfort',
      topic: 'performance',
      author: '匿名用户',
      industry: '互联网',
      answerCount: 67,
      likeCount: 412,
      createdAt: '2024-01-13 20:45',
      isAnonymous: true
    },
    {
      id: 'q5',
      title: '跨部门沟通总是被推诿怎么办？',
      content: '每次跨部门协作，对方总是找各种理由推诿，项目进度被严重拖延，跟领导反映也没用，这种情况怎么处理？',
      tag: 'solution',
      topic: 'communication',
      author: '匿名用户',
      floor: '8楼',
      answerCount: 34,
      likeCount: 198,
      createdAt: '2024-01-13 15:30',
      isAnonymous: true
    },
    {
      id: 'q6',
      title: '想转行做产品经理，需要学习哪些技能？',
      content: '目前是运营岗位，想转行做产品经理，但不知道从哪里开始学习，有没有过来人分享一下经验？',
      tag: 'resource',
      topic: 'career',
      author: '匿名用户',
      industry: '电商',
      answerCount: 28,
      likeCount: 145,
      createdAt: '2024-01-12 11:20',
      isAnonymous: true
    },
    {
      id: 'q7',
      title: '团队氛围很差，要不要离职？',
      content: '入职半年了，团队氛围一直很压抑，同事之间基本不交流，领导也很严厉，每天上班都很痛苦...',
      tag: 'comfort',
      topic: 'teamwork',
      author: '匿名用户',
      floor: '2楼',
      answerCount: 52,
      likeCount: 367,
      createdAt: '2024-01-12 09:00',
      isAnonymous: true
    },
    {
      id: 'q8',
      title: '如何提高会议效率？',
      content: '每天各种会议占用了大量时间，而且很多会议效率很低，没有结论，怎么才能让会议更高效？',
      tag: 'solution',
      topic: 'communication',
      author: '匿名用户',
      industry: '互联网',
      answerCount: 19,
      likeCount: 78,
      createdAt: '2024-01-11 16:40',
      isAnonymous: true
    },
    {
      id: 'q9',
      title: '有没有好的时间管理方法推荐？',
      content: '感觉每天都很忙，但重要的事情却没做几件，想学习一些时间管理的方法，提高工作效率...',
      tag: 'resource',
      topic: 'other',
      author: '匿名用户',
      floor: '6楼',
      answerCount: 31,
      likeCount: 203,
      createdAt: '2024-01-11 14:25',
      isAnonymous: true
    },
    {
      id: 'q10',
      title: '领导总是临时改需求，怎么应对？',
      content: '每次做完的东西，领导总是说"不是这个意思"，然后要求重做，已经改了5版了，心态崩了...',
      tag: 'solution',
      topic: 'communication',
      author: '匿名用户',
      industry: '广告',
      answerCount: 41,
      likeCount: 289,
      createdAt: '2024-01-10 19:15',
      isAnonymous: true
    }
  ];
  return questions;
};

export const mockQuestions = generateQuestions();

export const getQuestionsByTag = (tag: TagType): Question[] => {
  return mockQuestions.filter(q => q.tag === tag);
};

export const getQuestionsByTopic = (topic: TopicType): Question[] => {
  return mockQuestions.filter(q => q.topic === topic);
};

export const getQuestionById = (id: string): Question | undefined => {
  return mockQuestions.find(q => q.id === id);
};