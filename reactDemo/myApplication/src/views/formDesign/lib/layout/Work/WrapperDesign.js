/**
 * Date: 2021年1月13日14:47:33
 * Author: kevin.he
 * Desc: 表单设计器-工作区域-单位工作区drag,drop
 */
import React, {useState, useRef} from 'react';
import {Button} from '@alifd/next';
import {useDrag, useDrop} from 'react-dnd';
import {useStore, useGlobal} from '../../store/hooks';
import {dropItemFun, deleteItemFun, copyItemFun, getIsHide} from '../../store/utils';
import IconFont from '../../components/IconFont';

export default ({inside, item={type: 'area', id: '#'}, children, parentItem, containStyle, className, isGroup})=>{
  const id = item.id||'#';
  const boxRef = useRef(null);
  const setGlobal = useGlobal();
  const [position, setPosition] = useState();
  const {data, onFlattenChange, selected, hovering, formData} = useStore();
  const dropItem = item;
  
  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    item: { type: 'box', id: id , dragItem: item, dragParent: parentItem, isMove: true },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [{ canDrop, isOver }, dropRef] = !isGroup?useDrop({
    accept: 'box',
    drop: (item, monitor) => {
      // 如果children已经作为了drop target，不处理
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      
      const [newData, newId] = dropItemFun({
        dragItem: item.dragItem, // 从左边栏过来的，用dragItem
        dropItem: dropItem,
        position,
        data,
        dropParent: parentItem,
        dragParent: item.dragParent,
        isMove: item.isMove,
      });
      onFlattenChange(newData);
      setGlobal({ selected: newId, selectedItem: item.dragItem });
    },
    hover: (item, monitor) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: true });
      if (didHover) {
        // Determine rectangle on screen
        const hoverBoundingRect =
          boxRef.current && boxRef.current.getBoundingClientRect();
        // 元素下边距离页面上边的距离--元素上边距离页面上边的距离（document.offsetHeight）元素高
        const totalHeight = (hoverBoundingRect.bottom - hoverBoundingRect.top)
        const hoverMiddleY = totalHeight / 2;
        // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        //拖拽元素当前距离页面client的偏移对象
        const dragOffset = monitor.getSourceClientOffset();
        // Get pixels to the top
        const hoverClientY = dragOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        const between = totalHeight * 0.3;//元素高*0.3
        // console.log('%c dragOffsetY....'+dragOffset.y,'color:green')
        // console.log('%c hoverBoundingRect.top....'+hoverBoundingRect.top,'color:pink')
        console.log('%c hoverClientY....'+hoverClientY,'color:#00FF00')
        console.log('%c between....'+between,'color:grey')
        console.log('%c totalHeight....'+totalHeight,'color:red')
        //竖直方向上方进去元素高度的30%，垂直方向下方
        if (inside && hoverClientY > between && hoverClientY < totalHeight - between) { //拖动到区域内
          setPosition('inside');
        } else {
          if (hoverClientY <= hoverMiddleY) {//上
            setPosition('up');
          }
          // Dragging upwards
          if (hoverClientY > hoverMiddleY) {//下
            setPosition('down');
          }
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop() && !isGroup,
    }),
  }): [{}, null];
  
  // 成组内的区域不能放置
  if(!isGroup){
    dragPreview(dropRef(boxRef));
  }
  //选中节点
  const handleClick = (event)=>{
    event.stopPropagation();
    setGlobal({ selected: id, selectedItem: item });
  };
  //删除当前节点
  const deleteItem = (event)=>{
    event.stopPropagation();
    const [newData, newId] = deleteItemFun({item, parentItem, data});
    onFlattenChange(newData);
    setGlobal({ selected: newId });
  };
  
  // 复制节点
  const handleItemCopy = (event)=>{
    event.stopPropagation();
    const [newData, newId] = copyItemFun({item, parentItem, data});
    onFlattenChange(newData);
    setGlobal({ selected: newId });
  };
  
  const isSelect = id===selected && id !== '#' && !isGroup;
  const isActive = canDrop && isOver;
  const hoverId = id;
  let overwriteStyle = {
    backgroundColor: hovering === hoverId ? '#ecf5ff' : '',
    opacity: isDragging ? 0 : 1,
  };
  if (isActive) {
    if (position === 'inside') {
      overwriteStyle = {
        ...overwriteStyle,
        backgroundColor: 'rgba(255,235,59,0.2)'
      };
    } else if (position === 'up') {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 -3px 0 red',
      };
    } else if (position === 'down') {
      overwriteStyle = {
        ...overwriteStyle,
        boxShadow: '0 3px 0 red',
      };
    }
  }
  
  let isHide = item.isHide||getIsHide(item.hideRule, formData);
  let {border = [], borderStyle='solid', borderWidth=1, borderColor} = item;
  borderWidth = borderWidth - 0;
  let borderStyleMain = {
    borderStyle,
    borderColor,
    borderLeftWidth: border.includes('left')?borderWidth:0,
    borderRightWidth: border.includes('right')?borderWidth:0,
    borderTopWidth: border.includes('top')?borderWidth:0,
    borderBottomWidth: border.includes('bottom')?borderWidth:0,
  };
  
  const fieldWrapper = <div
    className={`field-wrapper ${isSelect?'select': ''} ${className||''} ${isHide?'hide': ''}`}
    ref={boxRef}
    style={{
      backgroundColor: item.type==='area'?'#f1f1f1': '',
      ...overwriteStyle,
      ...containStyle,
      ...item.wrapstyle,
      ...borderStyleMain
    }}
    onClick={handleClick}
  >
     {data[0] && data[0].id==='#' && (data[0].children||[]).length===0 && <div className='null-h2'>点击/拖拽左侧栏的组件进行添加</div>}
    {isSelect && !isGroup &&
    <div>
      <div className='drag-icon-wrapper' ref={dragRef}>
        <IconFont type='move'/>
      </div>
      <div className='buttons-wrapper'>
        <Button text onClick={deleteItem}><IconFont type='delete' title='删除'/></Button>
        <Button text onClick={handleItemCopy}><IconFont type='copy' title='复制'/></Button>
      </div>
    </div>
    }
    {children}
  </div>;
  
  
  return item.oneSelf?
    <div className='one-self'>{fieldWrapper}</div> : fieldWrapper
}