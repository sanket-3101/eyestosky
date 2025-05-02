importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCkyclwDfJqr8CsQkmYScqf3meQLrEmQlk",
  authDomain: "rab-and-rab-associates-llp.firebaseapp.com",
  projectId: "rab-and-rab-associates-llp",
  storageBucket: "rab-and-rab-associates-llp.appspot.com",
  messagingSenderId: "771198469887",
  appId: "1:771198469887:web:407b34a2ac4faaf562aeca",
  measurementId: "G-4NL36HHBY1"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
