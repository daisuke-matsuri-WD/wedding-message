/* =========================================
   Wedding Message
   ========================================= */


/* -----------------------------------------
   設定
----------------------------------------- */

const PASSWORD = "20261017";

const COMMON_PHOTO = "images/wedding.jpg";


/* -----------------------------------------
   ゲスト情報
----------------------------------------- */

const guests = [

  {
    name: "田中 太郎",

    message:
`太郎さん、

今日は私たちの大切な一日に
来てくれて本当にありがとう。

こうして大切な人たちに
囲まれてこの日を迎えられることを
心から嬉しく思っています。

これからも二人を
どうぞよろしくお願いします。`
  },


  {
    name: "鈴木 花子",

    message:
`花子さん、

今日は私たちのために
来てくれてありがとう。

一緒にこの特別な日を
過ごしてもらえることを
とても嬉しく思っています。

これからもたくさん
楽しい思い出を作りましょう。`
  },


  {
    name: "山田 一郎",

    message:
`一郎さん、

今日は来てくれてありがとう！

私たちにとって
忘れられない一日を
一緒に過ごしてもらえて嬉しいです。

これからも二人を
よろしくお願いします。`
  }

];


/* -----------------------------------------
   HTML要素を取得
----------------------------------------- */

const nameInput =
  document.getElementById("name");

const passwordInput =
  document.getElementById("password");

const messageButton =
  document.getElementById("message-button");

const errorMessage =
  document.getElementById("error-message");

const loginSection =
  document.getElementById("login-section");

const messageSection =
  document.getElementById("message-section");

const guestName =
  document.getElementById("guest-name");

const guestMessage =
  document.getElementById("guest-message");

const guestPhoto =
  document.getElementById("guest-photo");

const backButton =
  document.getElementById("back-button");


/* -----------------------------------------
   ページ読み込み確認
----------------------------------------- */

console.log("Wedding Message script loaded");


/* -----------------------------------------
   エラー表示
----------------------------------------- */

function showError(text) {

  errorMessage.textContent = text;

}


/* -----------------------------------------
   エラー削除
----------------------------------------- */

function clearError() {

  errorMessage.textContent = "";

}


/* -----------------------------------------
   ゲスト検索
----------------------------------------- */

function findGuest(inputName) {

  const searchName =
    inputName.trim().toLowerCase();

  return guests.find(function(guest) {

    return guest.name
      .trim()
      .toLowerCase() === searchName;

  });

}


/* -----------------------------------------
   ログイン処理
----------------------------------------- */

function login() {

  clearError();


  const enteredName =
    nameInput.value.trim();

  const enteredPassword =
    passwordInput.value.trim();


  /* 名前チェック */

  if (enteredName === "") {

    showError(
      "お名前を入力してください。"
    );

    nameInput.focus();

    return;
  }


  /* パスワードチェック */

  if (enteredPassword === "") {

    showError(
      "パスワードを入力してください。"
    );

    passwordInput.focus();

    return;
  }


  /* パスワード判定 */

  if (enteredPassword !== PASSWORD) {

    showError(
      "パスワードが正しくありません。"
    );

    passwordInput.value = "";

    passwordInput.focus();

    return;
  }


  /* ゲスト検索 */

  const guest =
    findGuest(enteredName);


  if (!guest) {

    showError(
      "登録されているお名前が見つかりません。"
    );

    return;
  }


  /* 正解 */

  showMessage(guest);

}


/* -----------------------------------------
   メッセージ表示
----------------------------------------- */

function showMessage(guest) {

  console.log(
    "Guest found:",
    guest.name
  );


  /* 名前 */

  guestName.textContent =
    guest.name;


  /* メッセージ */

  guestMessage.textContent =
    guest.message;


  /* 共通写真 */

  guestPhoto.src =
    COMMON_PHOTO;


  guestPhoto.alt =
    "新郎新婦の写真";


  /*
   * ログイン部分をゆっくり消す
   */

  loginSection.style.transition =
    "opacity 1.2s ease, transform 1.2s ease";

  loginSection.style.opacity = "0";

  loginSection.style.transform =
    "translateY(-30px)";


  /*
   * 1.3秒後にメッセージ画面へ
   */

  setTimeout(function() {

    loginSection.style.display =
      "none";


    /*
     * メッセージセクションを表示
     */

    messageSection.style.display =
      "block";


    /*
     * ブラウザに再描画させる
     */

    requestAnimationFrame(function() {

      messageSection.classList.add(
        "show"
      );

    });


    /*
     * メッセージ部分へ移動
     */

    setTimeout(function() {

      messageSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 300);


  }, 1300);

}


/* -----------------------------------------
   戻る
----------------------------------------- */

function backToLogin() {

  messageSection.classList.remove(
    "show"
  );


  setTimeout(function() {

    messageSection.style.display =
      "none";


    loginSection.style.display =
      "block";


    loginSection.style.opacity =
      "0";


    loginSection.style.transform =
      "translateY(30px)";


    requestAnimationFrame(function() {

      loginSection.style.transition =
        "opacity 1s ease, transform 1s ease";

      loginSection.style.opacity =
        "1";

      loginSection.style.transform =
        "translateY(0)";

    });


    nameInput.value = "";

    passwordInput.value = "";

    clearError();


    setTimeout(function() {

      loginSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 200);


  }, 500);

}


/* -----------------------------------------
   ボタンをクリック
----------------------------------------- */

messageButton.addEventListener(
  "click",
  function() {

    console.log(
      "MESSAGE button clicked"
    );

    login();

  }
);


/* -----------------------------------------
   名前欄でEnter
----------------------------------------- */

nameInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      passwordInput.focus();

    }

  }
);


/* -----------------------------------------
   パスワード欄でEnter
----------------------------------------- */

passwordInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      login();

    }

  }
);


/* -----------------------------------------
   BACKボタン
----------------------------------------- */

backButton.addEventListener(
  "click",
  function() {

    backToLogin();

  }
);


/* -----------------------------------------
   写真の読み込み
----------------------------------------- */

const preload =
  new Image();

preload.src =
  COMMON_PHOTO;


/* -----------------------------------------
   完了
----------------------------------------- */

console.log(
  "Wedding Message ready!"
);
