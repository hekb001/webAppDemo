import React from 'react';
import { useDrag } from 'react-dnd';
export default (props) => {
    const { type, bg, category, ...other } = props;
    const [{ isDragging }, dragRef] = useDrag({
        item: {
            type: 'box',
            bg: bg,
            category: category,
            ...other
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    const style = {
        width: '100px',
        height: '100px',
        textAlign: 'center',
        lineHeight: '100px',
        color: '#333',
        marginBottom: '10px'
    }
    return <div ref={dragRef} style={{ backgroundColor: bg, ...style }}>{category}</div>
}
