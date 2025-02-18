# 奥集能平台前端

![Image text](https://user-images.githubusercontent.com/8328012/201800690-9f5e989e-4ed3-4817-85b9-b594ac89fd31.png)

## 架构简介
面向下一代互联网发展趋势，基于动态演化的复杂系统多主体建模方法，以所有权作为第一优先级，运用零信任安全机制，按自组织分形理念提炼和抽象“沟通、办事、门户、数据、关系”等基础功能，为b端和c端融合的全场景业务的提供新一代分布式应用架构。    
## 基本功能
### 奥集能
奥集能（Orginone 发音[ˈɔːdʒɪnʌn]）个人和组织数字化一站式解决方案！   
奥：奥妙，莫名其妙。集，聚集，无中生有。能，赋能，点石成金。   
### 门户
按权限自定义工作台、动态信息，新闻资讯，交易商城，监控大屏，驾驶舱等各类页面。以用户为中心，汇聚各类数据和信息。
### 沟通
为个人和组织提供可靠、安全、私密的即时沟通工具，好友会话隐私保护作为第一优先级，同事和组织等工作会话单位数据权利归属优先。   
### 办事
满足个人、组织和跨组织协同办事需求，适应各类业务流程场景，支持发起、待办、已办、抄送、归档等不同状态流程类业务审核审批和查询。      
### 数据
用户对数据标准和存储方式拥有绝对控制权，自主选择存储资源，自定义数据标准、业务模型和管理流程，无代码配置应用，便捷迁移外部数据，支持通用文件系统管理功能。   
### 关系
支持个人和组织的关系的建立，好友和成员的管理，家庭、群组、单位、部门、集团等各类组织形态的构建，快速将工作和业务关系数字化、在线化，支持灵活的权限、角色和岗位管理等不同颗粒度的访问控制功能。   

### 本存储是奥集能的前端 VUE 实现。
- 体验地址：https://ocia.orginone.cn 
- 注册账号后可以申请加入一起研究群：research，协同研发群：asset_devops
# ogocns-vue
奥集能平台前端VUE版本  
框架使用Vue3 + TypeScript + Vite实现
## 目录介绍

```
.
├── build/dist              # 生成压缩包
├── public             # 静态资源，不需要 webpack 处理
└── src
    ├── assets
    │   ├── fonts      # 字体文件
    │   ├── img        #图片
    │   ├── js         # 不经过 npm 或 yarn 下载的第三方依赖包
    │   └── style       # reset 样式，及定义的常量文件等
    ├── components
    │   └── global     # 全局注册组件
    │       └── SvgIcon
    ├── icons          # svg 文件
    │   └── svg
    ├── router         # 路由及拦截器
    ├── services       # 统一的服务接口请求处理
    └── views
        ├── Chat         # 消息聊天
        ├── Home         # 主页
        ├── Layout       # 布局
        ├── Login        # 登录注册
        ├── Organization # 关系(集团、单位、群组)
        ├── Others       # 其他：如404页
        ├── Person       # 我的(个人)
        ├── Thing        # 数据
        ├── Work         # 工作台
```
## 文件命名规范

1. 路由文件夹 大驼峰
1. 页面文件本身 小驼峰
1. 页面级组件 写入 页面文件夹下 `components` 下
1. 全局组件 写入 `src/components` 下

## git规范

1. 命名要求：  
    1.1 统一前缀-姓名缩写-描述及日期。如 增加XX功能 ``feature/lw-addmain1101``  
    1.2 分支名称前缀如下
    
- common：调整通用组件、通用功能、通用数据接口、通用样式等  
- feature：新功能  
- fix：bug修复  
- hotfix：线上紧急修复  
- perf：性能优化  
- other：配置信息调整等非上面5种的改动改动  

2. 迭代要求：  
    2.1 `main` 分支为主干，所有迭代基于此分支进行获取  
    2.2 所有新功能迭代，问题修复等，需要进行发布，需要提交 `PR` 请求到 `main` 分支。  
    2.3 待系统上线后会拉出 `test` ,后续迭代与 `ISSUE`中问题进行关联的模式  



### 参与贡献

1. fork 项目
   1. 首先，找到 fork 按钮，点击以后，你的存储内就会出现一个一模一样的项目。
2. 项目开发
   1. 按照奥集能项目的编码规则，对代码进行开发。
3. 跟上主项目的步伐
   1. 在你开发的过程中，主项目的代码也可能在更新。此时就需要你同步主项目的代码，找到 **Pull request** 按钮，点击。
   2. 在左侧选择你的存储的项目，右侧为主项目，此时你能在下面看到两个项目的区别，**点击 create pull request 按钮。**
   3. 填写 title，**点击 create pull request 按钮。**
   4. 进入 pull request 页面，拉到最下面，**点击 Merge pull request 按钮并确认，**现在你和主项目的代码就是同步的了。
4. Pull request
   1. 当你觉得你的代码开发完成，可以推送时，在确保你的修改全部推送到了你的存储的项目中，然后进入你的存储的项目页面，**点击 New pull request 按钮**，
   2. 然后**点击 create pull request 按钮**进行代码提交。
5. 审核
   1. 待项目的开发者审批完成之后，就是贡献成功了。