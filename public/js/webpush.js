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

// 1. 현재의 권한 확인.
messaging.requestPermission().then(function () {
  console.log('has permission.');
}).catch(function (err) {
  console.log('no permission. err ' + err);
});

// 2. 토큰 확인.
messaging.getToken().then(function (currentToken) {
  if (currentToken) {
    console.log("has token.");
    processValidateAndRegist(currentToken);
  } else {
    console.log("no token");
  }
}).catch(function (err) {
  console.log("get token err : %s", JSON.stringify(err));
});

// 3. 토큰이 변경될 때 갱신하기.
messaging.onTokenRefresh(function () {
  messaging.getToken().then(function (currentToken) {
    if (currentToken) {
      console.log("token refreshed.");
      processValidateAndRegist(currentToken);
    }
  }).catch(function (err) {
    console.log("token refresh err : %s", JSON.stringify(err));
  });
});

/**
 * 푸시 토큰을 검증하고 서버에 등록한다.
 *
 * @param token
 */
function processValidateAndRegist(token) {
  if ( ! token) {
    return;
  }
  console.log("token : %s", token);

  var data = {
    'url': $(location).attr('href'),
    'token': token
  };

  $.post("/registry/push", data).done(function (resp) {
    console.log("push token registered", resp);
  }).fail(function (resp) {
    console.log("fail to regist push token.", resp);
  });
}