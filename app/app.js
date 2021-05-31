import Vue from 'nativescript-vue'
import store from './store/index'

import Home from './components/Home'
import LoginScreen from "~/components/LoginScreen";
// citiesCollection.get({ source: "server" }).then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//   });
// });
new Vue({
  store,
  render: (h) => h('frame', [h(Home)]),
}).$start()
