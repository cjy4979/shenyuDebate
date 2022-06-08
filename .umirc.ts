import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/schedule', component: '@/pages/schedule/index'},
    { path: '/team', component: '@/pages/teams/index'},
  ],
  fastRefresh: {},
  mfsu: {},
});
