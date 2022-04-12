/**
 * Date: 2021年1月12日21:35:34
 * Author: kevin.he
 * Desc: 表单设计器
 */
import React, {forwardRef} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import Main from './Main';
import './index.less';

const Root = (props, ref) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main ref={ref} {...props}/>
    </DndProvider>
  );
};

export default forwardRef(Root);
