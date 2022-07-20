import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {
    loading: '@/pages/loading/Loading',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  favicon:'/favicon.ico',
  proxy: {
    '/api': {
      'target': 'http://localhost:8005/',
      'pathRewrite': { '^/api' : '/api' },
    },
  },
  routes: [
    { path: '/', component: '@/pages/index',title:'深语10.0 萌宠主题辩论赛'},
    { path: '/help', component: '@/pages/help',title:'深语系统使用指南'},
    { path: '/login', component: '@/pages/Login/Login.tsx',title:'登录'},
    { path: '/schedule', component: '@/pages/schedule/index',title:'深语10.0 赛程安排',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/team', component: '@/pages/teams/index',title:'深语10.0 队伍筛选',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/personnel', component: '@/pages/personnel/index',title:'深语10.0 对阵',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/work', component: '@/pages/work/index',title:'深语10.0 人员安排',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/statistics', component: '@/pages/statistics/index',title:'深语10.0 赛果',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/m-back', component: '@/pages/backmobile/Mobile',title:'深语10.0 赛果',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/back', component: '@/pages/BackDetail/index',title:'深语10.0 赛果单(备用)',wrappers: ['@/pages/wrappers/auth.tsx']},
    { path: '/vj/questionnaire', component: '@/pages/results/questionnaire/index', title: "赛果收集" },
    { path: '/vj/success', component: '@/pages/results/success/success.tsx', title: "提交成功" },
  ],
  fastRefresh: {},
  mfsu: {},
});
