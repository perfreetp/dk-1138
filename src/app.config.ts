export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/experience/index',
    'pages/vote/index',
    'pages/message/index',
    'pages/mine/index',
    'pages/question-detail/index',
    'pages/experience-detail/index',
    'pages/vote-detail/index',
    'pages/publish-vote/index',
    'pages/publish-question/index',
    'pages/my-questions/index',
    'pages/my-collections/index',
    'pages/mood-records/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#6366f1',
    navigationBarTitleText: '职场树洞',
    navigationBarTextStyle: 'white',
    backgroundColor: '#f8fafc'
  },
  tabBar: {
    color: '#94a3b8',
    selectedColor: '#6366f1',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '提问'
      },
      {
        pagePath: 'pages/experience/index',
        text: '经验'
      },
      {
        pagePath: 'pages/vote/index',
        text: '投票'
      },
      {
        pagePath: 'pages/message/index',
        text: '消息'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})