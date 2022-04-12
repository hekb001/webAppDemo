import React from 'react'
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
const notFoundImg = '//mila.oss-cn-shenzhen.aliyuncs.com/pic/404.jpg';
<HomeOutlined />
export default class NotFound extends React.Component{
	goBack() {
		console.log('go back')
	}
	render() {
		return (
			<div className="ant-layout-topaside">
				<div className="notFound-wrapper" style={{margin: '0', height: '100vh', textAlign: 'center'}}>
					<div style={{marginTop: 40}}>
						<h1 style={{marginBottom: 20}}>你访问的页面不存在</h1>
						<Link to="/home"><HomeOutlined />首页</Link>
					</div>
					<div className="notfound-content" style={{marginLeft: '0', marginTop: '0'}}>
						<img src={notFoundImg} className="normal" style={{maxWidth: '100%', maxHeight: 800}}/>
						<br/>
					</div>
				</div>
			</div>
		);
	}
};
