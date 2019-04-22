// 统一rem的规范， 以iphone6 375宽度为主
function flexible() {
  // let evt = "onorientationchange" in window ? "orientationchange" : "resize"
  let evt = 'resize';
  let docEle = document.documentElement;
  let lastWidth = 0;

  let resizefun = function () {
    // 上一次resize的屏幕宽度如果和这次相等，则视为没有变动
    if (docEle.clientWidth === lastWidth) {
      // msg.tip(`宽度相等${docEle.clientWidth},${lastWidth}`)
      return
    }

    let width = docEle.clientWidth;
    let height = docEle.clientHeight;
    lastWidth = width;

    if (width && height) {
      // 兼容横竖屏
      var baseLenth = height > width ? width : height;
      docEle.style.fontSize = 20 * (baseLenth / 375) + 'px'
    }
  };

  // resizefun()
  window.addEventListener(evt, resizefun, false);
  document.addEventListener('DOMContentLoaded', resizefun, false);
}

export default flexible
