# Web 研发部 2022 年寒假考核

## 单人作业            前端：网易云音乐       田贺元2021211942

[TOC]

#### 项目内容及基本功能 

本项目仿照网易云音乐PC客户端，主要具有以下功能：

导航栏切换页面

登录    手机登录 获取用户头像、昵称与歌单

搜索   搜索单曲、专辑、歌手歌单、用户

个性推荐   推荐歌单、新音乐和MV

菜单栏 精准寻找歌单、歌手

音乐播放控制 （暂停、播放、上一首、下一首、进度拖拽) 

歌词高亮 等

#### 运行代码的方法

直接在`HomePage.html`中`open in Default Browser`

项目`github`地址：https://github.com/gfhcg/-

#### 代码目录结构与基本原理说明

##### 代码目录结构

文件：寒假考核—网易云音乐中主要有四种文件：

`html`文件：`HomePage.html`   项目所有的html部分

`CSS`文件：`HomePage.css`  主页样式

​                   `header.css` 头部导航栏样式

​                   `leftnav.css` 左侧导航栏样式

​                   `lisnav.css`  内部导航栏样式

​                   `bottom.css`   底部播放区样式

`Js`文件：  `HomePage.js`  主页`js`

​                    `Ajax.js`   剩余与`Ajax`相关的`js`

`png`图片

##### 基本原理说明

 `Js`部分采用原生Ajax发送请求获取数据

其中`获取歌单详情`由于接口问题，采用fetch发送请求获取数据

#### 常见问题说明

Failed to load resource: net::ERR_FAILED  隔时间重新加载直至正常

图片加载慢请耐心等待

获取歌单详情请先登录

