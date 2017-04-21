import React from 'react';

export default class ImgFigure extends React.Component{

  handleClick(e){
    e.stopPropagation();
    e.preventDefault();

    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else {
      this.props.center();
    }
  }

  render(){

    let styleObj = {};

    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    //覆盖了除居中图片的inverse属性
    if(this.props.arrange.rotate){

      ['Moz', 'Ms', 'Webkit', ''].forEach(function (value) {
        styleObj[value+'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));

    }

    return(
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img
          src={this.props.data.imageURL}
          alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this)}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );

  }
}
