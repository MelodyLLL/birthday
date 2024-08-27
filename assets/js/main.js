// 定义全局变量
var typingTimeout; // 用于存储 setTimeout 返回值
var txt =
  "HI, 🍓小仙女, 不知道这份祝福有没有晚或早～, 虽然认识的时间还不太长, 但是我觉得你是一个性格活泼又充满热情的女生🤔. 时而像个小女孩，时而呢又是个职场达人. anyway, 希望你一直能勇敢大方的做自己, 希望你每天都开开心心事事顺意. 等你空了(啥时候嘞?), 带你去七好七滴, 再把广州塔的电影还有珠江夜游安排上! 来日方长, 话不多说😄. 最后, Happy Birthday! 🎂🎂🎂";
var speed = 120;
var typingCompleted = false; // 用于跟踪打字是否完成

// 打字功能
function Gassngetik() {
  let i = 0; // 将 i 声明为局部变量
  typingCompleted = false; // 重新设置 typingCompleted
  document.getElementById("tekss").innerHTML = ""; // 清空之前的内容
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("tekss").innerHTML += txt.charAt(i);
      i++;
      typingTimeout = setTimeout(typeWriter, speed);
    } else {
      typingCompleted = true; // 打字完成
      document.getElementById("boomBtn").style.display = "block"; // 显示按钮
    }
  }
  typeWriter(); // 启动打字效果
}

// 停止打字
function stopTyping() {
  clearTimeout(typingTimeout);
}

// 音乐控制
var lagu = document.getElementById("lagu");
function Mainkannn() {
  if (lagu.paused) {
    playConfetti(); // 播放礼花
    document.getElementById("openBtn").innerHTML = "🍓小朋友, 生日快乐!";

    lagu.play();
    showCircles(); // 显示圆圈背景
  }
}

// function Mainkannn1() {
//   if (!lagu.paused && typingCompleted) {
//     lagu.pause();
//     hideCircles(); // 隐藏圆圈背景
//   }
// }

// 显示圆圈背景
function showCircles() {
  document.getElementById("circle").style.display = "block";
}

// 隐藏圆圈背景
function hideCircles() {
  document.getElementById("circle").style.display = "none";
  document.getElementById("openBtn").innerHTML = "老细, 打开睇下!";
}

// 显示页面内容
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("Kontener").style.display = "block";
}

// 冲击礼花
function bomFromSide() {
  var end = Date.now() + 5 * 1000;
  var frameCount = 0;
  const skipFrames = 5; // 每 5 帧更新一次
  (function frame() {
    frameCount++;
    if (frameCount % skipFrames === 0) {
      var scalar = 3;
      var pineapple = confetti.shapeFromText({ text: "🍓", scalar });
      var cake = confetti.shapeFromText({ text: "🌸", scalar });
      confetti({
        shapes: [pineapple, cake],
        scalar,
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        shapes: [pineapple, cake],
        scalar,
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// 播放礼花效果
function playConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// 页面加载处理
window.onload = function () {
  setTimeout(() => {
    showPage();
    setupCanvasEvents();
    loop();
  }, 2200); // Adjust the delay as needed
};

// 设置 canvas 事件
// function setupCanvasEvents() {
//   var canvas = document.getElementById("canvas");
//   canvas.addEventListener("mousemove", function (e) {
//     mx = e.pageX - canvas.offsetLeft;
//     my = e.pageY - canvas.offsetTop;
//   });
//   canvas.addEventListener("mousedown", function (e) {
//     e.preventDefault();
//     mousedown = true;
//   });
//   canvas.addEventListener("mouseup", function (e) {
//     e.preventDefault();
//     mousedown = false;
//   });
//   var lagu = document.getElementById("lagu");
//   lagu.addEventListener("ended", hideCircles);
// }
function setupCanvasEvents() {
  var canvas = $("#canvas")[0];

  function handleInteraction(e) {
    e.preventDefault();
    console.log(e.type);

    if (e.type === "mousedown") {
      mousedown = true;
    } else if (e.type === "mouseup" || e.type === "touchend") {
      mousedown = false;
    }
    if (e.type === "mousedown" || e.type === "touchstart") {
      mx = e.pageX - canvas.offsetLeft;
      my = e.pageY - canvas.offsetTop;
    }
  }

  $(canvas).on("mousemove mousedown touchstart", handleInteraction);
  $(canvas).on("mouseup touchend", handleInteraction);

  $("#lagu").on("ended", hideCircles);
}

// 阻止 Modal 关闭并显示 Toast
// $("#Modalmuncul").on("hide.bs.modal", function (e) {
//     const buttonClicked = $(e.relatedTarget).data("from");
//     console.log(buttonClicked);

//   if (!typingCompleted) {
//     e.preventDefault(); // 阻止关闭
//     $("#typingToast").toast({ delay: 3000 }).toast("show"); // 显示 Toast 提示
//   }
// });

let buttonClicked; // 全局变量来记录按钮

// 添加按钮点击事件监听器
$("#button1, #button2").on("click", function () {
  buttonClicked = $(this).data("from"); // 记录触发关闭的按钮的 data-from 属性

  // 根据按钮的 data-from 属性做不同的操作
  if (buttonClicked === "closeX") {
    // 如果是第一个按钮
    $("#Modalmuncul").modal("hide");
    $("#typingToast1").toast({ delay: 3000 }).toast("show"); // 显示 Toast 提示
    stopTyping()
  } else {
    // 如果是第二个按钮
    if (!typingCompleted) {
      $("#typingToast").toast({ delay: 3000 }).toast("show"); // 显示 Toast 提示
    } else {
      $("#Modalmuncul").modal("hide");
    }
  }

  // 重置 buttonClicked
  buttonClicked = null;
});

// $("#Modalmuncul").on("hide.bs.modal", function (e) {
//   console.log(buttonClicked); // 输出按钮的 data-from 属性
// });

// 初始化 Toast
$(document).ready(function () {
  $("#typingToast").toast({ delay: 3000 });
});
