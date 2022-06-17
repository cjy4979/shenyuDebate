import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/schedule', component: '@/pages/schedule/index'},
    { path: '/team', component: '@/pages/teams/index'},
    { path: '/first-team', component: '@/pages/firstTeam/index'},
  ],
  fastRefresh: {},
  mfsu: {},
});
