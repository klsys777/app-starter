# App Starter 验证清单

> 在项目根目录执行：`D:\git project\app-starter`
> PowerShell 里先进入目录：`cd "D:\git project\app-starter"`

## 0. 前置环境

- [ ] Node 已安装：`node -v`（Expo SDK 56 要求 **>= 22.13.x**，推荐 Node 22 LTS；Node 24 可能触发 `ERR_INVALID_PACKAGE_CONFIG`）
- [ ] npm 可用：`npm -v`
- [ ] 依赖已安装（有 `node_modules` 目录）。若没有：`npm install`

## 1. 静态检查（不启动 App，最快）

- [ ] 类型检查无错误：`npx tsc --noEmit`
  - 期望：无任何输出，命令退出码为 0
- [ ] 单元测试通过：`npm test`
  - 期望：`Tests: 6 passed, 6 total`

## 2. 打包验证（确认整个项目能编译）

- [ ] Web 打包成功（推荐用 npm script，避免 `npx` 偶发报错）：
  ```powershell
  npm run export:web
  ```
  或：
  ```powershell
  $env:NODE_OPTIONS="--max-old-space-size=8192"; npx expo export --platform web
  ```
  - 期望：最后一行出现 `Exported: dist`，过程中无 `error`
  - 说明：必须加大内存上限，否则会因 OOM 崩溃

## 3. 启动并人工验收（最终确认）

### 3.1 启动 Web（最方便，浏览器即可测）

- [ ] 运行：`npm run web`
- [ ] 浏览器自动打开（或手动访问终端显示的本地地址，通常 http://localhost:8081）
- [ ] 页面正常加载，不白屏、控制台无红色报错

### 3.2 启动手机（可选，需手机装 Expo Go）

- [ ] 运行：`npm run start`
- [ ] 手机用 Expo Go 扫描终端二维码
- [ ] App 正常加载

## 4. 功能验收（逐项手动点）

> 注意：注册/登录需要先配置后端（见第 5 节）。未配置时点击登录会提示"后端未配置"，这属于正常预期。

**无需后端也能验证的：**

- [ ] 启动后未登录，自动停留在「登录」页（不会进入主界面）
- [ ] 登录页能跳转到「注册」页、「找回密码」页，并能返回
- [ ] 输入框、按钮显示正常，点击有反馈

**配置后端后验证（见第 5 节）：**

- [ ] 注册：填邮箱+密码（≥6位）→ 提示注册成功
- [ ] 登录：用注册的账号登录 → 进入「首页」，显示邮箱
- [ ] 底部 Tab 可在「首页」「设置」间切换
- [ ] 首页点「查看个人资料」→ 打开资料页，显示邮箱/ID/注册时间
- [ ] 设置页切换主题：浅色 / 深色 / 跟随系统 → 界面颜色实时变化
- [ ] 杀掉 App 重新打开 → 主题保持上次选择（持久化生效）
- [ ] 杀掉 App 重新打开 → 仍保持登录状态（不需重新登录）
- [ ] 设置页点「退出登录」→ 回到登录页

## 5. 配置后端（启用注册/登录所需）

- [ ] 在 https://supabase.com 注册并新建一个项目
- [ ] 进入 Project Settings → API，复制 `Project URL` 和 `anon public` key
- [ ] 编辑项目根目录的 `.env`，填入：
  ```
  EXPO_PUBLIC_SUPABASE_URL=你的项目URL
  EXPO_PUBLIC_SUPABASE_ANON_KEY=你的anon key
  ```
- [ ] 重启开发服务（停掉再重新 `npm run web`），让环境变量生效
- [ ] 回到第 4 节完成「配置后端后验证」

## 出错时怎么办

- `ERR_INVALID_PACKAGE_CONFIG`（`expo/package.json` 或 `typescript/package.json`）：
  1. 切换到 Node 22 LTS：`nvm install 22` → `nvm use 22`（项目根目录有 `.nvmrc`）
  2. 重装依赖：删除 `node_modules` 后执行 `npm install`
  3. 改用 `npm run export:web`，不要直接用 `npx expo`
- 类型/测试报错：把报错信息发我。
- Web 打包 OOM（out of memory）：确认有加 `$env:NODE_OPTIONS="--max-old-space-size=8192"`。
- 启动白屏：看终端和浏览器控制台的红色报错，截图或贴给我。
- 登录提示"后端未配置"：说明 `.env` 没填或没重启服务。
