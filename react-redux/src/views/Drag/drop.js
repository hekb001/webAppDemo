import React, { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Ctx, CtxStore } from 'store/context';
import _ from 'lodash';
const useStore = () => {
    return useContext(CtxStore)
}
const useGloabal = () => {
    return useContext(Ctx)
}
const style = {
    width: '100px',
    height: '100px',
    textAlign: 'center',
    lineHeight: '100px',
    color: '#333',
    marginBottom: '10px'
}
const Card = (showData) => {
    const { data, newCardList } = useStore();
    const { setState } = useGloabal();
    const boxRef = useRef(null)
    const { bg, category, children, ...other } = showData;
    const [{ isDragging }, dragRef, dragPreview] = useDrag({
        item: {
            type: 'box',
            bg: bg,
            isMove: true,
            dragItem: showData,
            category: category,
            ...other
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    const [collectProps, dropRef] = useDrop({
        // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
        accept: 'box',
        // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
        collect: (minoter) => ({
            isOver: minoter.isOver(),
            canDrop: minoter.canDrop(),
        }),

        hover: (item) => {
            console.log('有东西上来了', item)
        },
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            console.log(showData, 'data....')
            if (didDrop) {
                return;
            }
            if (!item.isMove) {
                let _index = _.findIndex(data, (v) => v.id == item.id);
                data.splice(_index, 1);
                setState(data, item)
            } else {
                //交换位置逻辑
                console.log(item, '.......')
            }
        }
    })
    dragPreview(dropRef(boxRef))
    return <div ref={boxRef}>
        <div style={{ backgroundColor: showData.bg, ...style }} ref={dragRef}>{showData.category}</div>
    </div>
}
const Drop = (props) => {
    const { data, newCardList } = useStore();
    return <div style={{ display: 'inline-block', minWidth: '100px', minHeight: '100px', border: '1px solid #ddd' }}>
        {
            <div>
                {
                    newCardList.map((item) => {
                        if(newCardList.length>1 && item.id == '#'){
                            return 
                        }
                        return <Card
                            {...item}
                            key={item.id}>
                        </Card>
                    })
                }
            </div>
        }
    </div>
}
export default Drop;