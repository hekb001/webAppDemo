/*
 * @Author: kevin.he 
 * @Date: 2021-08-25 11:17:33 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-08-25 11:33:46
 * svg引用
 */
import React, { Component } from 'react';
const Svg = function (props) {
    const { svgName,style } = props
    const useTag = '<use xlink:href=#icon-' + svgName + ' />';
    return <svg className="icon" fill="currentColor" dangerouslySetInnerHTML={{ __html: useTag }} style={style} />;
}
export default Svg;
