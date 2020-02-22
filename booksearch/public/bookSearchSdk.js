window.onload = function () {

    // ページ読み込み時に実行したい処理
    var script = document.createElement('script');
    script.setAttribute('src', 'https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js');
    document.head.appendChild(script);

    script = document.createElement('script');
    script.setAttribute('src', 'https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js');
    document.head.appendChild(script);

    script = document.createElement('script');
    script.setAttribute('src', 'https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js');
    document.head.appendChild(script);
    
}
var initFlg = false;
function init() {
    if (initFlg) {
        return;
    }

    var firebaseConfig = {
        apiKey: "AIzaSyCTxPujY5WP-ZNHYyXT4MuX-tmvCWP_gaE",
        authDomain: "shosekiappproject.firebaseapp.com",
        databaseURL: "https://shosekiappproject.firebaseio.com",
        projectId: "shosekiappproject",
        storageBucket: "shosekiappproject.appspot.com",
        messagingSenderId: "596910785917",
        appId: "1:596910785917:web:2b28fca01a89957a95b814",
        measurementId: "G-H7ZPPQ3VB3"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    initFlg = true;
}

function login(email, password, callback) {
    init();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            // ログイン成功
            // ページを移動する、ユーザーの情報を取得して処理を行う、等する
            // user.uid をユーザーIDとして使用する
            callback(true);
        }, err => {
                // エラーを表示する等
                callback(false);
                
        });
}

