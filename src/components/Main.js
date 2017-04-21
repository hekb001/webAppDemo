require('normalize.css/normalize.css');
require('../styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//引入单张图片组件
import ImgFigure from './ImgFigure';

//引入控制组建
import ControllerUnit from './ControllerUnit';

//获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = ((imageDatasArr) => {

  for (let i = 0, j = imageDatasArr.length; i < j; i++)
    {

      let singleImageData = imageDatasArr[i];

      singleImageData.imageURL = require('../images/' + singleImageData.fileName);

      imageDatasArr[i] = singleImageData;

    }

  return imageDatasArr;

})(imageDatas);


class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: { //中心位置的取值范围
        left: 0,
        right: 0
      },
      hPosRange: { //水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { //垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    };

    this.state = {
      imgsArrangeArr:[
          /*{
            pos:{
                left:0,
                top:0
            },
            rotate:0    //循转角度
            isInverse:false //图片正反面，默认false
            isCenter:false  //图片正反面，默认false,不居中
          }*/
      ]
    }
  }
//图片位置放置区域方法
  getRangeRandom(low,high){
    return Math.floor(Math.random() * (high-low) + low )
  }
//图片旋转角度方法
  get30DegRandom(){
      return (Math.random() > 0.5 ? ' ':'-') + Math.ceil(Math.random() * 30);
  }

  // 组件加载以后，为每张照片计算其位置的范围
  componentDidMount(){

    //首页，拿到舞台的大小
    let stageDOM =  ReactDOM.findDOMNode(this.refs.stage),

        stageW = stageDOM.scrollWidth,//舞台宽度
        stageH = stageDOM.scrollHeight,//舞台高度

        halfStageW = Math.ceil(stageW / 2),//二分之舞台宽度
        halfStageH = Math.ceil(stageH / 2);//二分之一舞台高度

    //拿到一个imgFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),//默认传的是第一张图片
      imgW = imgFigureDOM.scrollWidth,//拿到图片的宽度
      imgH = imgFigureDOM.scrollHeight,//图片的高度
      halfImgW = Math.ceil(imgW / 2),//二分之一图片的宽度
      halfImgH = Math.ceil(imgH / 2);//二分之一图片的高度

    //计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,//中心点的X
      top: halfStageH - halfImgH//中心点的Y
    };

    //计算左侧,右侧区域图片排布的取值范围
    let Constant = this.Constant;

    Constant.hPosRange.leftSecX[0] = -halfImgW;//左分区x的最小值
    Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;//左分区X的最大值

    Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;//右分区X的最小值
    Constant.hPosRange.rightSecX[1] = stageW - halfImgW;//右分区X的最大值

    Constant.hPosRange.y[0] = -halfImgH;//当图片左右区域排布时y的最小值
    Constant.hPosRange.y[1] = stageH - halfImgH;//上当图片左右区域排布时Y的最大值

    //计算上测区域图片排布的取值范围
    Constant.vPosRange.topY[0] = -halfImgH;//上侧区域图片 Y方向的最小值
    Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;//上侧区域图片 Y方向的最大值

    Constant.vPosRange.x[0] = halfStageW - imgW;//上侧区域图片 X方向的最小值
    Constant.vPosRange.x[1] = halfStageW;//上侧区域图片 X方向的最大值

    //初始化
    this.rearrange(0);

  }

  /*
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪个图片
   */
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,
      imgsArrangTopArr = [],
      topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
      topImgSpiceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    //首先居中centerIndex图片 ,centerIndex图片不需要旋转
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }

    //取出要布局上测的图片的状态信息
    topImgSpiceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangTopArr = imgsArrangeArr.splice(topImgSpiceIndex, topImgNum);

    //布局位于上侧的图片
    imgsArrangTopArr.forEach((value, index) => {
      imgsArrangTopArr[index] = {
        pos: {
          top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate:this.get30DegRandom(),
        isCenter:false
      };
    });

    //布局左两侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {

      let hPosRangeLORX = null;

      //前半部分布局左边,右边部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX
      }

      imgsArrangeArr[i] = {
        pos: {
          top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate:this.get30DegRandom(),
        isCenter:false
      };
    }

    //添加回原数组（之前提取出来单独设置了）
    if (imgsArrangTopArr && imgsArrangTopArr[0]) {
      imgsArrangeArr.splice(topImgSpiceIndex, 0, imgsArrangTopArr[0]);
    }

    //同上
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr: imgsArrangeArr

    });
  }

  /*
   * 翻转图片
   * @param index 输入当前被执行inverse的图片的index
   * return {function} 这是一个闭包函数
   */
  inverse = (index) => {

    return function () {

      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr:imgsArrangeArr
      })

    }.bind(this)

  }

  /*
   * 利用rearrange函数，居中点击图片
   * @param index，需要居中的图片的index
   * return {function} 这是一个闭包函数
   */
  center = (index) => {
    return () => this.rearrange(index).bind(this)
  }

  render() {

    let controllerUnits = [], imgFigures = [];

    imageDatas.forEach(function ( data, index) {

      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }

      //插入全部图片
      imgFigures.push(
        <ImgFigure
          data={data}
          key={index}
          ref={'imgFigure' + index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index)}
          center={this.center(index)}
        />
      )

      //插入控制按钮
      controllerUnits.push(
        <ControllerUnit
          key={index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index)}
          center={this.center(index)}
        />
      )

    }.bind(this))

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-sec">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

export default AppComponent;
