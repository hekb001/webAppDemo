require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
//获取图片相关数据
var imagesData=require("../data/imageDatas.json");
//利用自调函数，将图片名信息转化成路径
function initImage(imagesDataArr){
  for(var i=0;i<imagesDataArr.length;i++){
    var signImage=imagesDataArr[i];
    console.log(signImage);
    signImage.imgaeURL=require("../images/"+signImage.fileName);
    imagesDataArr[i]=signImage;
  }
  return imagesDataArr
}
var imageDatas=initImage(imagesData);
console.log(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
