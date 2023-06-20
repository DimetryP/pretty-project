import VueRouter from 'vue-router'
import Home from './components/Home.vue';
import Auth from './components/Auth.vue';
import Event from './components/Event.vue';
import Visitor from './components/Visitor.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/auth', component: Auth },
  { path: '/events', component: Event },
  { path: '/visitors', component: Visitor },
  { path: '/settings', component: Settings }
];

const router = new VueRouter({ routes });

export default router;
