import { createRouter, createWebHistory } from 'vue-router';

import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Domain redirect to coaches
    { path: '/', redirect: '/coaches' },
    //Coachs list
    { path: '/coaches', component: CoachesList },
    //Coach description
    {
      path: '/coaches/:id',
      component: CoachDetails,
      // on component loaded > dynamic value for url is pasted in as a prop (id)
      props: true,
      children: [
        // contact a coach
        { path: 'contact', component: ContactCoach } // /coaches/id/contact
      ]
    },
    // Signup as a coach
    { path: '/register', component: CoachRegistration },
    // List of requests
    { path: '/requests', component: RequestReceived },
    // Not found route
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
