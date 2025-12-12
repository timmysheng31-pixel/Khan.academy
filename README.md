# MyGames - 平台首页（示例）

这是一个简单的静态游戏平台首页模板，用于演示如何在页面中展示游戏卡并通过 iframe 播放内嵌 HTML5 游戏。

结构
- index.html: 主页
- styles.css: 样式
- app.js: 前端交互（搜索、分类、播放 modal）
- games/: 存放每款游戏的目录（例如 games/sample1/index.html）

本地运行
1. 将文件放在同一目录。
2. 在浏览器打开 index.html 即可（纯静态）。

部署
- 静态托管（推荐）：GitHub Pages / Netlify / Vercel。
- GitHub Pages: 把仓库推到 GitHub，然后在 Settings → Pages 选择分支 main（/）即可。
- Vercel/Netlify: 连接 GitHub 仓库，按默认设置部署。

后续建议
- 如果需要动态管理游戏，添加后端 API（Node.js/Express + 数据库或 Firebase）并改为前端从 API 拉取 games.json。
- 如果要支持上传游戏包，需实现后端的文件接收、解压和安全校验。

作者：timmysheng31-pixel
