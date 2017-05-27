/**
 * Created by justburrow on 2017. 5. 26..
 * @see https://firebase.google.com/docs/cloud-messaging/js/client
 */
var config = {
  apiKey: "AIzaSyD0TCtBpbIw_FJ9v4lSMmrgXtGT9aW4XjM",
  authDomain: "study-5cff7.firebaseapp.com",
  databaseURL: "https://study-5cff7.firebaseio.com",
  projectId: "study-5cff7",
  storageBucket: "study-5cff7.appspot.com",
  messagingSenderId: "349611704121"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
console.log(messaging);

// 1. 현재의 권한 확인.
messaging.requestPermission()
    .then(function () {
      console.log('has permission.');
    })
    .catch(function (err) {
      console.log('no permission. err ' + err);
    });

// 2. 토큰 확인.
messaging.getToken()
    .then(function (currentToken) {
      if (currentToken) {
        console.log("has token.", currentToken);
      } else {
        console.log("no token");
      }
    })
    .catch(function (err) {
      console.log("err : %s", JSON.stringify(err));
    });