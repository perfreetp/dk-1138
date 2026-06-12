import { Message, MessageType } from '@/types';

const generateMessages = (): Message[] => {
  const messages: Message[] = [
    {
      id: 'm1',
      type: 'reply',
      title: '有人回复了你的问题',
      content: '"刚入职被老员工排挤怎么办？"收到了新的回复',
      sender: '匿名用户',
      relatedId: 'q1',
      relatedType: 'question',
      isRead: false,
      createdAt: '2024-01-15 14:30'
    },
    {
      id: 'm2',
      type: 'like',
      title: '你的回答获得了点赞',
      content: '你在"如何优雅地拒绝加班"下的回答获得了23个赞',
      relatedId: 'q2',
      relatedType: 'question',
      isRead: false,
      createdAt: '2024-01-15 12:20'
    },
    {
      id: 'm3',
      type: 'adopt',
      title: '你的回答被采纳了',
      content: '恭喜！你在"跨部门沟通技巧"下的回答被提问者采纳',
      relatedId: 'q5',
      relatedType: 'question',
      isRead: true,
      createdAt: '2024-01-14 18:45'
    },
    {
      id: 'm4',
      type: 'reply',
      title: '有人追问了你的回答',
      content: '"关于年终绩效面谈的建议，能详细说说吗？"',
      sender: '匿名用户',
      relatedId: 'q4',
      relatedType: 'question',
      isRead: true,
      createdAt: '2024-01-14 16:30'
    },
    {
      id: 'm5',
      type: 'system',
      title: '系统通知',
      content: '你发布的投票"团建时间调查"已有151人参与',
      relatedId: 'v1',
      relatedType: 'vote',
      isRead: true,
      createdAt: '2024-01-14 10:00'
    },
    {
      id: 'm6',
      type: 'like',
      title: '你的经验分享获得了点赞',
      content: '"如何优雅地拒绝加班？这几招很管用"获得了456个赞',
      relatedId: 'e1',
      relatedType: 'experience',
      isRead: true,
      createdAt: '2024-01-13 20:15'
    },
    {
      id: 'm7',
      type: 'reply',
      title: '有人回复了你的问题',
      content: '"想转行做产品经理，需要学习哪些技能？"收到了新的回复',
      sender: '产品老兵',
      relatedId: 'q6',
      relatedType: 'question',
      isRead: true,
      createdAt: '2024-01-13 15:40'
    },
    {
      id: 'm8',
      type: 'system',
      title: '内容即将过期提醒',
      content: '你发布的"加班频率调查"将在2天后过期',
      relatedId: 'v2',
      relatedType: 'vote',
      isRead: true,
      createdAt: '2024-01-12 09:00'
    }
  ];
  return messages;
};

export const mockMessages = generateMessages();

export const getUnreadCount = (): number => {
  return mockMessages.filter(m => !m.isRead).length;
};

export const getMessagesByType = (type: MessageType): Message[] => {
  return mockMessages.filter(m => m.type === type);
};