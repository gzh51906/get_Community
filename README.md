#   react团队项目说明


### 项目名称

*   项目的名称为：get-我的运动装备潮流社区

### 演示

*   get-我的运动装备潮流社区官网地址
    *   http://www.dunkhome.com/
*   项目上线地址
    *   移动端地址
        *   http://49.232.25.17:1903
    *   后台管理系统地址
        *   http://49.232.25.17:1904

### git仓库地址
*   项目在github上的仓库地址
    *   git@github.com:gzh51906/get_Community.git

### 团队与分工
*   团队成员
    *   组长：陈日兴
    *   组员：黄日隆、苏沛龙、崔宇灏
*   负责模块说明
    *   陈日兴负责的部分
        *   数据爬取
            > 负责爬取网站的数据，并且把图片下载到本地
            > 整理数据，保存到MongoDB数据库中
        *   后台管理系统
            > 登陆组件与home组件
            > home组件下的资讯管理、商品管理、用户管理与订单管理模块
            > 每个模块的数据渲染、增删改查功能
    *   黄日隆负责的部分
        *   移动端
            > 登录注册模块
            > 扫货模块以及该模块下全部商品页面、app下载页面、个人中心页面、手机绑定页面、评测区页面、app顶部以及侧边栏
    *   苏沛龙负责的部分
        *   移动端
            > 首页、资讯模块、资讯页、详情页、购物车、订单页
    *   崔宇灏负责的部分
        *   移动端
            > 晒图区

### 项目页面截图
![avatar](http://49.232.25.17:1902/testImg/test1.png)

![avatar](http://49.232.25.17:1902/testImg/test2.png)

![avatar](http://49.232.25.17:1902/testImg/test3.png)

![avatar](http://49.232.25.17:1902/testImg/test4.png)

![avatar](http://49.232.25.17:1902/testImg/test5.png)

![avatar](http://49.232.25.17:1902/testImg/test6.png)


### 项目目录说明
```
team_reactProject
├── client
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── heightRouter
│   │   │   └── withAjax.js
│   │   ├── index.html
│   │   ├── index.js
│   │   ├── redux
│   │   │   ├── route
│   │   │   │   ├── LCart.js
│   │   │   │   └── rootsaga.js
│   │   │   └── store.js
│   │   └── route
│   │       ├── cyh
│   │       │   └── printing.js
│   │       ├── hrl
│   │       │   ├── allgoods.js
│   │       │   ├── api
│   │       │   │   └── api.js
│   │       │   ├── app.js
│   │       │   ├── evaluating.js
│   │       │   ├── login.js
│   │       │   ├── loginType.js
│   │       │   ├── loginType2.js
│   │       │   ├── personer.js
│   │       │   ├── redux
│   │       │   │   ├── reducer
│   │       │   │   │   └── login.js
│   │       │   │   ├── rootSaga.js
│   │       │   │   └── store.js
│   │       │   ├── reg-login.js
│   │       │   ├── reg.js
│   │       │   ├── saogoods.js
│   │       │   ├── style
│   │       │   │   ├── allgoods.css
│   │       │   │   ├── loadapp.css
│   │       │   │   ├── login.css
│   │       │   │   ├── personer.css
│   │       │   │   └── saogoods.css
│   │       │   └── usephone.js
│   │       └── spl
│   │           ├── cart.js
│   │           ├── css
│   │           │   └── Drawer.css
│   │           ├── detail.js
│   │           ├── Home.js
│   │           ├── New.js
│   │           ├── NewPage.js
│   │           └── orderList.js
│   └── webpack.config.js
├── manage
│   ├── src
│   │   ├── App.js
│   │   ├── component
│   │   │   ├── clientUser.js
│   │   │   ├── goodsAdd.js
│   │   │   ├── goodsEdit.js
│   │   │   ├── goodsMore.js
│   │   │   ├── goodsType.js
│   │   │   ├── manageUser.js
│   │   │   ├── manageUserAdd.js
│   │   │   ├── manageUserEdit.js
│   │   │   ├── orderMore.js
│   │   │   ├── orderReset.js
│   │   │   ├── zixunMore.js
│   │   │   ├── zixunMoreAdd.js
│   │   │   ├── ziXunMoreEdit.js
│   │   │   ├── zixuntype.js
│   │   │   └── zixuntypeadd.js
│   │   ├── heightRouter
│   │   │   └── withAjax.js
│   │   ├── index.html
│   │   ├── index.js
│   │   ├── redux
│   │   │   ├── route
│   │   │   │   ├── common.js
│   │   │   │   └── rootsaga.js
│   │   │   └── store.js
│   │   └── route
│   │       ├── home.js
│   │       └── login.js
│   └── webpack.config.js
├── README.md
├── server
│   ├── route
│   │   ├── common
│   │   │   ├── formatData.js
│   │   │   ├── mongo.js
│   │   │   └── token.js
│   │   ├── crx
│   │   │   ├── loadingData.js
│   │   │   ├── loadingData2.js
│   │   │   ├── login.js
│   │   │   ├── manageGoods.js
│   │   │   ├── manageOrder.js
│   │   │   ├── manageUser.js
│   │   │   └── manageZiXun.js
│   │   ├── hrl
│   │   │   ├── evaluating.js
│   │   │   ├── hallgoods.js
│   │   │   ├── hcart.js
│   │   │   ├── hgoodsprice.js
│   │   │   ├── hRes.js
│   │   │   ├── hsaogoods.js
│   │   │   ├── huser.js
│   │   │   ├── ignore.txt
│   │   │   └── sign.js
│   │   ├── index.js
│   │   └── spl
│   │       ├── Cart.js
│   │       ├── New.js
│   │       └── Order.js
│   ├── server.js
│   └── testImg
└── tree.txt


```



