import cookie from 'js-cookie'
import axios from 'axios'
// import axiosInstance from 'utils/axiosInstance'
import MC from 'memory-cache'
import moment from 'moment'
import 'moment/locale/zh-cn'
import retry from 'async/retry'
import parallel from 'async/parallel'

import React from 'react'
import ReactDom from 'react-dom'

import { FormattedMessage } from 'react-intl'
import { SmileOutlined, FrownOutlined } from '@ant-design/icons'
import { notification } from 'antd'
moment.locale('zh-cn')

export const Today = moment()
export const _Today = moment().format('YYYY-MM-DD')
export const Tomorrow = moment().add(1, 'day')
export const yesterday = moment().subtract(1, 'day')
export const _yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD')
export const _today = new Date().toJSON().slice(0, 10)
export const _year = new Date().getFullYear()
export const currentMonthStart = moment().startOf('month').format('YYYY/MM/DD')
export const currentMonthEnd = moment().endOf('month').format('YYYY/MM/DD')
export const currentMonth = moment().startOf('month').format('YYYY-MM')
export const currentMonthTime = parseInt(moment().startOf('month').format('MM'))
export const lastMonth = parseInt(moment().startOf('month').format('MM')) - 1

export const _currentMonthStart = moment(currentMonthStart, 'YYYY/MM/DD')
export const _currentMonthEnd = moment(currentMonthEnd, 'YYYY/MM/DD')
export const _currentMonth = moment(currentMonth, 'YYYY-MM')

export const currenYear = moment().startOf('year').format('YYYY')

//统计分析所需
export const yearNum = fromYear()
export const currentMonth_6 = moment().subtract(5, 'months').format('YYYY-MM') //5个月前
export const _currentMonth_6 = moment().subtract(5, 'months')
export const _today_7 = moment().subtract(7, 'days') //7天前
export const today_7 = moment().subtract(7, 'days').format('YYYY-MM-DD')
export const currentMonthStart_j = moment()
	.startOf('month')
	.format('YYYY-MM-DD')
export const currentMonthEnd_j = moment().endOf('month').format('YYYY-MM-DD')
export const _currentMonthStart_j = moment(currentMonthStart_j, 'YYYY-MM-DD')
export const _currentMonthEnd_j = moment(currentMonthEnd_j, 'YYYY-MM-DD')

export function lastMonthTime() {
	if (currentMonthTime == 1) {
		return parseInt(currenYear - 1) + '-' + 12
	} else {
		return currenYear + '-' + parseInt(currentMonthTime - 1)
	}
}

export const PaginationExtraProps = {
	pageSizeOptions: ['5', '10', '15', '20', '50'],
	showSizeChanger: true,
	showQuickJumper: true,
	showTotal: (total, range) => (
		<span>
			{range[0]}-{range[1]}
			<FormattedMessage id="common.term" defaultMessage="项" /> /{' '}
			<FormattedMessage id="common.total" defaultMessage="共" /> {total}{' '}
			<FormattedMessage id="common.term" defaultMessage="项" />
		</span>
	),
}

export const pagerOptions = ['5', '10', '15', '20']

/**
 * 删除obj下为空的属性
 * @param obj
 */
export function deleteJson(obj) {
	let newObj = {}
	for (var attr in obj) {
		if (obj[attr] === 0 || obj[attr] === '0') {
			newObj[attr] = obj[attr]
		}
		if (obj[attr] != '') {
			newObj[attr] = obj[attr]
		}
	}
	return newObj
}

/**
 * 给列表数组加上id,key
 * @param data
 * @param metaData
 * @param pg
 * @returns {Array}
 */
export function extractData(data, metaData, pg = { p: 1, psize: 10 }) {
	var objList = []
	var index = (pg.p - 1) * pg.psize + 1
	if (_.isArray(metaData)) {
		if (metaData.length > 0) {
			_.each(data, function (item) {
				if (item.id) {
					var working_obj = {
						key: item.id.toString(),
						serial: index++,
					}
				} else if (item.uuid) {
					var working_obj = {
						key: item.uuid.toString(),
						serial: index++,
					}
				} else {
					var working_obj = { key: index.toString(), serial: index++ }
				}
				_.each(metaData, function (meta) {
					var key_name = meta.key_name
						? meta.key_name
						: meta.depth[meta.depth.length - 1]
					working_obj[key_name] = DeepGet(item, meta.depth)
				})

				objList.push(working_obj)
			})
		} else {
			_.each(data, function (item, index) {
				item['key'] = item.id ? item.id.toString() : index.toString()
				item['serial'] = index + 1
				objList.push(item)
			})
		}
	}
	return objList
}

export function getDepartMentTree(formData, index = 0) {
	var deptTree = []

	if (formData && formData.length > index) {
		deptTree = formData[index].res.list
		deptTree = JSON.parse('[' + getTree('', deptTree) + ']')
	}

	return deptTree
}

export function makeDepartmentTree(jsonTree) {
	if (jsonTree == undefined) {
		return []
	}
	return JSON.parse('[' + getTree('', jsonTree) + ']')
}

export function makeNodeTree(jsonTree) {
	return JSON.parse('[' + getNodeTree('', jsonTree) + ']')
}

// export function getTree(deptTreeJson, obj) {
// 	for (var i = 0; i < obj.length; i++) {
// 		var working = obj[i];
// 		if (i > 0) {
// 			deptTreeJson += ' , ';
// 		}
// 		deptTreeJson +=
// 			'{"label" : "' + working.deptName + '" , "key" : "' + working.id + '" , "value" : "' + working.id + '"';
// 		if (working.son) {
// 			deptTreeJson += ', "children":[';
// 			deptTreeJson = getTree(deptTreeJson, working.son);
// 			deptTreeJson += ']}';
// 		} else {
// 			deptTreeJson += '}';
// 		}
// 	}
//
// 	return deptTreeJson;
// }
export function getTree(deptTreeJson, obj) {
	for (var i = 0; i < obj.length; i++) {
		var working = obj[i]
		if (i > 0) {
			deptTreeJson += ' , '
		}
		deptTreeJson +=
			'{"sub_id" : "' +
			(working.sub_id || null) +
			'" , "title" : "' +
			working.deptName +
			'" , "nums" : "' +
			working.nums +
			'" , "stuff_nums" : "' +
			working.stuff_nums +
			'" , "key" : "' +
			working.id +
			'" , "value" : "' +
			working.id +
			'"'
		if (working.son) {
			deptTreeJson += ', "children":['
			deptTreeJson = getTree(deptTreeJson, working.son)
			deptTreeJson += ']}'
		} else {
			deptTreeJson += '}'
		}
	}

	return deptTreeJson
}

export function getSubTree(deptTreeJson, obj) {
	for (var i = 0; i < obj.length; i++) {
		var working = obj[i]
		if (i > 0) {
			deptTreeJson += ' , '
		}
		deptTreeJson +=
			'{"sub_id" : "' +
			(working.sub_id || null) +
			'" , "title" : "' +
			working.deptName +
			'" , "key" : "' +
			working.id +
			'" , "value" : "' +
			(working.id + '&' + (working.sub_id || '')) +
			'"'
		if (working.son) {
			deptTreeJson += ', "children":['
			deptTreeJson = getSubTree(deptTreeJson, working.son)
			deptTreeJson += ']}'
		} else {
			deptTreeJson += '}'
		}
	}
	return deptTreeJson
}

export function getNodeTree(nodeTreeJson, tree) {
	var keys = _.keys(tree)
	var i = 0

	_.each(keys, function (key) {
		var working = tree[key]
		if (i > 0) {
			nodeTreeJson += ' , '
		}
		nodeTreeJson +=
			'{"title" : "' +
			(working.node_name || '?') +
			'" , "key" : "' +
			working.id +
			'" , "value" : "' +
			working.id +
			'"'
		if (working.child) {
			nodeTreeJson += ', "children":['
			nodeTreeJson = getNodeTree(nodeTreeJson, working.child)
			nodeTreeJson += ']}'
		} else {
			nodeTreeJson += '}'
		}
		i++
	})

	return nodeTreeJson
}

export function treeFindLabel(data, id) {
	if (_.isArray(data)) {
		for (var i = 0; i < data.length; i++) {
			var working = data[i]
			if (working.key == id) {
				return working.label
			}
			if (working.children) {
				var result = treeFindLabel(working.children, id)
				if (result) {
					return result
				}
			}
		}

		return ''
	}
}

export function treeFind(data, id, primary) {
	if (data != null) {
		var keys = _.keys(data)

		_.each(keys, function (key) {
			var working = data[key]
			if (working.id == id) {
				console.log('found ', working)
				primary = working
			}
			var result = treeFind(working.child, id)
			if (result != null) return result
		})
	}

	return null

	//
	// if (data != null) {
	//   var keys = _.keys(data);
	//
	//   _.each(keys , function(key){
	//     var working = data[key];
	//   //  console.log('working ' , working);
	//     if (working.id == id) {
	//       //  console.log('found ' , working);
	//         return treeFind(data , id , working);
	//     }
	//     if (working.child) {
	//         var result = treeFind(working.child , id)
	//         if (result) {
	//             return result;
	//         }
	//     }
	//   });
	//
	//   if (found) return found;
	//
	// }
}

export function getAllDeptList(data, arr) {
	if (data) {
		for (var i = 0; i < data.length; i++) {
			var working = data[i]
			arr.push({ label: working.label, key: working.key })
			if (working.children) {
				getAllDeptList(working.children, arr)
			}
		}
		return arr
	}
}

export function initPermissionRole() {
	const acl = getENVValue('acl')
	if (_.isEmpty(acl)) return {}
	const params = {
		operator_id: acl.id,
		operator_role: acl.name,
		operator_name: getENVValue('name'),
	}
	return params
}

export function initPermissionRange() {
	const acl = getENVValue('acl')
	if (_.isEmpty(acl)) return {}
	const params = {
		platform_switch: 1,
		permission: parseInt(acl.is_all) ? 1 : 0,
		range_type: parseInt(acl.range_type) ? acl.range_type : 1,
		range_value: _.isEmpty(acl.range)
			? 'null'
			: JSON.stringify(formatGetPermissionRange(acl.range)),
	}
	if (parseInt(acl.range_type) == 2) {
		_.assign(params, { user_uuid: getENVValue('uuid') })
	}
	return params
}

function formatGetPermissionRange(arr) {
	let obj = {}
	_.map(arr, function (item, index) {
		obj[item.type] = item.scop
	})
	return obj
}

export function DefaultParams(isType = true) {
	//initPermissionRole
	//boolean

	const permissionParams = isType ? {} : initPermissionRole()

	const defalutP = {
		access_token: cookie.get('access_token'),
		company_id: cookie.get('company_id'),
		langType: cookie.get('langType'),
		// company_access_token:cookie.get('company_access_token')
	}

	return _.assign({}, defalutP, permissionParams)
}
export function DefaultParams2(isType = true) {
	//initPermissionRole
	//boolean

	const permissionParams = isType ? {} : initPermissionRole()

	const defalutP = {
		access_token: cookie.get('company_access_token'),
		company_id: cookie.get('company_id'),
		langType: cookie.get('langType'),
		// company_access_token:cookie.get('company_access_token')
	}

	return _.assign({}, defalutP, permissionParams)
}

export function PermissionParams() {
	const permissionParams = initPermissionRange()
}

export function SocialParams() {
	return {
		access_token: cookie.get('company_access_token'),
		company_id: cookie.get('company_id'),
		langType: cookie.get('langType'),
	}
}

export function DeepGet(obj, properties, defaultVal = '') {
	if (!obj) {
		if (defaultVal == null) return ''
		return obj === 0 ? 0 : defaultVal
	}

	if (properties.length === 0) {
		return obj
	}

	var foundSoFar = obj[properties[0]]

	var remainingProperties = properties.slice(1)
	return DeepGet(foundSoFar, remainingProperties, defaultVal)
}

export function findForDisplay(list, object, array) {
	var value = DeepGet(object, array).toString()
	var found = _.find(list, ['key', value])

	return found ? value : ''
}

export function cleanObject(obj) {
	var cleaned = obj

	for (var k in obj) {
		if (typeof obj[k] === 'string') {
			cleaned[k] = obj[k].trim()
		}
	}

	return cleaned
}

export function uniqId() {
	return new Date().getTime().toString().substring(8)
}

export function formatDate(dateObj) {
	var y = dateObj.getFullYear(),
		m = dateObj.getMonth() + 1, // month is 0-indexed
		d = dateObj.getDate()

	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
}

export function getDateTime() {
	var now = new Date()
	var h = now.getHours()
	var m = now.getMinutes()
	var s = now.getSeconds()

	var time =
		'' +
		(h < 10 ? '0' + h : h) +
		':' +
		(m < 10 ? '0' + m : m) +
		':' +
		(s < 10 ? '0' + s : s)

	return formatDate(now) + ' ' + time
}

export function DaysInMonth(currentMonth) {
	if (currentMonth) {
		var splited = currentMonth.split('-')
		return new Date(splited[0], splited[1], 0).getDate()
	} else {
		return 30
	}
}

export function calAge(dateString) {
	if (dateString) {
		var birthday = +new Date(dateString)
		return ~~((Date.now() - birthday) / (24 * 3600 * 365.25 * 1000))
	}

	return '?'
}

export function getErrorByIndex(index, serverMessage = '') {
	if (index != null) {
		switch (index) {
			case -1:
				return _locale.network_error
			case 0:
				return _locale.access_denied
			default:
				return serverMessage
		}
	} else {
		return _locale.unknown
	}
}

export function postErrorByMsg(msg) {
	switch (msg) {
		case 'access_denied':
			return _locale.access_denied
			break
		default:
			return msg
	}
}

export function hasNumber(myString) {
	return /\d/.test(myString)
}

export function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n)
}

// export function postRequest(url, data, next) {
// 	axiosInstance
// 		.post(url, data)
// 		.then(function (response) {
// 			next(response.data)
// 		})
// 		.catch(function (error) {
// 			console.log('POST REQUEST EXCEPTION :', error)
// 			next(null)
// 		})
// }

export function Concurent(packs, next) {
	var ax = []

	for (var i = 0; i < packs.length; i++) {
		ax.push(getIt(packs[i].url, packs[i].params))
	}

	axios
		.all(ax)
		.then(
			axios.spread(function (...returns) {
				for (var i = 0; i < returns.length; i++) {
					if (typeof returns[i].data.status !== 'undefined') {
						if (!returns[i].data.status) {
							next(null, i, returns[i].data.msg)
							return
						}
					} else {
						throw Error('Error')
					}
				}
				next(returns)
			})
		)
		.catch(function (error) {
			console.log(error)
			next(null)
		})
}

export function AsyncParallel(packs, next) {
	var asyncFunctions = []

	_.each(packs, function (pack) {
		asyncFunctions.push(function (callback) {
			retry(
				{
					times: 2,
					interval: function (retryCount) {
						return 100 * Math.pow(2, retryCount)
					},
					errorFilter: function (err) {
						return err.message === 'access_denied' // only retry on a specific error
					},
				},
				AsyncGet.bind(pack),
				function (err, result) {
					callback(err ? err : null, result)
				}
			)
		})
	})

	parallel(asyncFunctions, function (err, results) {
		next(err, results)
	})
}

export function SimpleGet(url, params, next, defaultP = true) {
	var opts = {
		url: url,
		params: params,
	}
	var apiMethod = defaultP ? AsyncGet : AsyncSocialGet

	retry(
		{
			times: 2,
			interval: function (retryCount) {
				return 100 * Math.pow(2, retryCount)
			},
			errorFilter: function (err) {
				return err.message === 'access_denied' // only retry on a specific error
			},
		},
		apiMethod.bind(opts),
		function (err, result) {
			if (err == null && typeof result === 'object') {
				next(result)
			} else {
				//We Still Have Error after many trials
				next(null, result)
			}
		}
	)
}

export function SimplePost(url, data, next, defaultP = true) {
	var opts = {
		url: url,
		data: data,
	}
	cleanContextCache('HomeCache')
	var apiMethod = defaultP ? AsyncPost : AsyncSocialPost

	retry(
		{
			times: 2,
			interval: function (retryCount) {
				return 100 * Math.pow(2, retryCount)
			},
			errorFilter: function (err) {
				return err.message === 'access_denied' // only retry on a specific error
			},
		},
		apiMethod.bind(opts),
		function (err, result) {
			if (err == null && typeof result === 'object') {
				next(result)
			} else {
				//We Still Have Error after many trials
				next(null, result)
			}
		}
	)
}

export function SimplePostNew(url, data, next, defaultP = true) {
	var opts = {
		url: url,
		data: data,
	}

	var apiMethod = defaultP ? AsyncPostNew : AsyncSocialPostNew

	retry(
		{
			times: 2,
			interval: function (retryCount) {
				return 100 * Math.pow(2, retryCount)
			},
			errorFilter: function (err) {
				return err.message === 'access_denied' // only retry on a specific error
			},
		},
		apiMethod.bind(opts),
		function (err, result) {
			if (err == null && typeof result === 'object') {
				next(result)
			} else {
				//We Still Have Error after many trials
				next(null, result)
			}
		}
	)
}

export function SimplePut(url, data, next, defaultP = true) {
	var opts = {
		url: url,
		data: data,
	}
	cleanContextCache('HomeCache')
	var apiMethod = defaultP ? AsyncPut : AsyncSocialPut
	retry(
		{
			times: 2,
			interval: function (retryCount) {
				return 100 * Math.pow(2, retryCount)
			},
			errorFilter: function (err) {
				return err.message === 'access_denied' // only retry on a specific error
			},
		},
		apiMethod.bind(opts),
		function (err, result) {
			if (err == null && typeof result === 'object') {
				next(result)
			} else {
				//We Still Have Error after many trials
				next(null, result)
			}
		}
	)
}

export function SimpleDelete(url, params, next, defaultP = true) {
	var opts = {
		url: url,
		params: params,
	}
	var apiMethod = defaultP ? AsyncDetele : AsyncSocialDelete
	retry(
		{
			times: 2,
			interval: function (retryCount) {
				return 100 * Math.pow(2, retryCount)
			},
			errorFilter: function (err) {
				return err.message === 'access_denied' // only retry on a specific error
			},
		},
		apiMethod.bind(opts),
		function (err, result) {
			if (err == null && typeof result === 'object') {
				next(result)
			} else {
				//We Still Have Error after many trials
				next(null, result)
			}
		}
	)
}

export function cleanContextCache(context) {
	var splited = context.split(';')
	var L = splited.length

	_.each(MC.keys(), function (key) {
		for (var i = 0; i < L; i++) {
			var validKey = false
			if (key.toLowerCase().indexOf(splited[i].toLowerCase()) < 0) {
				validKey = true
				// break;
			}
			if (!validKey) {
				MC.del(key)
				console.log('%c' + key, 'color: red')
			}
		}
	})
}

export function logoutCallback() {
	var iframe = document.getElementById('logoutFrame')
	iframe.setAttribute('src', config.LOGOUT_URL)
	setTimeout(function () {
		window.location.reload()
	}, 750)
}

export function getSerialRejection(list, StringId) {
	var _rejected = []
	var _serial = null

	_.each(list, function (item) {
		if (item.key != StringId) {
			_rejected.push(item)
		} else {
			_serial = item.serial
		}

		if (_serial != null && item.serial > _serial) {
			item.serial--
		}
	})

	return _rejected
}

export function setLoginParams() {
	if (cookie.get('access_token') == null || hasChangeAccount()) {
		// console.log('setting cookies ' , ENV);
		cookie.set('access_token', ENV.access_token)
		cookie.set('company_access_token', ENV.company_access_token)
		cookie.set('company_id', ENV.company_id)
		cookie.set('refresh_token', ENV.refresh_token)
		cookie.set('company_uuid', ENV.company_uuid)
		cookie.set('certification', ENV.certification)
		cookie.set('uuid', ENV.uuid)
		cookie.set('serviceStatus', JSON.stringify(ENV.serviceStatus))
		cookie.set('acl', JSON.stringify(ENV.acl))
		cookie.set('langType', ENV.langType)
	} else {
		console.log('has access_token , ', cookie.get('access_token'))
	}
}

/**
 * 判断用户是否为同一个登录用户
 * @return {Boolean} [description]
 */
export function hasChangeAccount() {
	const uid = getENVValue('uid')
	const saas_uid = getENVValue('saas_uid')
	//判断用户是否是同一个用户
	const hasChange = saas_uid && saas_uid != uid ? true : false
	return hasChange
}

export function setVisitParam(params) {
	params = params ? params : 'visit'
	cookie.set(params, 1, { expires: 365 })
}

export function getVisitParam(params) {
	params = params ? params : 'visit'
	return parseInt(cookie.get(params)) ? true : false
}

export function setCertification(value) {
	cookie.set('certification', value)
	ENV.certification = value
}

export function userCanView(moduleName) {
	return true
	// var cookieAcl = cookie.get('acl');
	// var BackUPAcl = ENV.acl || (cookieAcl != null ? JSON.parse(cookieAcl) : '');

	// return BackUPAcl && BackUPAcl.hasOwnProperty(moduleName) && BackUPAcl[moduleName].indexOf('view') >= 0;
}

export function userCanEdit(moduleName) {
	return true
	// var cookieAcl = cookie.get('acl');
	// var BackUPAcl = ENV.acl || (cookieAcl != null ? JSON.parse(cookieAcl) : '');
	//
	// return BackUPAcl && BackUPAcl.hasOwnProperty(moduleName) && BackUPAcl[moduleName].indexOf('edit') >= 0;
}

export function getENVValue(key) {
	return ENV[key] || cookie.get(key)
}

export function regionDataFormat(data, parent_id) {
	if (!Array.isArray(data)) return
	var privance = []
	// parent_id = parseInt(parent_id);
	// _.forEach(data, function(value) {
	//   if (value.parent_id == parent_id) {
	//     privance.push(dataReForm(data, value.id, value));
	//   }
	// });
	for (let i = 0; i < data.length; i++) {
		const item = data[i]
		if (item && item.parent_id == parent_id) {
			privance.push(dataReForm(data, item.id, item))
		}
	}

	return privance
}

export function getRegionIdArr(region_list, id) {
	const obj = _.find(region_list, ['id', id])

	if (_.isEmpty(obj)) return
	const regionStrs = obj.parents + ',' + id
	let lastarr = regionStrs.slice(3).split(',')
	// for (let i = 0; i < lastarr.length; i++) lastarr[i] = lastarr[i]+'';
	return lastarr
}

export function getRegionIdArrTest(region_list, id) {
	const obj = _.find(region_list, ['id', id])
	if (_.isEmpty(obj)) return
	const regionStrs = obj.parent_id == '45' ? id : obj.parent_id + ',' + id
	let lastarr = regionStrs.slice(0).split(',')
	//for(let i = 0 ;i<lastarr.length; i++) lastarr[i] = lastarr[i]*1;
	return lastarr
}

export function convertToMoment(dateString, format) {
	return moment(dateString, format)
}

//Form Checkers

export function checkNumber(rule, value, callback) {
	if (!isNumeric(value)) {
		callback('数字必填项')
	} else {
		callback()
	}
}

export function checkMAC(rule, value, callback) {
	var re = new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$')

	re.test(value) ? callback() : callback('MAC地址无效')
}

export function checkMediumLength(rule, value, callback) {
	if (!value) {
		callback()
	} else {
		value.length < 24 ? callback() : callback('最大长度是24个字符')
	}
}

export function checkLargeLength(rule, value, callback) {
	if (!value) {
		callback()
	} else {
		value.length < 120 ? callback() : callback('最大长度是120个字符')
	}
}

//Translation FUNCTIONS

export function employeeStatusTranslator(status) {
	if (status == null) return ''

	switch (status.toString()) {
		case '1':
			return '正式'
		case '2':
			return '试用'
			break
		case '3':
			return '离职'
			break
		default:
			return ''
			break
	}
}

/*
 HELPER FUNCTIONS
 */

// function getIt(url, parameters) {
// 	return axiosInstance.get(url, { params: parameters })
// }

// export function RefreshToken(next) {
// 	axiosInstance
// 		.get('/api/refresh', {
// 			params: {},
// 		})
// 		.then(function (response) {
// 			next(response.data)
// 		})
// 		.catch(function (error) {
// 			console.log(error)
// 			next(null)
// 		})
// }

// export function RefreshSocialToken(next) {
// 	axiosInstance
// 		.get('/api/companyRefresh', {
// 			params: {},
// 		})
// 		.then(function (response) {
// 			next(response.data)
// 		})
// 		.catch(function (error) {
// 			console.log(error)
// 			next(null)
// 		})
// }

// function AsyncGet(callback, result) {
// 	var df = DefaultParams()
// 	const permissionParams = initPermissionRange()
// 	const url = this.url
// 	axiosInstance
// 		.get(this.url, {
// 			params: cleanObject(
// 				_.assign(
// 					{ access_token: df.access_token },
// 					permissionParams,
//           this.params
// 				)
// 			),
// 			timeout: _locale.requestTimeOut,
// 		})
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				if (response.data.msg == 'access_denied') {
// 					RefreshToken(function (data) {
// 						if (data && data.status) {
// 							console.log('refreshing Token...')
// 							ENV.access_token = data.access_token
// 							ENV.refresh_token = data.refresh_token
// 							cookie.set('access_token', data.access_token)
// 							cookie.set('refresh_token', data.refresh_token)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			// callback(null , _locale.network_error);
// 			callback(null)
// 		})
// }

// function AsyncPostNew(callback, result) {
// 	var df = DefaultParams()
// 	axiosInstance
// 		.post(
// 			this.url,
// 			cleanObject(_.assign(this.data, { access_token: df.access_token }))
// 		)
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				//Access Token Expired
// 				if (response.data.msg == 'access_denied') {
// 					RefreshToken(function (data) {
// 						if (data && data.status) {
// 							console.log('refreshing Token...')
// 							cookie.set('access_token', data.access_token)
// 							cookie.set('refresh_token', data.refresh_token)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')

// 			// callback(null , _locale.network_error);
// 			callback(null)
// 		})
// }

// function AsyncPost(callback, result) {
// 	var df = DefaultParams()
// 	axiosInstance
// 		.post(
// 			this.url,
// 			cleanObject(_.assign(this.data, { access_token: df.access_token }))
// 		)
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				//Access Token Expired
// 				if (response.data.msg == 'access_denied') {
// 					RefreshToken(function (data) {
// 						if (data && data.status) {
// 							console.log('refreshing Token...')
// 							cookie.set('access_token', data.access_token)
// 							cookie.set('refresh_token', data.refresh_token)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

// function AsyncPut(callback, result) {
// 	var df = DefaultParams()
// 	axiosInstance
// 		.put(
// 			this.url,
// 			cleanObject(_.assign(this.data, { access_token: df.access_token }))
// 		)
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				//Access Token Expired
// 				if (response.data.msg == 'access_denied') {
// 					RefreshToken(function (data) {
// 						if (data && data.status) {
// 							console.log('refreshing Token...')
// 							cookie.set('access_token', data.access_token)
// 							cookie.set('refresh_token', data.refresh_token)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

// function AsyncDelete(callback, result) {
// 	var df = DefaultParams()
// 	const permissionParams = initPermissionRange()
// 	const url = this.url
// 	axiosInstance
// 		.delete(url, {
// 			params: cleanObject(
// 				_.assign(
// 					this.params,
// 					{ access_token: df.access_token },
// 					permissionParams
// 				)
// 			),
// 			timeout: _locale.requestTimeOut,
// 		})
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				if (response.data.msg == 'access_denied') {
// 					RefreshToken(function (data) {
// 						if (data && data.status) {
// 							console.log('refreshing Token...')
// 							cookie.set('access_token', data.access_token)
// 							cookie.set('refresh_token', data.refresh_token)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			// callback(null , _locale.network_error);
// 			callback(null)
// 		})
// }

// function AsyncSocialGet(callback, result) {
// 	var df = SocialParams()
// 	const permissionParams = initPermissionRange()
// 	var url = this.url
// 	axiosInstance
// 		.get(this.url, {
// 			params: cleanObject(
// 				_.assign(

// 					{ access_token: df.access_token },
// 					permissionParams,
//           this.params
// 				)
// 			),
// 			timeout: _locale.requestTimeOut,
// 		})
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				if (response.data.msg == 'access_denied') {
// 					RefreshSocialToken(function (_data) {
// 						if (_data && _data.status) {
// 							console.log('refreshing Company Token...')
// 							cookie.set(
// 								'company_access_token',
// 								_data.access_token
// 							)
// 							cookie.set(
// 								'company_refresh_token',
// 								_data.refresh_token
// 							)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

// function AsyncSocialPostNew(callback, result) {
// 	var df = SocialParams()
// 	axiosInstance
// 		.post(
// 			this.url,
// 			cleanObject(_.assign(this.data, { access_token: df.access_token }))
// 		)
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				//Access Token Expired
// 				if (response.data.msg == 'access_denied') {
// 					RefreshSocialToken(function (_data) {
// 						if (_data && _data.status) {
// 							console.log('refreshing Company Token...')
// 							cookie.set(
// 								'company_access_token',
// 								_data.access_token
// 							)
// 							cookie.set(
// 								'company_refresh_token',
// 								_data.refresh_token
// 							)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

// function AsyncSocialPost(callback, result) {
// 	var df = SocialParams()
// 	axiosInstance
// 		.post(
// 			this.url,
// 			cleanObject(_.assign(this.data, { access_token: df.access_token }))
// 		)
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				//Access Token Expired
// 				if (response.data.msg == 'access_denied') {
// 					RefreshSocialToken(function (_data) {
// 						if (_data && _data.status) {
// 							console.log('refreshing Company Token...')
// 							cookie.set(
// 								'company_access_token',
// 								_data.access_token
// 							)
// 							cookie.set(
// 								'company_refresh_token',
// 								_data.refresh_token
// 							)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

// function AsyncSocialPut(callback, result) {
// 	var df = SocialParams()
// 	axiosInstance
// 		.put(
// 			this.url,
// 			cleanObject(_.assign(this.data, { access_token: df.access_token }))
// 		)
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				//Access Token Expired
// 				if (response.data.msg == 'access_denied') {
// 					RefreshSocialToken(function (_data) {
// 						if (_data && _data.status) {
// 							console.log('refreshing Company Token...')
// 							cookie.set(
// 								'company_access_token',
// 								_data.access_token
// 							)
// 							cookie.set(
// 								'company_refresh_token',
// 								_data.refresh_token
// 							)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

// function AsyncSocialDelete(callback, result) {
// 	var df = SocialParams()
// 	const permissionParams = initPermissionRange()
// 	var url = this.url
// 	axiosInstance
// 		.delete(url, {
// 			params: cleanObject(
// 				_.assign(
// 					this.params,
// 					{ access_token: df.access_token },
// 					permissionParams
// 				)
// 			),
// 			timeout: _locale.requestTimeOut,
// 		})
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				if (response.data.msg == 'access_denied') {
// 					RefreshSocialToken(function (_data) {
// 						if (_data && _data.status) {
// 							console.log('refreshing Company Token...')
// 							cookie.set(
// 								'company_access_token',
// 								_data.access_token
// 							)
// 							cookie.set(
// 								'company_refresh_token',
// 								_data.refresh_token
// 							)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

// function AsyncAllSocial(callback, result) {
// 	var df = SocialParams()
// 	const permissionParams = initPermissionRange()

// 	axiosInstance
// 		.get(this.url, {
// 			params: cleanObject(
// 				_.assign(
// 					this.params,
// 					{ access_token: df.access_token },
// 					permissionParams
// 				)
// 			),
// 			timeout: _locale.requestTimeOut,
// 		})
// 		.then(function (response) {
// 			if (response.data.status) {
// 				callback(null, response.data)
// 			} else {
// 				if (response.data.msg == 'access_denied') {
// 					RefreshSocialToken(function (_data) {
// 						if (_data && _data.status) {
// 							console.log('refreshing Company Token...')
// 							cookie.set(
// 								'company_access_token',
// 								_data.access_token
// 							)
// 							cookie.set(
// 								'company_refresh_token',
// 								_data.refresh_token
// 							)
// 						}
// 						callback(new Error('access_denied'))
// 					})
// 				} else {
// 					callback(null, response.data.msg)
// 				}
// 			}
// 		})
// 		.catch(function (error) {
// 			console.log('%c' + error, 'color: red')
// 			callback(null)
// 		})
// }

//region data

function subRegion(data, parent_id) {
	var arr = []
	if (!Array.isArray(data)) return

	for (let i = 0; i < data.length; i++) {
		const item = data[i]
		if (item && item.parent_id == parent_id) {
			arr.push(dataReForm(data, item.id, item))
		}
	}
	// _.forEach(data, function(value) {
	//   if (value.parent_id == parent_id) {
	//     arr.push(dataReForm(data, value.id, value));
	//   }
	// });
	return arr
}

function dataReForm(data, parent_id, value) {
	const obj = {}
	// obj.hasCensus = value.hasCensus;
	// const id = parseInt(value.id, 10);
	// obj.value = id
	// obj.id = id;
	// obj.parent_id = parseInt(value.parent_id, 10);

	// obj.label = value.name;
	// if (!value.hasCensus) {
	// }
	Object.assign(obj, value, { label: value.name, value: value.id })
	let child = subRegion(data, parent_id)
	if (!_.isEmpty(child)) {
		Object.assign(obj, value, { children: child })
		// obj.children = child;
	}
	return obj
}

// permission data meta

export function metaPermissionData(data, singleData, type) {
	let newList = []

	if (_.isEmpty(data)) return []
	_.map(data, function (item, index) {
		let objd = {}
		objd.id = item.id
		objd.title = item.name

		let plainOptions = []
		let defaultCheckedList = _.isEmpty(singleData)
			? []
			: getDefaultVlauePermission(singleData, objd.id, type)
		let allCheckedList = []
		_.map(item.permission, function (item2, index2) {
			if (item2.status == '1') {
				let obj = {}
				obj.label = item2.name
				obj.value = item2.id.toString()
				plainOptions.push(obj)
				allCheckedList.push(item2.id.toString())
			}
		})

		objd.plainOptions = plainOptions
		objd.defaultCheckedList = defaultCheckedList
		objd.allCheckedList = allCheckedList

		newList[index] = objd
	})

	return newList
}

function getDefaultVlauePermission(data, id, type) {
	let arr = []
	let _data = ''
	if (type == '1') {
		//操作权限
		_data = _.isObject(data) ? data.permission_role : {}
		if (_.isEmpty(_data)) return []
		_.forIn(_data, function (value, key) {
			if (key.toString() == id.toString()) {
				arr = int2String(_data[key].list)
			}
		})
	} else {
		// 考勤规则管理范围
		_data = _.isObject(data) ? data.permission_data : {}
		_.map(_data, function (item, key) {
			if (item.id.toString() == id.toString()) {
				arr = int2String(item.list)
			}
		})
	}
	return arr
}

function int2String(arr) {
	return _.map(arr, function (n) {
		return n.toString()
	})
}

export function getSelectedTagId(arr) {
	let newarr = []
	_.map(arr, function (value, index) {
		newarr.push(value.id)
	})
	return _.isEmpty(newarr) ? '' : newarr.join(',')
}

export function getRadom() {
	let num = moment().millisecond()
	num++
	return num
}

export function formatPermissionDetailRangeScop(value) {
	if (!value) return []

	function cutdot(val) {
		if (val[val.length - 1] == ',') {
			return val.substr(0, val.length - 1)
		}
		return val
	}

	function transToSubComId(str) {
		var arr = str.split(',')
		arr.forEach(function (item, index) {
			arr[index] = '_' + arr[index]
		})
		return arr.join(',')
	}

	if (value.range_type == 3) {
		let arr = []
		if (!_.isEmpty(value.range)) {
			arr = _.isEmpty(value.range[0].scop) ? '' : value.range[0].scop
		}
		return arr
	}
	if (value.range_type == 4) {
		let obj = {}
		if (!_.isEmpty(value.range)) {
			_.map(value.range, function (item, index) {
				obj[item.type] = _.isEmpty(item.scop) ? [] : cutdot(item.scop)
				if (item.type == '9') {
					obj[item.type] = transToSubComId(obj[item.type])
				}
			})
		}
		return obj
	}
	return []
}

export function permissionRangeFormatEmp(list, scop) {
	let newList = {}
	if (scop[5] && !_.isEmpty(scop[5])) {
		newList['used_department'] = scop[5]
		newList['used_department_cn'] = '未知'
	}
	if (scop[6] && !_.isEmpty(scop[6])) {
		newList['used_employees'] = scop[6]

		let newArr = []
		const selectedArr = scop[6].split(',')
		_.map(selectedArr, function (item, index) {
			newArr.push(_.find(list, ['key', item.toString()]))
		})
		newList['used_employees_info'] = JSON.stringify(newArr)
	}

	return newList
}

export function homeDataFormatChart(data) {
	let genderObj = {}
	let arr = []

	if (_.isEmpty(data)) return {}
	if (!_.isEmpty(data.list)) {
		arr = data.list
		genderObj.legendName = getLegendName(data.list)
	}
	genderObj.total = data.total_count

	genderObj.data = arr
	return genderObj
}

export function homeDataFormatChartLine(data) {
	let obj = {}
	if (_.isEmpty(data)) return {}
	const xAxisArr = _.keys(data)
	const yAxisArr = _.values(data)

	obj.xAxisData = _.reverse(xAxisArr)
	obj.yAxisData = _.reverse(yAxisArr)

	return obj
}

export function homeDataFormatChartLineMuti(data) {
	let obj = {}
	if (_.isEmpty(data)) return {}
	const xAxisArr = _.keys(data)
	const yAxisArr = _.values(data)

	obj.xAxisData = xAxisArr
	obj.yAxisData = getyAxisData(yAxisArr)

	return obj
}

function getyAxisData(data) {
	let series = []
	let series0 = []
	let series1 = []
	let series2 = []
	_.map(data, function (item, index) {
		series0.push(item.abnormal_num)
		series1.push(item.leave_num)
		series2.push(item.outwork_num)
	})
	series.push(series0)
	series.push(series1)
	series.push(series2)
	return series
}

function getLegendName(data) {
	let legendArr = []
	_.map(data, function (item, index) {
		legendArr.push(item.name)
	})
	return legendArr
}

export function pieOptionsFormat(obj, chartOptions, title, name) {
	let chart = chartOptions
	//chart.legend.data = obj.legendName // 去掉 legend 说明
	chart.legend.data = obj.legendName
	chart.title.subtext = title + '：' + obj.total
	chart.series[0].data = obj.data
	chart.series[0].name = obj.name
	return chart
}

export function lineOptionsFormat(obj, chartOptions, name) {
	let chart = chartOptions
	chart.xAxis.data = obj.xAxisData
	chart.series[0].data = obj.yAxisData
	chart.series[0].name = name
	return chart
}

export function mutiLineOptionsFormat(obj, chartOptions, name) {
	let chart = chartOptions
	chart.xAxis.data = obj.xAxisData
	chart.series[0].data = obj.yAxisData[0]
	chart.series[1].data = obj.yAxisData[1]
	chart.series[2].data = obj.yAxisData[2]
	return chart
}

export function getServerStatus() {
	let serviceStatus = ENV.serviceStatus || cookie.get('serviceStatus')
	serviceStatus =
		typeof serviceStatus == 'string'
			? JSON.parse(serviceStatus)
			: serviceStatus
	const hasServiceStatus = _.hasIn(serviceStatus, '001')
	if (hasServiceStatus) {
		if (serviceStatus['001'] == 'passed') {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

export function changeHttpUrl(url) {
	if (_.isEmpty(url)) return
	return url.split('http:')[1] ? url.split('http:')[1] : ''
}

export function isTry() {
	const is_try = parseInt(ENV.is_try)
	const try_end = parseInt(ENV.try_end)
	const certification = parseInt(getENVValue('certification'))

	if (certification == 0) {
		if (is_try) {
			return true
		}
		return false
		// if( is_try && !try_end) {
		//   return true
		// }else if(!is_try && try_end) {
		//   return true
		// }
		// return false
	} else {
		return false
	}
}

export function timeTmp() {
	// const currentTmp = parseInt(moment().format('X'));
	// var dayTime = Math.floor((endTime-currentTmp)/86400) !='undefined' ? Math.floor((endTime-currentTmp)/86400) :0;
	// return dayTime;

	// const currentTmp = parseInt(moment().format('X'));
	// const endTime = ENV['try_end_at'];
	// var dayTime = Math.ceil((endTime-currentTmp)/86400) !='undefined' ? Math.ceil((endTime-currentTmp)/86400) :0;
	// console.log((endTime-currentTmp)/86400,currentTmp,endTime,dayTime)
	const dayTime = ENV['try_time_left']
	return dayTime
}

export function addIndex(arr) {
	if (_.isArray(arr)) {
		// if (arr.length == 0) {
		// 	return arr
		// }
		_.each(arr, (item, index) => {
			item['key'] = (index + 1).toString()
			item['rowKey'] = (index + 1).toString()
		})
		return arr
	}
	return arr
}

export function addUid(arr, type) {
	if (!_.isArray(arr)) return
	var newrr = []
	_.each(arr, (item, index) => {
		item['uid'] = item[type]
		newrr.push(item)
	})

	return newrr
}

//补0操作
export function getFormatTime(num) {
	if (parseInt(num) < 10) {
		num = '0' + num
	}
	return num
}

//指定范围内的年份
export function fromYear() {
	var now = []
	for (var i = 70; i <= new Date().getYear() + 100; i++) {
		now.push(1900 + i)
	}
	return now
}

// //获取浏览器参数
// export function GetQueryString(name) {
//  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//  var r = window.location.search.substr(1).match(reg);
//  if (r != null)
//    return unescape(r[2]);
//  return null;
// }

//获取本周第一天和最后一天
export function getDays() {
	var now = new Date()
	var day = now.getDay()
	var week = '7123456'
	var first = 0 - week.indexOf(day)
	var f = new Date()
	f.setDate(f.getDate() + first)
	var last = 6 - week.indexOf(day)
	var l = new Date()
	l.setDate(l.getDate() + last)
	return [f, l]
}

export function splitObject(obj, parts) {
	const left = {}
	const right = {}
	_.keys(obj).forEach((k) => {
		if (parts.indexOf(k) !== -1) {
			left[k] = obj[k]
		} else {
			right[k] = obj[k]
		}
	})

	return [left, right]
}

//判断一个字符串是不是时间类型
export function strDateTime(str) {
	if (!str) return false
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
	if (r == null) return false
	var d = new Date(r[1], r[3] - 1, r[4])
	return (
		d.getFullYear() == r[1] &&
		d.getMonth() + 1 == r[3] &&
		d.getDate() == r[4]
	)
}

//添加千分位
export function comdify(n) {
	var re = /\d{1,3}(?=(\d{3})+$)/g
	var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
		return s1.replace(re, '$&,') + s2
	})
	return n1
}

/**
 * [obj2Arr 将对象转换成数组格式]
 * @param  {[type]} data [数据源]
 * @return {[type]}      [description]
 */
export function obj2Arr(data) {
	if (_.isEmpty(data)) return []

	let newArr = []
	_.mapValues(data, function (o) {
		newArr.push(o)
	})
	return newArr
}

/**
 * [flat2Tree 扁平数据转树状结构数据]
 * @param  {[type]} data   [数据源]
 * @param  {[type]} config [配置]
 * @return {[type]}        [description]
 */
export function flat2Tree(data, config) {
	if (!_.isArray(data)) return []

	let id = config.id || 'id',
		pid = config.pid || 'parent_id',
		children = config.children || 'children'

	let idMap = [],
		jsonTree = []

	_.forEach(data, (v) => {
		idMap[v[id]] = v
	})

	_.forEach(data, (v) => {
		let parent = idMap[v[pid]]
		if (parent) {
			!parent[children] && (parent[children] = [])
			v.key = v.id.toString()
			parent[children].push(v)
		} else {
			v.key = v.id.toString()
			jsonTree.push(v)
		}
	})

	return jsonTree
}

/**
 * [structureDataTransfor 组织架构数据转换]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function structureDataTransfor(data) {
	const newData = _.cloneDeep(data)
	let arr = []
	let result = []
	arr = obj2Arr(newData)
	result = flat2Tree(arr, {})
	return result
}

/**
 * 正式环境下改变后台返回的地址 转为相对地址
 * @param  {[type]} url        后台返回url
 * @param  {[type]} defalutUrl 默认的url占位图
 * @return {[type]}            [description]
 */
export function changeUrlToRelationUrl(url, defalutUrl = '') {
	if (_.isEmpty(url)) return defalutUrl
	return url.split('http:')[1] ? url.split('http:')[1] : ''
}

// export function tableColumns(columns){
//   var newColumns = columns && _.isArray(columns) && columns.length > 0 ?
//     _.each(columns, (item, index) => {
//        if(item && item.dataIndex && item.dataIndex == 'serial'){
//           columns.splice(index,1)
//           return columns
//        }else{
//           return columns
//        }
//     })
//     : []

//    return newColumns
// }

/**
 * 获取url中的参数
 * @param name 参数的名称
 * @returns string
 */
//获取浏览器参数
export function GetQueryString(name) {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	let r = window.location.search.substr(1).match(reg)
	if (r != null) {
		return decodeURI(r[2])
	}
	return null
}

//table统一添加去掉字段
export function tableColumns(columns) {
	var newColumns =
		columns && _.isArray(columns) && columns.length > 0
			? _.each(columns, (item, index) => {
				if (item && item.dataIndex && item.dataIndex == 'serial') {
					columns.splice(index, 1)
					return columns
				} else {
					return columns
				}
			})
			: []

	return newColumns
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
export function isInArray(arr, value) {
	for (let i = 0; i < arr.length; i++) {
		if (value === arr[i]) {
			return true
		}
	}
	return false
}

export function workFlowSitesFormat(data) {
	const newData = _.cloneDeep(data)
	_.map(newData, (item, index) => {
		if (item.first == '0') {
			item.second = '0'
		}
	})
	return newData
}

/**
 * 暂时没用上
 * @param  {[type]} columns [description]
 * @return {[type]}         [description]
 */
export function createKeyByColumns(columns) {
	if (columns.length) {
		return _.map(columns, (value, index) => {
			const data_now = new Date().getTime() + index
			let new_obj = {}
			const new_value = _.cloneDeep(value)
			new_obj['key'] = data_now
			new_obj = _.assign({}, new_value, new_obj)

			if (_.has(value, 'children') && value.children.length) {
				createKeyByColumns(value.children)
			} else {
			}

			return new_obj
		})

		for (var i = 0; i < columns.length; i++) {
			const data_now = new Date().getTime() + i
			let new_obj = {}
			new_obj['key'] = data_now
			new_obj = _.assign({}, new_obj, columns[i])
			if (_.has(columns[i], 'children') && columns[i].children.length) {
				createKeyByColumns(columns[i].children)
			}
		}
	} else {
		return []
	}
}

/**
 * 动态创建key值
 * @param  {[type]} init [description]
 * @return {[type]}      [description]
 */
export function createKey() {
	let i = 1
	i++
	return function () {
		const data_now = new Date().getTime() + i

		return data_now
	}
}

/**
 * 判断是否为空 {} [] [[]] '' null undefined 0
 * @return {Boolean} [description]
 */
export function isEmpty(data) {
	if (_.isEmpty(data)) {
		return true
	}
}

/**
 * 操作人信息返回
 * @return {[type]} [description]
 */
export function getOperatorInfo() {
	const acl = getENVValue('acl')
	if (_.isEmpty(acl)) return {}
	const params = {
		operator_uuid: getENVValue('uuid'),
		operator_id: getENVValue('uuid'),
		operator_role: acl.name,
		operator_name: getENVValue('name'),
	}
	return params
}

/**
 * 获取默认的接口参数
 * 使用方法：
 * getParams()() 如果是使用 用户授权
 * getParams()(true) 如果是使用企业授权
 * @param  {Boolean} isType 是否有接口权限限制
 *
 * @return {[type]}         [description]
 */
export function getParams(isType = true) {
	const permissionParams = isType ? {} : initPermissionRole()
	return function (useCompanyAccess = false) {
		const params = {
			access_token: useCompanyAccess
				? cookie.get('company_access_token')
				: cookie.get('access_token'),
			company_id: cookie.get('company_id'),
			langType: cookie.get('langType'),
		}
		return _.assign({}, params, permissionParams)
	}
}

export function json2Url(data, url) {
	var s = '',
		name,
		key
	for (var p in data) {
		if (!data[p]) {
			return null
		}
		if (data.hasOwnProperty(p)) {
			name = p
		}
		key = data[p]
		s += '&' + name + '=' + encodeURIComponent(key)
	}

	const params = s.substring(1, s.length)
	if (url) {
		return url + params
	}
	return params
}

/**
 * Treeselect的value的值（数组,多选）
 * @param arr
 * @returns {{depid: Array, sub_id: Array}}
 */
export function dealSelectSubcomId(arr) {
	let resultObj = { depid: [], sub_id: [], sub_id_with_dash: [] }
	if (arr.length == 0) {
		return resultObj
	}
	if (!(arr instanceof Array)) {
		console.log('dealSelectSubcomId函数参数为数组！')
		return resultObj
	}
	arr.forEach(function (item, index) {
		if (item.toString().includes('_')) {
			resultObj.sub_id.push(item.replace('_', ''))
			resultObj.sub_id_with_dash.push(item)
		} else {
			resultObj.depid.push(item)
		}
	})
	return resultObj
}

/**
 * Treeselect的value的值（单选）
 * @param arr
 * @returns {{va}}
 */
export function dealSelectSubcomIdSingle(val) {
	let resultObj = { depid: '', sub_id: '' }
	if (!val) {
		return resultObj
	}
	if (val.toString().includes('_')) {
		resultObj.sub_id = val.replace('_', '')
	} else {
		resultObj.depid = val
	}
	return resultObj
}

// 获取学历的文本
export function cultureText(str) {
	switch (parseInt(str)) {
		case 1:
			return getLangWordText('common.doctor', '博士')
		case 2:
			return getLangWordText('common.master', '硕士')
		case 3:
			return getLangWordText('common.Undergraduate', '本科')
		case 4:
			return getLangWordText('common.Specialty', '大专')
		case 5:
			return getLangWordText('common.highSchool', '高中')
		case 6:
			return getLangWordText('common.JuniorMiddleSchool', '初中')
		case 7:
			return getLangWordText('common.PrimarySchool', '小学')
		default:
			return getLangWordText('common.temporaryEmpty', '暂无')
	}
}

/**
 * 获取当前的语言类型的文字
 * @returns {string}
 */

export function getLangText() {
	let langType = parseInt(cookie.get('langType'))
	switch (langType) {
		case 1:
			return '简体中文'
		case 2:
			return '繁體中文'
		case 3:
			return 'English'
		default:
			return '简体中文'
	}
}

/**
 * @param 获取语言字段的文字(此方法仅可在组件内部使用，外部无法使用)
 * @param param
 * @param next
 * @returns {Function}
 */
export function getLangWordText(param, defaultVal = '') {
	let result = ''
	if (window.appLocale) {
		result = DeepGet(appLocale, ['messages', param])
		if (!result) {
			console.log(
				'Can not find message by ' +
				param +
				', using ' +
				defaultVal +
				' as default vaule'
			)
			return defaultVal
		}
		return result
	} else {
		// console.log('appLocale尚未定义', param);
		return defaultVal
	}
}

export function getLangWordTextFu(param, defaultVal = '') {
	return getLangWordText(param, (defaultVal = ''))
}

/**
 * @param 拼接URL中的字符串
 * @param param
 * @returns {String}
 */
export function getUrlParamStr(param) {
	let str = ''
	for (let key in param) {
		str += `${key}=${param[key]}&`
	}
	return str.substr(0, str.length - 1)
}

/**
 * @param 获取语言字段的langType
 * @param param
 * @param next
 * @returns {Function}
 */
export function getLangTypeCookie() {
	return cookie.get('langType') || 0
}

//过滤textarea输入的换行字符
export function replaceTextarea(str) {
	var reg = new RegExp('\n', 'g')
	// var reg1 = new RegExp(" ", "g");

	str = str.replace(reg, '<br/>')
	// str = str.replace(reg1, "<p>");

	return str
}
/**
 * @param 下拉选项
 * @param param
 * @param next
 * @returns {Function}
 */
export function designationQuery(data) {
	if (_.isArray(data)) {
		return data.map(function (item, index) {
			return (
				<Option key={item.key} value={item.id}>
					{item.designation}
				</Option>
			)
		})
	}
	return null
}
/**
 * @param 职位多选
 * @param param
 * @param next
 * @returns {Function}
 */
export function treeDataDesignation(data) {
	if (_.isArray(data)) {
		return data.map(function (item, index) {
			return {
				title: item.designation,
				value: item.id + '',
				key: item.id,
			}
		})
	}
	return null
}
/**
 * @param 职级多选
 * @param param
 * @param next
 * @returns {Function}
 */
export function treeDataJobLevel(data) {
	if (_.isArray(data)) {
		return data.map(function (item, index) {
			return {
				title: item.job_level_name,
				value: item.id + '',
				key: item.id,
			}
		})
	}
	return null
}
/**
 * @param 职类多选
 * @param param
 * @param next
 * @returns {Function}
 */
export function treeDataJobClass(data) {
	if (_.isArray(data)) {
		return data.map(function (item, index) {
			return {
				title: item.name,
				value: item.id + '',
				key: item.id,
			}
		})
	}
	return null
}
/**
 * @param 是否为 >0 的数组
 * @param param
 * @param next
 * @returns {Function}
 */
export function isGreatArr(arr) {
	return _.isArray(arr) && arr.length > 0
}

// 员工模块单独传的  过滤 在职 离职 已离职
export function employeeParameterAlone(fn) {
	return {
		entrance: fn().employee.entranceData
			? fn().employee.entranceData.entrance
			: '',
		uuid: fn().employee.entranceData
			? fn().employee.entranceData.entrance_uuid
			: '',
	}
}

// 截取字符串长度
export function getSubString(str, len, ext) {
	if (!str) return false
	if (str.length > len) {
		return str.substring(1, len) + (ext || '')
	}
	return str
}
//根据数组某一个属性大小 进行升序&降序排序
export function compareArr(property, desc) {
	return function (a, b) {
		var value1 = a[property]
		var value2 = b[property]
		if (desc == true) {
			// 升序排列
			return value1 - value2
		} else {
			// 降序排列
			return value2 - value1
		}
	}
}

// 根据身份证号，获取年龄
export function getAge(idCard) {
	if (!idCard) return
	var strBirthday = idCard.substr(6, 8)
	strBirthday =
		strBirthday.substr(0, 4) +
		'-' +
		strBirthday.substr(4, 2) +
		'-' +
		strBirthday.substr(6, 2)
	var returnAge
	var strBirthdayArr = strBirthday.split('-')
	var birthYear = strBirthdayArr[0]
	var birthMonth = strBirthdayArr[1]
	var birthDay = strBirthdayArr[2]

	var d = new Date()
	var nowYear = d.getFullYear()
	var nowMonth = d.getMonth() + 1
	var nowDay = d.getDate()

	if (nowYear == birthYear) {
		returnAge = 0 //同年 则为0岁
	} else {
		var ageDiff = nowYear - birthYear //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1
				} else {
					returnAge = ageDiff
				}
			} else {
				var monthDiff = nowMonth - birthMonth //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1
				} else {
					returnAge = ageDiff
				}
			}
		} else {
			returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	return returnAge //返回周岁年龄
}

// 修改Table 滚动效果（停止滚动时隐藏分际线）
export function MyTableScrollEffect() {
	let t = null
	let tout = null
	const tableBody = window.document.querySelector('.ant-table-body')
	const dom = window.document.querySelector('.ant-table')
	const middle = 'ant-table-scroll-position-middle'
	if (!dom || !dom.classList) return null
	const classList = dom.classList
	function isLeft() {
		return classList.contains('ant-table-scroll-position-left')
	}
	function isRight() {
		return classList.contains('ant-table-scroll-position-right')
	}
	tableBody
		? (tableBody.onscroll = function (e) {
			if (!tout) {
				tout = setTimeout(() => {
					t && clearInterval(t)
					console.log('tout')
					if (
						!isLeft() &&
						!isRight() &&
						!classList.contains(middle)
					) {
						classList.add(middle)
					} else {
						t = setInterval(() => {
							if (
								classList.contains(
									'ant-table-scroll-position-middle'
								)
							) {
								classList.remove(
									'ant-table-scroll-position-middle'
								)
							}
							clearInterval(t)
							console.log('t')
							t = null
						}, 500)
					}
					clearTimeout(tout)
					tout = null
				}, 100)
			}
		})
		: null
}

// 通过id 获取城市名称
export function getRegionNameById(residences = [], id, type) {
	let res = type === 'Array' ? [] : ''
	if (!id) return res
	for (let i = residences.length - 1; i >= 0; i--) {
		if (residences[i].value == id) {
			if (type === 'Array') {
				res = [residences[i].value]
			} else {
				res = residences[i].label
			}
			break
		}
		const list = residences[i].children
		if (Array.isArray(list)) {
			const index = list.findIndex((item) => item.value == id)
			if (index > -1) {
				if (type === 'Array') {
					res = [residences[i].value, list[index].value]
				} else {
					res = `${residences[i].label}-${list[index].label}`
				}
				break
			}
		}
	}
	return res
}
export function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

//获取员工选择组件的 tag值（key, uuid, fullName ）
export function getSelectedTagIdAndName(arr) {
	let newarr = []
	_.map(arr, function (value, index) {
		var obj = {
			id: value.id,
			key: value.id,
			uuid: value.uuid,
			fullName: value.fullName,
		}
		newarr.push(obj)
	})
	return newarr
}

export function UserParams() {
	const defalutP = {
		access_token: cookie.get('access_token'),
		company_uuid: cookie.get('company_uuid'),
		company_id: cookie.get('company_id'),
		langType: cookie.get('langType'),
		uuid: cookie.get('employees_uuid'),
	}
	return defalutP
}

export function UserParamsUuid() {
	const defalutP = {
		access_token: cookie.get('access_token'),
		company_uuid: cookie.get('company_uuid'),
		company_id: cookie.get('company_id'),
		langType: cookie.get('langType'),
		uuid: cookie.get('account_uuid'),
	}
	return defalutP
}

export function CeoUserParams(status) {
	const acl = getENVValue('acl')
	const defalutP = {
		access_token: cookie.get('access_token'),
		company_uuid: cookie.get('company_uuid'),
		company_id: cookie.get('company_id'),
		langType: cookie.get('langType'),
		uuid: cookie.get('employees_uuid'),
	}
	if (!_.isEmpty(acl) && !status) {
		defalutP.platform_switch = 1
		defalutP.permission = parseInt(acl.is_all) ? 1 : 0
		defalutP.range_type = parseInt(acl.range_type)
			? acl.range_type
			: (defalutP.range_value = _.isEmpty(acl.range)
				? 'null'
				: JSON.stringify(formatGetPermissionRange(acl.range)))
	}
	return defalutP
}

export function getWeekDay(date = '') {
	const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	const day = new Date(date).getDay()
	const res = week[day]
	return res
}
export function getAsyncComponent(
	load,
	currentOpenKeys,
	currentKeyProps,
	currentKeyThird,
	otherProps = {},
) {
	return class AsyncComponent extends React.PureComponent {
		componentDidMount() {
			// 在高阶组件 DidMount 时才去执行网络加载步骤
			load().then(({ default: component }) => {
				console.log('impot succes !!!!!!!!!!!!!!!!!!!')
				// 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
				this.setState({
					component,
				})
			})
		}
		render() {
			const { component } = this.state || {}
			// component 是 React.Component 类型，需要通过 React.createElement 生产一个组件实例
			return component
				? React.createElement(component, {
					currentOpenKeys,
					currentKeyProps,
					currentKeyThird,
					...this.props,
					...otherProps
				})
				: null
		}
	}
}
export function ServerNotification(_message, error = true) {
	if (!_message) return
	var notifType = null,
		emotion = null
	if (error) {
		notifType = 'error'
		emotion = <FrownOutlined />
	} else {
		notifType = 'success'
		emotion = <SmileOutlined />
	}

	if (_message instanceof Object) {
		return
	} else {
		_message = postErrorByMsg(_message)

		notification[notifType]({
			message: _message,
			description: emotion,
			duration: 4,
		})
	}
}
export function makePureObjectString(obj) {
	const newObj = { ...obj }
	for (let key in obj) {
		if (obj[key] === '' || obj[key] === null) {
			delete newObj[key]
		}
	}
	return newObj
}
export class StringUtil {
	static format(format, ...args) {
		for (let i = 0; i < args.length; ++i)
			format = format.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i])
		return format
	}
}
export function formatText(text) {
	return text || '--'
}
/*  
 *返回准确的数据类型
 *params 任何参数皆可
 *return 结果为其一：Number,Null,Undefined,Boolean,Array,String,Object,Symbol,Function,Date,
 Error,Map,RegExp,Set,WeakMap,ArrayBuffer,DataView,
 Float32Array,Float64Array,Int8Array,Int16Array,Int32Array,
 Uint8Array,Uint8ClampedArray,Uint16Array,Uint32Array
*/
export function exactType(params) {
	//对字符串进行了截取，方便查看结果，例如： [object Array] -> Array
	return Object.prototype.toString.call(params).slice(8, -1)
}
// 计算截止剩余时间
export function formatTime(str) {
	if (str == '') return '--'
	var date = new Date(str)
	var now = new Date()
	var mss = date.getTime() - now.getTime() // 毫秒值
	if (mss <= 0) {
		return '--'
	} else {
		mss = mss / 1000
		var days = parseInt(mss / (60 * 60 * 24))
		var hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60))
		var minutes = parseInt((mss % (60 * 60)) / 60)
		var seconds = parseInt(mss % 60)
		var res = ''
		if (days > 0) {
			res += days + '天'
		}
		if (hours > 0) {
			res += hours + '小时'
		}
		if (minutes > 0) {
			res += minutes + '分钟'
		}
		if (seconds > 0) {
			res += seconds + '秒'
		}
		return (
			days +
			' 天 ' +
			hours +
			' 小时 ' +
			minutes +
			' 分钟 ' +
			seconds +
			' 秒 '
		)
	}
}
// 格式化附加指标分值上下限
export function makeRangeStr(range = {}) {
	const start = range.first == 1 ? '(' : '['
	const end = range.second == 1 ? ')' : ']'
	const str =
		start +
		(range.first_value || '0') +
		',' +
		(range.second_value || '0') +
		end
	return str
}
export function caseTime(type) {
	switch (String(type)) {
		case '1':
			return '年度'
		case '2':
			return '季度'
		case '3':
			return '月度'
		case '4':
			return '自定义'
		default:
			return '未知'
	}
}

// 考核周期-文字处理
export function getPeriodName(row = {}) {
	const { period, param1 = '' } = row
	let res = ''
	switch (String(period)) {
		case '1':
			res = `年度(${param1})`
			break
		case '2': {
			const season = param1.split('-')
			if (season && season.length) {
				const [year, index] = season
				const seasonText = [
					'',
					'第一季度',
					'第二季度',
					'第三季度',
					'第四季度',
				]
				res = `季度(${year}年${seasonText[index]})`
			} else {
				res = `季度(${param1})`
			}
			break
		}
		case '3':
			res = `月度(${param1})`
			break
		case '4':
			res = `自定义(${param1}~${row.param2 || ''})`
			break
		default:
			res = `--`
			break
	}
	return res
}
// 是否为常规指标
export function isCommonQuota(row) {
	return (
		row &&
		(!row.range ||
			row.range == '{}' ||
			(typeof row.range == 'object' && !row.range.first))
	)
}

/**
 * *窗口打印(无须刷新)
 * 参数： id 必须，cb 回调函数，可选
 *
 */
export function purePrint(id, cb, delay = 1000) {
	// 获取要打印的dom id
	if (typeof id === 'undefined') {
		console.error('缺少必须的参数 id')
		return false
	}
	const printContent = document.getElementById(id)
	if (!printContent) {
		console.error('缺少需要打印的页面节点，请检查传入的id')
		return false
	}
	// 检查是否存在 id 为printFrame的元素
	let printFrame = document.getElementById('printFrame')
	// 如果存在，清空内容，为了后面添加打印内容做准备
	if (printFrame) {
		printFrame.contentDocument.body.innerHTML = ''
	} else {
		// 如果不存在，添加一个id 为printFrame 的 iframe
		printFrame = document.createElement('IFRAME')
		printFrame.id = 'printFrame'
		printFrame.style =
			'visibility: visible;width:0;height:0;position: absolute;top:0;left:0'
		// printFrame.style="visibility: visible;width:100%;height:100vh;position: absolute;top:0;left:0";
		printFrame.className = 'printFrame'
		document.body.appendChild(printFrame)
	}
	// 构造打印内容的html, 包括innerHTML,style,className
	const content = document.createElement('DIV')
	content.innerHTML = printContent.innerHTML
	content.style = printContent.style
	content.className = printContent.className
	// 添加当前窗口的样式信息到 printFrame，保证样式一致
	const headStyle = document.head.innerHTML
	printFrame.contentDocument.head.innerHTML = headStyle
	printFrame.contentDocument.body.style = 'background: #fff'
	printFrame.onload = function () {
		console.log('ruok????')
	}
	printFrame.contentDocument.body.appendChild(content)
	setTimeout(() => {
		printFrame.contentWindow.print()
		cb && cb()
	}, delay)
}

/**
 * * 组织树仅显示传入的数组， 其它隐藏
 *   originList 完整的组织树
 *   newList： 需要显示的数据
 */
export function getShowTree(originList, newList) {
	if (!originList) return
	if (!newList) return originList

	let o_list = _.cloneDeep(originList)

	let ids = newList.map((item) => item.id)

	let expandedKeys = ids.map((item) => {
		return getParentKey(item, o_list)
	})

	expandedKeys = expandedKeys.concat(ids)
	//去掉相同的值和undifined的值
	expandedKeys = expandedKeys.filter(
		(item, i, self) => item && self.indexOf(item) === i
	)

	var list = getSearchTree(expandedKeys, o_list)
	// console.log("list: ", list);

	//如果要显示的节点没有父级节点， 但是父级节点必须在组织图里面展示出来， 则需要disable=false, 不让选择
	var loop = (list) => {
		list.forEach((item, index) => {
			if (_.indexOf(ids, item.key) <= -1) {
				item.disabled = true
			}
			if (item.children) {
				loop(item.children)
			}
		})
	}
	loop(list)

	return list
}

let getParentKey = (key, tree) => {
	let _this = this
	let parentKey
	for (let i = 0; i < tree.length; i++) {
		const node = tree[i]
		if (node.children) {
			if (node.children.some((item) => item.key == key)) {
				parentKey = node.key
			} else if (getParentKey(key, node.children)) {
				parentKey = getParentKey(key, node.children)
			}
		}
	}
	return parentKey
}

let getSearchTree = (keys, treeData) => {
	if (!keys || keys.length == 0) return treeData

	var deal = (nodes) => {
		// 如果已经没有节点了，结束递归
		if (!(nodes && nodes.length)) {
			return []
		}
		const newChildren = []
		for (const node of nodes) {
			if (_.indexOf(keys, node.key) > -1) {
				// 如果节点符合条件，直接加入新的节点集
				newChildren.push(node)
				node.children = deal(node.children)
			} else {
				// 如果当前节点不符合条件，递归过滤子节点，
				// 把符合条件的子节点提升上来，并入新节点集
				newChildren.push(...deal(node.children))
			}
		}
		return newChildren
	}
	return deal(treeData)
}

/**
 * * 组织树仅显示传入的数组， 其它隐藏, 获取需要显示的key
 *   originList 完整的组织树
 *   newList： 需要显示的数据
 */
export function getDefaultExpandedKeys(originList, newList) {
	if (!originList) return []
	let expandedKeys = []
	if (newList && newList.length > 0) {
		let o_list = _.cloneDeep(originList)
		let ids = newList.map((item) => item.id)
		expandedKeys = ids.map((item) => {
			return getParentKey(item, o_list)
		})
		expandedKeys = expandedKeys.concat(ids)
		//去掉相同的值和undifined的值
		expandedKeys = expandedKeys.filter(
			(item, i, self) => item && self.indexOf(item) === i
		)
	} else {
		var loop = (list) => {
			list.forEach((item, index) => {
				expandedKeys.push(item.key)
				if (item.children) {
					loop(item.children)
				}
			})
		}
		loop(originList)
	}
	// console.log("expandedKeys: ", expandedKeys);
	return expandedKeys
}

export const safeJSONParse = (data, defaultValue) => {
	let result
	try {
		result = JSON.parse(data)
	} catch (error) {
		result = defaultValue
	}
	return result
}

export const getSearchParams = (search, defaultVallue) => {
	if (!search) return defaultVallue
	const arr = search.replace('?', '').split('&')
	let obj = {}
	arr.forEach(item => {
		let k = item.split('=')
		obj[k[0]] = obj[k[1]]
	})
	return obj
}

export function getPagination({ total = 0, current_page = 1, per_page = 10 }) {
	return {
		total: +total,
		current: +current_page,
		pageSize: +per_page
	}
}