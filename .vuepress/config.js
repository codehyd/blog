module.exports = {
  "title": "amwambai_blog",
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
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    logo:'/logo.jpg',
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
        "text": "Contact",
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
        "",
        "theme",
        "plugin",
        "api",
        "aaa"
      
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
        "title": "amwanbai",
        "desc": "努力",
        "email": "2303885822@qq.com",
        "link": "https://github.com/codehyd"
      },
    ],
    // "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "amwanbai",
    "authorAvatar": "/logo.jpg",
    "record": "amwambai",
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
    ['vuepress-plugin-code-copy', true]
  ]
}