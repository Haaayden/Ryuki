# Ryuki
> Masked Rider Ryuki
my server code base on Koa

Ryuki Project
├── package.json
├── app.js
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service
│   |   └── user.js
│   ├── middleware
│   |   └── response_time.js
│   ├── schedule (future)
│   |   └── my_task.js
│   ├── public
│   |   └── reset.css
│   ├── view
│   |   └── home.tpl
│   └── extend (future)
│       ├── helper.js
│       ├── request.js
│       ├── response.js
│       ├── context.js
│       ├── application.js
│       └── agent.js
├── config
|   ├── config.default.js
│   ├── config.prod.js
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js

目录解释：
- `app/router.js` 用于配置 URL 路由规则
- `app/controller/**` 用于解析用户的输入，处理后返回相应的结果
- `app/service/**` 用于编写业务逻辑层
- `app/middleware/**` 用于编写中间件
- `app/public/**` 用于放置静态资源
- `config/config.{env}.js` 用于编写配置文件
- `test/**` 用于单元测试
- `app.js` 自定义初始化工作
- `app/view/**` 存放模板文件
- `app/model/**` 存放数据模型

待考虑：
- `app/schedule/**` 定时任务
- `app/extend/**` 框架扩展
