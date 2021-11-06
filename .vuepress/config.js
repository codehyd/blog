module.exports = {
  "title": "amwanbai_blog",
  "description": "blog",
  "dest": "dist",

  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    // 引入jquery
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"
    }],
    // 引入鼠标点击脚本
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "/js/MouseClickEffect.js"
    }]
  ],
  "theme": "reco",
  "themeConfig": {
    logo: '/img/logo.jpg',
    "nav": [{
      "text": "首页",
      "link": "/",
      "icon": "reco-home"
    },
    {
      "text": "时间线",
      "link": "/timeline/",
      "icon": "reco-date"
    },
    // {
    //   "text": "Docs",
    //   "icon": "reco-message",
    //   "items": [{
    //     "text": "vuepress-reco",
    //     "link": "/docs/theme-reco/"
    //   }]
    // },
    {
      "text": "联系",
      "icon": "reco-message",
      "items": [{
        "text": "GitHub",
        "link": "https://github.com/codehyd",
        "icon": "reco-github"
      }]
    }
    ],
    "sidebar": {
      "/docs/theme-reco/": [

      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [{
      "title": "Github",
      "desc": "努力",
      // "email": "2303885822@qq.com",
      "link": "https://github.com/codehyd"
    }, {
      "title": "wx",
      "desc": "13229231326",
      // "email": "2303885822@qq.com",
      // "link": "https://github.com/codehyd"
    },],
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "amwanbai",
    "authorAvatar": "/img/logo.jpg",
    "record": "amwanbai",
    "startYear": "2021"
  },
  "markdown": {
    "lineNumbers": true
  },
  plugins: [
    ['@vuepress-reco/vuepress-plugin-kan-ban-niang', {
      theme: ['haruto', 'koharu', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
      modelStyle: {
        left: '50px',
        bottom: '-20px',
        opacity: '0.9'
      },
      messageStyle: {
        left: '28px',
        bottom: '190px'
      },
      btnStyle: {
        left: '50px',
        bottom: '40px'
      }
    }],
    ['vuepress-plugin-code-copy', true],
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTime: 2000
      }
    ]
  ]
}