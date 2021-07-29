import React, { useEffect,useState } from 'react';
import './index.less'

let totalTime = 3000  // 假设视频播放为3s

export default function Animation() {
    const [isPlay, setIsPlay] = useState(false)  // 是否播放
    const [count, setCount] = useState(0)  // 播放次数
    const [type, setType] = useState(0)   // 使用哪个动画。0: @keyframes play; 1: @keyframes replay;
    
    // 暂停 && 播放
    const handleVideo = () => setIsPlay(!isPlay);
    
    // 重播
    const replay = () => {
        setIsPlay(true)
        setType(type ? 0 : 1)
    }
    
    // 动画结束时触发的事件
    const end = () => {
        setCount(count + 1)  // 播放次数 +1
        replay()   // 重新开始播放
    }
    
    return (
        <div id="root">
            <button onClick={handleVideo}>{ isPlay ? '暂停' : '播放' }</button>
            <button onClick={replay}>重播</button>
            <span>{ `播放次数为：${count}` }</span>
            <div className="container">
                <div 
                    className={`progress ${isPlay ? 'play' : 'pause'}`} 
                    style={{
                        animationDuration: `${totalTime}ms`,
                        animationName: `${type ? 'replay' : 'play'}`
                    }}
                    onAnimationEnd={end}  // 动画结束时的事件
                />
            </div>
        </div>
    )
}