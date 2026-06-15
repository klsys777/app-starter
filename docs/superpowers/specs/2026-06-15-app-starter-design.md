# App Starter 通用跨平台应用底座设计

## 背景

目标是在 `D:\git project\app-starter` 下创建一个可复用的跨平台 App 项目底座。这个底座既可以作为以后新项目的模板，也可以逐步演化成真实可上线产品。

当前不先绑定具体业务类型，而是优先实现多数 App 都会复用的基础能力：认证、路由、状态、本地存储、主题、设置页和基础 UI 组件。

## 技术路线

采用方案 A：`React Native + Expo + TypeScript`。

推荐原因：

- 生态主流，资料多，适合长期维护。
- 同一套代码优先支持 iOS 和 Android，并可通过 Expo Web 支持浏览器。
- Expo Router、推送、构建、发布和 OTA 更新能力成熟。
- 后续接入 Supabase、Firebase、支付、监控等服务比较方便。

默认技术选型：

- App 框架：Expo
- 语言：TypeScript
- 路由：Expo Router
- 状态管理：Zustand
- 后端服务：Supabase
- 网络层：统一封装 `fetch` 或 Axios
- 本地存储：SecureStore + AsyncStorage
- 测试：Jest + React Native Testing Library

## 第一版范围

第一版只做通用底座，不做具体业务功能。

包含：

- 邮箱注册、邮箱登录、登出、找回密码
- 登录态持久化
- 根布局登录态守卫
- 首页、设置页、个人资料页
- 深色/浅色主题切换
- 多语言结构预留
- 统一网络请求封装
- 通用 UI 组件
- 基础错误提示
- 基础测试覆盖

不包含：

- 支付和订阅
- 聊天、内容流、商城等具体业务
- 复杂后台管理系统
- 完整 E2E 自动化测试
- 自建后端服务

## 架构

整体采用简单分层：

```text
页面 / 组件
  -> store 或 service
  -> Supabase / 本地存储 / API
  -> 更新 store
  -> 页面刷新
```

页面层负责展示和用户交互；状态层负责登录态、用户信息和主题；服务层负责认证、网络请求、本地存储和后端适配。

页面不直接依赖 Supabase SDK，统一通过 `src/services/` 访问。这样以后从 Supabase 切换到自建后端时，主要改服务层。

## 建议目录结构

```text
app/
  (auth)/
    sign-in.tsx
    sign-up.tsx
    forgot-password.tsx
  (tabs)/
    index.tsx
    settings.tsx
  profile.tsx
  _layout.tsx
src/
  components/
    Button.tsx
    TextInput.tsx
    Loading.tsx
    EmptyState.tsx
    ErrorMessage.tsx
    ScreenContainer.tsx
  hooks/
  i18n/
  services/
    apiClient.ts
    authService.ts
    storageService.ts
    supabaseClient.ts
  store/
    authStore.ts
    themeStore.ts
  theme/
    colors.ts
    theme.ts
  utils/
```

## 页面设计

未登录区域：

- 登录页
- 注册页
- 找回密码页

登录后区域：

- 首页：显示欢迎信息、当前用户状态和业务入口占位。
- 设置页：账号信息、主题切换、语言入口预留、关于 App、退出登录。
- 个人资料页：展示用户邮箱、昵称等基础资料。

## 通用模块

认证模块：

- 邮箱注册
- 邮箱登录
- 登出
- 找回密码
- 初始化登录态

状态模块：

- `authStore` 保存当前用户、登录状态、初始化状态。
- `themeStore` 保存当前主题，并同步到本地存储。

服务模块：

- `authService` 封装 Supabase 认证能力。
- `storageService` 统一处理本地安全存储和普通缓存。
- `apiClient` 统一处理请求、token、错误转换。

UI 模块：

- Button
- TextInput
- Loading
- EmptyState
- ErrorMessage
- ScreenContainer

## 错误处理

错误处理保持统一但不过度复杂：

- 表单错误显示在对应输入区域。
- 登录失败显示用户可理解的提示。
- 网络错误统一转换成提示文案。
- 未登录访问自动跳转登录页。
- 初始化失败时显示可重试页面。

内部保留原始错误，后续可接入 Sentry。

## 测试策略

第一版测试以实用为主：

- 单元测试：工具函数、store 行为、service 返回处理。
- 组件测试：Button、TextInput、ErrorMessage、Loading。
- 手动验收：注册、登录、退出、切换主题、刷新后保持登录态。

暂不强制复杂 E2E 测试，等通用底座稳定后再补。

## 验收标准

第一版完成后应满足：

- 项目可在 Expo 开发环境启动。
- 未登录用户只能访问认证页面。
- 登录后用户进入主界面。
- 用户可以登出并回到登录页。
- 主题切换可生效并持久化。
- 通用 UI 组件可在页面中复用。
- 服务层与页面层解耦，页面不直接调用 Supabase SDK。
- 基础测试可以运行并通过。

