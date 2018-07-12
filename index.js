
/**
 * image管理
 */
var sw = 1;
var sleepTime = 300;
var sleepTimeMin = sleepTime;
var sleepTimeMax = 50;
var slotSpeedMax = 50;
var image = new Array(10);

var dataList = []
var dataCnt = 0;

var stopStartFlag = false;

image[0]="./assets/0.png";
image[1]="./assets/1.png";
image[2]="./assets/2.png";
image[3]="./assets/3.png";
image[4]="./assets/4.png";
image[5]="./assets/5.png";
image[6]="./assets/6.png";
image[7]="./assets/7.png";
image[8]="./assets/8.png";
image[9]="./assets/9.png";

var reelVal1 = 1;
var reelVal2 = 2;
var reelVal3 = 3;

/**
 * スロットスタート処理
 */
function startSlot(){

    // 停止処理
    if(stopStartFlag === false){
        numberJud();
        return;
    }

    // スピード調整
    if (sleepTime > slotSpeedMax){
        sleepTime = sleepTime - 30;
    }

    // img change
    setTimeout("startSlot()",sleepTime);

    $("#reel-1").attr('src',image[reelVal1]);
    $("#reel-2").attr('src',image[reelVal2]);
    $("#reel-3").attr('src',image[reelVal3]);


    reelVal1 = reelVal1 + 1;
    reelVal2 = reelVal2 + 1;
    reelVal3 = reelVal3 + 1;
    if (reelVal1 > 10){ reelVal1 = 1;}
    if (reelVal2 > 10){ reelVal2 = 1;}
    if (reelVal3 > 10){ reelVal3 = 1;}
}

/**
 * 判定処理
 */
function numberJud(){
    // ramdom
    // reelVal1 = Math.random() * Math.floor(10) + 1;
    // reelVal2 = Math.random() * Math.floor(10) + 1;
    // reelVal3 = Math.random() * Math.floor(10) + 1;   
    
    // スプレッドシート
    var showNum = zeroPadding(dataList[dataCnt]);
    reelVal1 = showNum[0];
    reelVal2 = showNum[1];
    reelVal3 = showNum[2];

    // stting
    $("#reel-1").attr('src',image[String(reelVal1)]);
    $("#reel-2").attr('src',image[String(reelVal2)]);
    $("#reel-3").attr('src',image[String(reelVal3)]);

    dataCnt += 1;
    sleepTime = sleepTimeMin;
}

// 0詰め
function zeroPadding(num){
    return ('00' + num).slice(-3);
}

document.onkeyup = function(e) {
    var keyCode = false;
    if (e) event = e;
    if (event) {
        if (event.keyCode) {
            keyCode = event.keyCode;
        } else if (event.which) {
            keyCode = event.which;
        }
    }

    if(keyCode === 32) {
        reelStartStop();
    }
};

function reelStartStop(){
    if(stopStartFlag === true) {
        // ストップ処理
        stopStartFlag = false;
    } else {
        // スタート処理
        stopStartFlag = true;
        startSlot(true);
    }
}


function dataLoading(onlineFlg){

    dataList = [];

    if(onlineFlg === true){
        $.ajax({
            type: "get",
            url: "https://spreadsheets.google.com/feeds/cells/[key]/od6/public/values?alt=json",
            data: {},
            dataType: "json",
            success: function(data, dataType) {
                // console.log(data);
                console.log(data);
                console.log(data.feed.openSearch$totalResults);
    
                for(var row in data.feed.entry) {
                    console.log(data.feed.entry[row].content.$t);
                    dataList.push(data.feed.entry[row].content.$t);
                }
            }
        });
    }else {
        dataList = createRandomNum(100);
    }
}

/**
 * サイズに応じたランダム値を作成
 * @param {}} randomSize 
 */
function createRandomNum(randomSize){
    var numList = [];
    console.log(randomSize);
    for(var i = 0; i < randomSize; i++ ){
        numList.unshift(String(i));
    }

    return shuffleAry(numList);
}

/**
 * シャッフル
 * @param {}} ary 
 */
function shuffleAry(ary) {
    var i = ary.length;
    while(i){
      var j = Math.floor(Math.random()*i);
      var t = ary[--i];
      ary[i] = ary[j];
      ary[j] = t;
    }
    return ary;
  }


$('#exampleModal').on('show.bs.modal', function () {
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + "")
    modal.find('.modal-body input').val("")
})



dataLoading(false);