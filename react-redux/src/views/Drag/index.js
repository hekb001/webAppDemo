/*
 * @Author: kevin.he 
 * @Date: 2022-04-28 15:54:32 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2022-05-07 17:22:27
 * 测试下useDrag与useDrop的使用
 */
import React, { forwardRef, useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { DndProvider,useDrag,useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { changeSideBar } from 'action/app';
import {Ctx,CtxStore } from 'store/context';
import _ from 'lodash';
import Drag from './drag';
import Drop from './drop';
let arrlist = [
  { id: 1, category: 'Apple-1', bg: 'red', type: "box1" },
  { id: 2, category: 'Banana-2', bg: 'yellow', type: "box2" },
  { id: 3, category: 'Orange-1', bg: 'orange', type: "box1" },
  { id: 4, category: 'Grape-1', bg: 'purple', type: "box1" },
  { id: 5, category: 'Watermelon-2', bg: 'green', type: "box2" },
  { id: 6, category: 'Peach-1', bg: 'pink', type: "box1" },
]
const Container = (props) => {
  const [newCardList, setNewCardList] = useState([{id: '#', category: '拖动到里面来', bg: '#FFFF', type: "box1"}])
  // const copyCardList = _.cloneDeep(arrlist);
  const [oldCardList, setOldCardList] = useState(arrlist)
  const dispatch = useDispatch();
  useEffect(()=>{
    changeSideBar(props)(dispatch)
  })
const setState=(list,item)=>{
  setOldCardList([...list]);
  // let diffrentArr = _.differenceWith(copyCardList,list, _.isEqual);
  // setNewCardList([...diffrentArr])
  newCardList.push(item);
  setNewCardList([...newCardList])
}
const setGlobal = {
  setState,
}
const obj={
  data:oldCardList,
  newCardList:newCardList
}
  return (
    <DndProvider backend={HTML5Backend}>
      <Ctx.Provider value={setGlobal}>
        <CtxStore.Provider value={obj}>
          <div style={{ display: 'inline-block', marginRight: 50 }}>
            {oldCardList.map((item) => {
              return <Drag {...item} key={item.id} />
            })}
          </div>
         <Drop/>
        </CtxStore.Provider>
      </Ctx.Provider>
    </DndProvider>
  )
}

export default  Container