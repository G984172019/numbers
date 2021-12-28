const APPLICATION_KEY = "25109abf9bb96a6a929a3ae3d3a6de74320adf03dd33655e46e31d7eeb365c59";
const CLIENT_KEY = "c24f859e28e7281e30d0a72d679bddfcdd6c59004a47edc8d28b9df413b09a63";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "AppClass";
let AppClass = ncmb.DataStore(DBName);
let timer = null;
let eTime = 0;
const MAX = numbers.length;
num = 0;
ranking.style.display = "none";
rankButton.style.display = "none";
restartButton.style.display = "none";
countT.style.display = "none";
cells.style.display = "none";

function init() {
    startButton.style.display = "none";
    cells.style.display = "block";
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}


function re() {
  timer = null;
//   retimer = retimer + count;
  countT.style.display = "none";
  rankButton.style.display = "none";
  restartButton.style.display = "none";
  numbers = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
  ok = 1;
  init();
}


function gameStart() {
  let size = 5;

  for(let j = 0; j < size*size; j++){
    let p = Math.floor(Math.random()*size*size);
    console.log(j);
    let s = 0;
    for(let i = 0;i < size*size; i++){
      if(numbers[i] == p+1){
        j = j - 1;
        s = s + 1;
        break;
      }
    }
    if(s == 0){
      numbers[j] = p+1;
      let ans = document.getElementById("num"+(j+1));
      ans.textContent = numbers[j];
    }

    // for(let i = 0; i <= j; i++){
    //     if(numbers[i]==p+1){
    //       j = j - 1;
    //       break;
    //     }else{
    //       numbers[j] = p+1;
    //       let ans = document.getElementById("num"+(j+1));
    //       ans.textContent = numbers[j];
    //     }
    // }
  }
}

function time() {
  let now = new Date();
  eTime = parseInt((now.getTime()-start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}
let ok = 1;
  function tap() {
    let text = event.target.innerHTML;

    if(text == ok){
      correct.play();
       // alert("ok");
      ok = ok + 1;
      if (ok == 26){
        //終了条件
        clearTimeout(timer);
        imputName(eTime);
        restartButton.style.display = "block";
        rankButton.style.display = "block";
        countT.style.display = "block";
        cells.style.display = "none";
      //ここまで
    }
    }else{
      wrong.play();
       alert("数字が違います!!")
    }
  }

  function toRanking() {
    // ランキング表示ボタンを非表示
    rankButton.style.display = "none";
    // ゲーム画面を非表示
    cells.style.display = "none";
    //reスタートボタンを非表示
    restartButton.style.display = "none";
    // ランキングを表示
    ranking.style.display = "inline-block";
    // 結果画面を非表示
    countT.style.display = "none";
    //
    timers.style.display = "none";

    // データ取得
    checkRanking();
  }

  // 保存したデータの取得
  function checkRanking() {
    // **********ランキングを表示しよう！**********
    let highScore = ncmb.DataStore("AppClass");
    // scoreの降順でデータ5件を取得するように設定する
    highScore
    .order("score")
    .limit(5)
    .fetchAll()
    .then(function(results){

      // 検索に成功した場合の処理
      console.log("検索に成功しました。");
      // テーブルにデータをセット
      setData(results);
    })
    .catch(function(error){
      // 検索に失敗した場合の処理
      console.log("検索に失敗しました。エラー:" +error);
    });
    // ******************************************************
  }

  // テーブルにデータを設定
  function setData(scoreData) {
    let table = document.getElementById("rankingTable");
    for(let i=0; i<scoreData.length; i++){
      // 名前の設定
      let id = table.rows[i].cells[1];
      id.innerHTML = scoreData[i].name;



      // スコアの設定
      let score = table.rows[i].cells[2];
      score.innerHTML = scoreData[i].score;
    }
  }

  function toMain() {
    // ランキング表示ボタンを表示
    rankButton.style.display = "inline-block";

    // ゲーム画面を表示
    //cells.style.display = "block";

    //reスタートボタンを表示
    restartButton.style.display = "inline-block";

    // ランキングを非表示
    ranking.style.display = "none";
      
    // 結果画面を表示
    countT.style.display = "block";
      
    //
    timers.style.display = "block";

  }

  function imputName(count){
    // 入力プロンプトを表示
    let name = window.prompt("名前を入力してください", "");
    if (name == null || name == "") {
      countT.textContent = "保存がキャンセルされました";
    } else {
      // スコアと名前の保存と表示
      saveScore(name, count);
      countT.textContent = name + "さんのタイムは" + count + "秒でした";
    }
  }


  function saveScore (name, score) {
    // **********名前とスコアを保存しよう！**********
    // 保存先を作成
    let GameScore = ncmb.DataStore("AppClass");
    let test = new GameScore;


    // 値を設定
    let key = "score";
    test.set(key,score);
    test.set("name",name)




    // データストアに保存

      test.save()
      .then(function (){
        // 保存に成功した場合の処理
        console.log("保存に成功しました。");
      })
      .catch(function (error){
        // 保存に失敗した場合の処理
        console.log("保存に失敗しました。エラー:" + error);
      });
      // ********************************************************
    }
