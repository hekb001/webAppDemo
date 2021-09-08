import React from 'react';
import { Route } from 'react-router-dom'
import { getAsyncComponent } from 'utils';
import { UserAuthWrapper } from 'components/AuthCert';
const ProgressBar = () => import('views/ProgressBar'); //使用js控制动画播放
// const ProgressBar = () => import('views/ProgressBar/animation');//使用css animation 改变宽度占比动画属性 播放
// const ProgressBar = () => import('views/ProgressBar/translate');//使用css animation 改变tanslate +scalex占比动画属性 播放 不增加页面重绘
const Componet = getAsyncComponent(ProgressBar, '1', '3');
export default () => (
    <Route
        path='/progressBar'
        component={UserAuthWrapper(Componet, '12')}>
    </Route>
)