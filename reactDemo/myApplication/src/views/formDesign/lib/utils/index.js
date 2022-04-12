/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器-公共方法
 */
let Utils = {
  getUuid: function() {
    return (Math.random() * 10000000).toString(16)
      .substr(0, 4) + '' + (new Date()).getTime() + '' + Math.random()
      .toString()
      .substr(2, 5);
  },
  getStyle: function (element, attr) {
    if (element.currentStyle) {
      return element.currentStyle[attr];
    }
    else {
      return document.defaultView.getComputedStyle(element, null)[attr];
    }
  },
  colorRGBtoJson: function (rgbColor) {
    let rgb = rgbColor.split(',');
    let r = parseInt(rgb[0].split('(')[1], 10);
    let g = parseInt(rgb[1], 10);
    let b = parseInt(rgb[2].split(')')[0], 10);
    let a = parseInt(rgb[3].split(')')[0], 10);
    return {r, g, b, a};
  },
};

export default Utils
