/*
 * @Author: kevin.he 
 * @Date: 2021-11-19 15:09:52 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-19 15:50:52
 * 配置菜单列表
 */
const menuList = [
    {
        key: 'sub01',
        link: '/processes',
        title: '流程设计',
        id: '',
        children: [

        ]
    },
    {
        key: 'sub02',
        link: '/form-list',
        title: '表单设计',
        id: '',
        children: [

        ]
    },
    {
        key: 'sub03',
        link: '',
        title: '流程管理',
        id: '',
        children: [
            {
                key: 'sub03_01',
                link: '',
                title: '流程任务',
                id: '',
            },
            {
                key: 'sub03_02',
                link: '',
                title: '历史任务',
                id: '',
            }
        ]
    },
    {
        key: 'sub04',
        link: '',
        title: '系统管理',
        id: '',
        children: [
            {
                key: 'sub04_01',
                link: '',
                title: '租户管理',
                id: '',
            },
            {
                key: 'sub04_02',
                link: '',
                title: '管理员',
                id: '',
            },
            {
                key: 'sub04_03',
                link: '',
                title: '权限组',
                id: '',
            }
        ]
    }
]
export default menuList;