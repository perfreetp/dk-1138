import { Experience, TopicType } from '@/types';

const generateExperiences = (): Experience[] => {
  const experiences: Experience[] = [
    {
      id: 'e1',
      title: '如何优雅地拒绝加班？这几招很管用',
      content: '1. 提前沟通：在任务开始时就明确说明自己的时间安排\n2. 提供替代方案：比如"这个任务我可以明天一早优先处理"\n3. 用数据说话：展示当前的工作量已经饱和\n4. 保持专业态度：不要情绪化，用事实和逻辑说服对方',
      topic: 'overtime',
      author: '职场老鸟',
      likeCount: 456,
      saveCount: 234,
      createdAt: '2024-01-15',
      template: '您好，我理解这个任务很紧急。但我目前手头有[具体任务]需要在[截止时间]前完成。我可以[替代方案]，您看这样可以吗？'
    },
    {
      id: 'e2',
      title: '跨部门沟通的5个黄金法则',
      content: '1. 换位思考：理解对方的KPI和压力\n2. 明确目标：每次沟通前先明确要达成什么结果\n3. 留下证据：重要沟通要邮件确认\n4. 建立关系：平时多维护跨部门人脉\n5. 寻求支持：必要时请领导出面协调',
      topic: 'communication',
      author: '沟通达人',
      likeCount: 389,
      saveCount: 198,
      createdAt: '2024-01-14',
      template: '您好，关于[项目名称]，我们需要贵部门的配合。具体需求是[详细说明]，期望在[时间]前完成。如有疑问，随时沟通。谢谢！'
    },
    {
      id: 'e3',
      title: '年终绩效面谈的生存指南',
      content: '1. 提前准备：整理一年的工作成果和数据\n2. 主动引导：先说自己的亮点和贡献\n3. 正视不足：承认问题并提出改进计划\n4. 争取资源：借机提出培训或发展需求\n5. 留下记录：面谈后邮件确认关键内容',
      topic: 'performance',
      author: 'HR专家',
      likeCount: 567,
      saveCount: 312,
      createdAt: '2024-01-13',
      template: '感谢您的时间。关于今年的绩效，我想重点汇报以下几点：[成果1]、[成果2]。同时，我也认识到自己在[方面]还有提升空间，计划[改进措施]。'
    },
    {
      id: 'e4',
      title: '新员工如何快速融入团队',
      content: '1. 主动介绍：不要等别人来认识你\n2. 多问多学：虚心请教，不要怕"丢脸"\n3. 参与活动：团建、聚餐尽量参加\n4. 找到导师：请领导指定一位老员工带你\n5. 做好小事：先从小任务开始建立信任',
      topic: 'teamwork',
      author: '团队管理者',
      likeCount: 423,
      saveCount: 267,
      createdAt: '2024-01-12',
      template: '大家好，我是[姓名]，刚加入团队，负责[岗位]。很高兴认识大家，以后请多关照！有不懂的地方还请各位前辈多多指教。'
    },
    {
      id: 'e5',
      title: '职业转型的正确姿势',
      content: '1. 明确目标：想清楚为什么要转、转到哪里\n2. 能力盘点：分析现有技能哪些可迁移\n3. 补齐短板：针对性学习新领域知识\n4. 积累作品：在现有工作中创造相关成果\n5. 寻找机会：内部转岗比跳槽更容易',
      topic: 'career',
      author: '职业规划师',
      likeCount: 334,
      saveCount: 189,
      createdAt: '2024-01-11',
      template: '我对[目标岗位]很感兴趣，目前我已经[相关准备]。请问能否给我一些机会参与[相关项目]，让我在实践中学习和成长？'
    },
    {
      id: 'e6',
      title: '高效会议的7个技巧',
      content: '1. 明确议程：会前发议程，让大家有准备\n2. 控制时长：每个议题设定时间上限\n3. 指定记录人：确保有会议纪要\n4. 手机静音：减少干扰\n5. 鼓励发言：让每个人都有机会表达\n6. 形成决议：每个议题都要有结论\n7. 跟进执行：会后跟踪决议落实情况',
      topic: 'communication',
      author: '效率专家',
      likeCount: 278,
      saveCount: 156,
      createdAt: '2024-01-10',
      template: '会议主题：[主题]\n时间：[时长]\n议程：\n1. [议题1] - [负责人] - [时长]\n2. [议题2] - [负责人] - [时长]\n请各位提前准备相关资料。'
    },
    {
      id: 'e7',
      title: '如何应对职场PUA',
      content: '1. 识别PUA：否定你、打压你、让你怀疑自己\n2. 保持清醒：记录事实，不要被情绪操控\n3. 建立边界：学会说"不"，保护自己的利益\n4. 寻求支持：和信任的人倾诉，必要时向HR反映\n5. 做好准备：保留证据，为最坏情况做准备',
      topic: 'other',
      author: '心理咨询师',
      likeCount: 612,
      saveCount: 423,
      createdAt: '2024-01-09',
      template: '我理解您的要求，但我认为[我的观点]。根据[事实/数据]，[我的判断]。我建议[替代方案]，您看如何？'
    },
    {
      id: 'e8',
      title: '远程办公的自我管理心得',
      content: '1. 固定工作区：打造专属办公空间\n2. 规律作息：保持和办公室一样的时间表\n3. 每日计划：早上列出当天要完成的任务\n4. 定时沟通：固定时间汇报进度\n5. 适度运动：久坐记得起来活动\n6. 区分工作生活：下班后关闭工作通知',
      topic: 'other',
      author: '远程工作者',
      likeCount: 245,
      saveCount: 134,
      createdAt: '2024-01-08',
      template: '今日工作计划：\n1. [任务1] - 预计[时长]\n2. [任务2] - 预计[时长]\n\n今日完成情况：\n1. [任务1] - [状态]\n2. [任务2] - [状态]'
    },
    {
      id: 'e9',
      title: '项目延期了怎么向上汇报',
      content: '1. 及时汇报：发现问题立即说，不要拖\n2. 说明原因：客观分析延期原因\n3. 提出方案：给出补救措施和新时间表\n4. 承担责任：不推诿，展现担当\n5. 请求支持：需要什么资源明确说出来',
      topic: 'teamwork',
      author: '项目经理',
      likeCount: 356,
      saveCount: 201,
      createdAt: '2024-01-07',
      template: '关于[项目名称]进度汇报：\n原计划：[原计划]\n当前进度：[实际进度]\n延期原因：[原因分析]\n补救措施：[具体方案]\n新时间表：[调整后的计划]\n需要支持：[资源需求]'
    },
    {
      id: 'e10',
      title: '如何写一份高质量的工作周报',
      content: '1. 结构清晰：本周完成、进行中、下周计划\n2. 数据说话：用数字展示工作成果\n3. 突出重点：重要工作放前面\n4. 提出问题：遇到的困难要明确说出来\n5. 控制篇幅：简洁明了，一页纸足够',
      topic: 'performance',
      author: '职场导师',
      likeCount: 298,
      saveCount: 167,
      createdAt: '2024-01-06',
      template: '【本周工作总结】\n一、已完成工作\n1. [任务] - [成果/数据]\n\n二、进行中工作\n1. [任务] - [进度%]\n\n三、遇到的问题\n[问题描述]\n\n四、下周计划\n1. [任务] - [预计完成时间]'
    }
  ];
  return experiences;
};

export const mockExperiences = generateExperiences();

export const getExperiencesByTopic = (topic: TopicType): Experience[] => {
  return mockExperiences.filter(e => e.topic === topic);
};

export const getExperienceById = (id: string): Experience | undefined => {
  return mockExperiences.find(e => e.id === id);
};