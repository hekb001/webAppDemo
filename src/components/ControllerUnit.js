/**
 * Created by larry on 2016/12/30.
 */
import React from 'react';

export default class ControllerUnit extends React.Component{

  handleClick(e){
    e.stopPropagation();
    e.preventDefault();

    //如果是点击的是正在翻转的图片，则翻转图片，否则居中
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else {
      this.props.center();
    }
  }

  render(){

    let controllerClassName = 'controller-unit';

    if(this.props.arrange.isCenter){

      controllerClassName += ' is-center';

      if (this.props.arrange.isInverse){

        controllerClassName += ' is-inverse' ;

      }

    }

    return(
      <span className={controllerClassName} onClick={this.handleClick.bind(this)}>

      </span>
    )
  }
}
