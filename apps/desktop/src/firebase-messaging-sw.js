importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js'
);

const firebaseConfig = {
  messagingSenderId: '910231972624',
  appId: '1:910231972624:web:a6d5902a751779b2',
  projectId: 'delivery-app-b63cc',
  apiKey: 'AIzaSyAGqgHQTL4xUrBLO5566X35vRKN0pE56-s'
};

firebase.initializeApp(firebaseConfig);
firebase.messaging();
