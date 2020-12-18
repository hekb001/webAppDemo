import React from 'react';
import { Route } from 'react-router-dom'
const Home = () => import('../views/Home');
// import Home from '../views/Home';
function getAsyncComponent(
    load,
  ) {
    return class AsyncComponent extends React.PureComponent {
      componentDidMount() {
        // 在高阶组件 DidMount 时才去执行网络加载步骤
        load().then(({ default: component }) => {
          console.log("impot succes !!!!!!!!!!!!!!!!!!!");
          // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
          this.setState({
            component
          });
        });
      }
      render() {
        const { component } = this.state || {};
        // component 是 React.Component 类型，需要通过 React.createElement 生产一个组件实例
        return component
          ? React.createElement(component, {
              ...this.props
            })
          : null;
      }
    };
  }
export default () => (
    <Route>
        <Route path='/home' component={getAsyncComponent(Home)}></Route>
    </Route>
)