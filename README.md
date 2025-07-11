Next: ssr/ssg, i18n, jest/cypress,cd/cd,api路由,动态导入,hooks,context,redux/zustand,tailwind.restful,服务器组件
next+cypress https://github.com/yuandabo/jest-practices/tree/main/next/with-cypress-app
为什么选择nextjs 性能优化、开发效率提升 和 全栈能力。多渲染模式、路由系统和内置优化工具，使得从个人项目到企业级应用均能高效构建。对于追求高性能、高可维护性和快速迭代的团队，Next.js 是不可或缺的选择。
Next 项目目标：
[x] SEO：SSG、ISR、SSR 
[x] Tailwind CSS 
[x] 动态路由 
[x] 全栈开发 
[x] 图像优化 
[x] 自动代码拆分
[x] 缓存机制 useSWR  
[x] HTTP 头管理 
[x] 结合鉴权中间件
[x] 国际化
项目地址：https://github.com/yuandabo/next-portal-app

next-intl 国际化方案：
app-router-without-i18n-routing：
SEO 考虑：无 i18n 路由可能对 SEO 不利，因为搜索引擎无法通过 URL 区分语言。如果 SEO 是关键需求，考虑使用 next-intl 的 i18n ავ
app-router：

Vscode 插件：i18n Ally


generateStaticParams 与 getStaticPaths 区别 
generateStaticParams 和 getStaticPaths 都是 Next.js 中用于静态站点生成（SSG）的函数，主要用于处理动态路由。它们的作用是在构建时为动态路由生成静态参数，从而预渲染对应的静态页面。虽然功能相似，但它们在 Next.js 的路由系统、使用场景和 API 设计上有一些关键区别。
区别
1. 路由系统
  - generateStaticParams：用于 App Router（Next.js 13 及更高版本），在 app/ 目录下工作。
  - getStaticPaths：用于 Pages Router（Next.js 12 及更早版本），在 pages/ 目录下工作。
2. API 设计
  - generateStaticParams：直接返回一个参数数组，结构更简单。 
  - export async function generateStaticParams() {
  -   return [
  -     { id: '1' },
  -     { id: '2' },
  -   ];
  - }
  - getStaticPaths：返回一个对象，包含 paths 和 fallback 两个属性。 
  - export async function getStaticPaths() {
  -   return {
  -     paths: [
  -       { params: { id: '1' } },
  -       { params: { id: '2' } },
  -     ],
  -     fallback: false,
  -   };
  - }
3. Fallback 行为
  - getStaticPaths：需要明确指定 fallback 属性，可选值包括： 
    - false：未预渲染的路径返回 404。
    - true：未预渲染的路径会触发按需生成。
    - 'blocking'：未预渲染的路径会等待生成后返回。
  - generateStaticParams：没有 fallback 属性，动态路由的未预渲染行为由 App Router 的其他机制控制。
4. 使用场景
  - generateStaticParams：在 App Router 的动态路由中使用，通常与 app/[id]/page.js 这样的文件结合。
  - getStaticPaths：在 Pages Router 中与 getStaticProps 配合使用，通常用于 pages/[id].js 这样的文件。
App Router 与 Pages Router 区别
1. 架构与文件结构
- Pages Router： 
  - 基于 pages/ 目录，文件名直接映射到路由。
  - 例如：pages/products/[id].js 对应 /products/:id 动态路由。
  - API 路由放在 pages/api/ 下。
  - 适合传统 Next.js 项目，结构简单直观。
  - 电商场景示例：pages/cart.js 用于购物车页面，pages/api/orders.js 用于订单 API。
- App Router： 
  - 基于 app/ 目录（Next.js 13 及以上引入），支持更灵活的路由和嵌套布局。
  - 使用文件夹结构定义路由，例如 app/products/[id]/page.js 对应 /products/:id。
  - 支持文件约定，如 layout.js（布局）、page.js（页面）、route.js（API 路由）。
  - 电商场景示例：app/cart/page.js 用于购物车页面，app/api/orders/route.js 用于订单 API。
2. 渲染模式
- Pages Router： 
  - 支持 SSG（getStaticProps）、ISR（getStaticProps + revalidate）、SSR（getServerSideProps）。
  - 动态渲染通过 export const dynamic = "force-dynamic"; 等配置控制。
  - 电商场景：产品详情页用 SSG（getStaticProps），购物车用 SSR（getServerSideProps）。
- App Router： 
  - 默认支持 SSG、ISR、SSR，并引入 React Server Components (RSC)，服务器组件默认静态渲染。
  - 动态渲染更细粒度，可通过 dynamic、fetch 的 cache 选项或 revalidate 控制。
  - 电商场景：产品详情页用 app/products/[id]/page.js 配合 revalidate 实现 ISR，购物车页面用 dynamic = "force-dynamic" 实现 SSR。
3. 布局与嵌套路由
- Pages Router： 
  - 布局需要手动实现，通常通过高阶组件或自定义 _app.js。
  - 嵌套路由通过文件系统实现，但不支持原生嵌套布局。
  - 电商场景：需要在 _app.js 中统一添加导航栏，子页面无法独立定义布局。
- App Router： 
  - 原生支持嵌套布局，通过 layout.js 文件定义共享 UI。
  - 支持并行路由（slot 文件夹）和条件路由（page.js 条件渲染）。
  - 电商场景：app/layout.js 定义全局导航栏，app/products/layout.js 为产品相关页面添加侧边栏。
4. API 路由
- Pages Router： 
  - API 路由定义在 pages/api/ 下，导出默认处理函数。
  - 示例：pages/api/orders.js 处理订单请求。
  - 简单直接，但功能较为单一。
- App Router： 
  - API 路由定义在 app/api/[route]/route.js，使用 HTTP 方法（如 GET、POST）定义处理逻辑。
  - 示例：app/api/orders/route.js 中定义 export async function POST() {}。
  - 更现代化的 API 处理方式，支持更复杂的路由逻辑。
5. 中间件
- Pages Router： 
  - 中间件定义在 middleware.js（根目录），但功能有限，主要用于全局拦截。
  - 电商场景：通过中间件实现鉴权，保护 /dashboard 页面。
- App Router： 
  - 中间件功能更强大，支持路径匹配和更细粒度的控制。
  - 定义在 middleware.js（根目录），可结合国际化、鉴权等。
  - 电商场景：用中间件实现多语言路由重定向或用户认证。
6. 国际化 (i18n)
- Pages Router： 
  - 通过 next.config.js 配置 i18n，支持多语言路由（如 /en/cart）。
  - 需要配合库如 next-i18next 管理翻译。
  - 电商场景：实现英文和中文版本的购物车页面。
- App Router： 
  - 原生支持更灵活的国际化，可通过 middleware.js 动态处理语言路由。
  - 同样支持 next-i18next，但布局系统让多语言页面更易管理。
  - 电商场景：为不同语言版本的页面定义独立布局。
7. 图像优化与性能
- Pages Router： 
  - 使用 next/image 进行图像优化，自动代码拆分由框架处理。
  - 缓存通过 HTTP 头或 getStaticProps 控制。
  - 电商场景：产品图片用 <Image> 优化加载。
- App Router： 
  - 图像优化与 Pages Router 一致，但支持更细粒度的服务器组件优化。
  - 缓存机制更强大，支持 fetch 的 cache 选项和 revalidatePath。
  - 电商场景：结合服务器组件减少客户端 JavaScript，提升产品列表性能。
8. 全栈开发与工具支持
- Pages Router： 
  - 全栈开发通过 pages/api/ 和页面逻辑实现，适合中小型项目。
  - 工具生态成熟，但部分新特性（如 React 18 的新功能）需要额外配置。
  - 电商场景：用 pages/api/ 实现订单处理，配合 useSWR 获取数据。
- App Router： 
  - 更适合现代全栈开发，React Server Components 减少客户端代码。
  - 原生支持 useSWR 等工具，API 路由更现代化。
  - 电商场景：用 app/api/ 实现订单 API，服务器组件优化产品列表渲染。
9. 迁移与兼容性
- Pages Router： 
  - 老项目多使用 Pages Router，社区资源丰富。
  - 逐步迁移到 App Router 需要重构路由和布局。
- App Router： 
  - Next.js 13 及以上推荐使用，未来发展方向。
  - 支持与 Pages Router 共存（通过配置），便于逐步迁移。
10. 适用场景
- Pages Router： 
  - 适合快速原型开发或中小型电商项目。
  - 对传统 Next.js 开发熟悉的团队。
  - 您的需求（如 SSG、ISR、SSR、动态路由）完全支持。
- App Router： 
  - 适合需要复杂布局、现代化功能或大规模电商项目。
  - 希望利用 React Server Components 和最新 Next.js 特性的团队。
  - 您的需求（如鉴权中间件、国际化、图像优化）在 App Router 中有更优实现。
电商项目选择建议
根据您的需求（SSG、ISR、SSR、Tailwind CSS、动态路由、全栈开发等），两者都能满足，但：
- 选择 Pages Router：如果您希望快速上手，团队熟悉传统 Next.js，或者项目规模较小，Pages Router 更简单直接。
- 选择 App Router：如果您追求现代化开发体验、复杂布局（如多语言嵌套布局）、更细粒度的性能优化，或者计划长期维护项目，App Router 是更好的选择。
