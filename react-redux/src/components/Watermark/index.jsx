import React from 'react'
const Watermark = ({
    container = document.body,    //容器
    width = '200px',  //水印的大小
    height = '200px',
    textAlign = 'center',  //文字对齐
    textBaseline = 'middle',  //基准线
    font = "20px Microsoft Yahei", //字体大小及样式
    fillStyle = 'rgba(184, 184, 184, 0.9)',//自定义水印的颜色以及透明度
    content = 'Open Components',//内容
    rotate = '24',//文字旋转角度
} = {},cb) => {
    const args = arguments[0];
    const canvas = document.createElement('canvas');
//HTML5 <canvas> 元素用于图形的绘制，通过脚本 (通常是JavaScript)来完成

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const ctx = canvas.getContext("2d");//当前唯一的合法值是 "2d"，它指定了二维绘图

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

    const base64Url = canvas.toDataURL();
//返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。
    // const __wm = document.querySelector('.__wm');//选择器

    // const watermarkDiv = __wm || document.createElement("div");
    // const styleStr = `
    // z-index:${zIndex};
    // background-repeat:repeat;
    // background-image:url('${base64Url}')`;

    // container.setAttribute('style', styleStr);
    // watermarkDiv.classList.add('__wm');//在元素中添加类名，可以加载CSS样式

    // if (!__wm) {
        // container.style.position = 'relative';
        // container.insertBefore(watermarkDiv, container.firstChild);//添加元素
    // }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;        
//检查浏览器是否支持这个API
    if (MutationObserver) {
        let mo = new MutationObserver(function () {
            const __wm = document.querySelector('.__wm');
            // 只在__wm元素变动才重新调用 __canvasWM
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                // 避免一直触发
                mo.disconnect();
                mo = null;
                watermark(JSON.parse(JSON.stringify(args)));
            }
        });

        mo.observe(container, {
            attributes: true,//观察目标节点的属性节点
            subtree: true,//观察目标节点的所有后代节点
            childList: true,//观察目标节点的子节点
        })
    }
    cb && cb(`${base64Url}`)
}

export default Watermark;