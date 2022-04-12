/*
 * @Author: kevin.he 
 * @Date: 2021-11-19 13:09:07 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-19 15:51:09
 * 表单设计入口页
 */

import React, { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './lib/Main';
import './lib/index.less';

const Design = (props, ref) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main ref={ref} {...props} />
    </DndProvider>
  );
};

export default forwardRef(Design);