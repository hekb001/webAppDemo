/*
 * @Author: kevin.he 
 * @Date: 2021-01-27 18:07:18 
 * @Last Modified by:   kevin.he 
 * @Last Modified time: 2021-01-27 18:07:18 
 */
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

export default routerMiddleware(browserHistory)