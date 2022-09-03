# timing tasks

## 使用

1. 服务器上找一个目录
    ```bash
    $ git clone --depth=1 https://github.com/palmcivet/timing-tasks
    $ cd timing-tasks
    $ cp .env.example .env
    ```
2. 填写 Cookie 等信息
    ```bash
    $ vi .env
    ```
3. 安装依赖
    ```bash
    $ pnpm install
    # npm install
    # yarn add
    ```
4. 运行 [start.sh](./start.sh) 脚本（或自行使用 [dockerfile](./dockerfile) 构建并执行）
    ```bash
    $ ./start.sh
    ```
5. 日志将记录在 [log](./log/) 目录

> 本项目使用 `-v` 将项目文件夹映射到 Docker 内，镜像不占据多余空间，可视情况删除 `.editorconfig`、`.prettierrc` 等不必要的文件

## 特性

- 掘金
    - 签到
    - 沾喜气
    - 挖矿
- 哔哩哔哩
    - 签到
    - 直播签到
    - 漫画签到
    - 观看并分享视频
- 什么值得买签到
- 网易云音乐签到
- IT 之家签到

## TODO

- [x] 邮件告警
- [ ] 自动刷新 Cookie

## 免责声明

本项目仅用于测试和学习研究，禁止商业等其他用途，本人不承担任何使用后果。
