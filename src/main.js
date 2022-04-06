import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/index.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { auth } from './firebase/config.js';

/* import specific icons */
import {
  faPlay,
  faCircle,
  faMusic,
  faTimes,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* add icons to the library */
library.add(faPlay, faCircle, faMusic, faTimes, faPencilAlt);

/* add font awesome icon component */

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.component('font-awesome-icon', FontAwesomeIcon);
    app.use(createPinia());
    app.use(router);

    app.mount('#app');
  }
});
