/**
 * Date: 2021年1月12日20:38:12
 * Author: kevin.he
 * Desc: 表单设计器-utils
 */
import Utils from '../utils';

// 能允许添加子集
function isCanInside(type){
  return ['area', 'group'].includes(type)
}

// 新增表单项
export const addItemFun = ({selected, item, data})=>{
  // 新增至选中的里面，或上面
  let [dropItem, dropParent] = findItemByIdFromData(data, selected);
  
  if(!dropParent){
    dropParent = data[0];
  }
  
  let addItem = null;
  
  if(dropItem && isCanInside(dropItem.type)){
    dropItem.children = dropItem.children||[];
    addItem = {
      ...item,
      parent: dropItem.id,
    };
    dropItem.children.push(addItem)
  }else{
    let dropIndex = dropItem? dropParent.children.findIndex(child=>child.id===dropItem.id): -1;
  
    addItem = {
      ...item,
      parent: dropParent.id,
    };
    if(dropIndex !==-1){
      dropParent.children.splice(dropIndex+1, 0, addItem)
    }else{
      dropParent.children.push(addItem);
    }
  }
  
  return [data, item.id, addItem]
};

// 复制表单项, id要改变
export const copyItemFun = ({item, parentItem, data})=>{
  let copyItem = JSON.parse(JSON.stringify(item));
  // 重置id
  delete copyItem.parent;
  const flatten = parseDataToFlatten([copyItem]);
  const newFlatten = {};
  for(let key in flatten){
    flatten[key].newId = `${flatten[key].type}_${Utils.getUuid()}`;
  }
  for(let key in flatten){
    const newSingle = {
      ...flatten[key],
      id: flatten[key].newId,
      parent: flatten[key].parent?flatten[flatten[key].parent].newId: null,
    };
    delete newSingle.newId;
    newFlatten[flatten[key].newId] = newSingle;
  }
  
  let copyItemArray = parseFlattenToData(newFlatten);
  copyItem = copyItemArray[0]||{};
  
  parentItem.children.push({
    ...copyItem,
    parent: item.parent,
  });
  
  return [data, copyItem.id];
};

// 删除表单项
export const deleteItemFun = ({item, parentItem, data})=>{
  let index = parentItem.children.findIndex(child=>child.id === item.id);
  parentItem.children.splice(index, 1);
  let newId = (parentItem.children[index]||parentItem.children[parentItem.children.length-1]||{}).id;
  
  return [data, newId]
};

// 释放表单项，重新排序
export const dropItemFun = ({dragItem, dropItem, position, dropParent, data, isMove, dragParent})=>{
  const _position = dropItem.id === '#'?'inside': position;
  
  // 工作区域内的元素交换位置，互相拖动
  if(isMove){
    if(_position === 'inside'){
      // 从dragParent中删除
      if(dragParent.children){
        dragParent.children = dragParent.children.filter(item=>item.id !== dragItem.id)
      }
      // 添加至dropItem
      if(!dropItem.children){
        dropItem.children = [];
      }
      dropItem.children.push({
        ...dragItem,
        parent: dropItem.id
      });
      
    }else{
      // 在同父级交换
      let disIndex = _position === 'up' ? 0: 1;
      let dragChildren = dragParent.children;
      let dropChildren = dropParent.children;
      let dragIndex = dragChildren.findIndex(item=>item.id === dragItem.id);
      let dropIndex = dropChildren.findIndex(item=>item.id === dropItem.id);
     
      let temp= dragChildren[dragIndex];
      dragChildren[dragIndex] = dragChildren[dropIndex];
      dragChildren[dropIndex] = temp;
      // dragChildren[dragIndex] = null;
      // dropChildren.splice(dropIndex+disIndex, 0, {
      //   ...dragItem,
      //   parent: dropParent.id,
      // });
      
      dragParent.children = dragChildren.filter(item=>item);
      dropParent.children = dropChildren.filter(item=>item);
    }
    
    return [data, dragItem.id]
  }
  
  // 以下是新增-----（左侧拖拽过来的，其中因为左侧的item没有赋予isMove,所以不走上面逻辑）
  if(_position === 'inside'){//拖入到容器内部
    if(!dropItem.children){
      dropItem.children = [];
    }
    dropItem.children.push({
      ...dragItem,
      parent: dropItem.id
    })
  }else{
    let disIndex = _position === 'up' ? 0: 1;//拖入到工作区域指定位置
    let parentChildren = dropParent.children;
    let index = parentChildren.findIndex(item=>item.id === dropItem.id);
    parentChildren.splice(index+disIndex, 0, {
      ...dragItem,
      parent: dropItem.parent
    });
    dropParent.children = parentChildren;
  }
  
  return [data, dragItem.id];
};

const setChildren = (data, parentToData={})=>{
  if(!data) return null;
  return data.map(item=>{
    const children = setChildren(parentToData[item.id], parentToData);
    return {
      ...item,
      children: children ? children : isCanInside(item.type)?[]: null
    }
  });
};

// 解析表单成嵌套模式
export const parseFlattenToData = (flatten)=>{
  let data = [];
  let parentToData = {};
  for(let id in flatten){
    let parent = flatten[id].parent;
    if(parent){
      parentToData[parent] = parentToData[parent]||[];
      parentToData[parent].push(flatten[id])
    }else{
      data.push(flatten[id])
    }
  }
  
  return setChildren(data, parentToData);
};

// 解析表单成嵌套模式
export const parseDataToFlatten = (data, flatten={})=>{
  if(!data) return flatten;
  
  data.forEach(item=>{
    const {children, ...other} = item;
    flatten[item.id] = other;
    parseDataToFlatten(children, flatten)
  });
  
  return flatten
};

// 查找对应的
export function findItemByIdFromData(data, id, parent){
  let drop = [null, null];
  
  if(!data) return drop;
  
  for(let i=0; i<data.length; i++){
    const item = data[i];
    const children = item.children;
    
    if(item.id === id){
      drop = [item, parent];
      break;
    }else{
      drop = findItemByIdFromData(children, id, item);
      if(drop[0]){
        break;
      }
    }
  }
  
  return drop;
}

/**
 * 判断是否隐藏
 */
export function getIsHide(hideRule, formData){
  if(!hideRule) return false;
  
  let isHide = false;
  
  for(let i=0; i<hideRule.length; i++){
    const {relation, noValueHide, useshowtype, useHideType,
      showtype, hideType, showValue, hideValue, type,
    } = hideRule[i];
    // showtype, hideType 1包含任一，2包含全部，完全相等
    let value = formData[relation];
    let hide1 = noValueHide && ['', null, undefined, []].includes(value);
    // 选中的显示
    let hide2 = getHideBySet(value, useshowtype, showtype, showValue, type);
    // 选中的隐藏
    let hide3 = useHideType && !getHideBySet(value, useHideType, hideType, hideValue, type);
    
    isHide = hide1 || hide2 || hide3;
    
    break;
  }
  
  return isHide;
}

function getHideBySet(value, useType, type, useValue, itemType){
  if(!useType) return false;
  
  let hide = false;
 
  if(['input', 'textarea'].includes(itemType) && useValue){
    if(['', undefined, null].includes(value)){
      value = '';
    }
    if(type === '1'||type==='2'){
      hide = !(value.indexOf(useValue)>-1);
    }else if(type === '3'){
      hide = !(value===useValue)
    }
  }else if(useValue){
    if(['', undefined, null].includes(value)){
      value = [];
    }else if(!Array.isArray(value)){
      value = [value]
    }
    if(type === '1'){
      hide = !(value.filter(item=>{
        return useValue.includes(item)
      }).length > 0);
    }else if(type === '2'){
      hide = !(value.filter(item=>{
        return useValue.includes(item)
      }).length === useValue.length);
    }else if(type === '3'){
      hide = !(value.filter(item=>{
        return useValue.includes(item)
      }).length === useValue.length && value.length === useValue.length);
    }
  }
  
  return hide;
}