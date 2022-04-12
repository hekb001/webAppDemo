
export default {
  fontSizes: [{
    name: '初号',
    size: 42
  }, {
    name: '小初',
    size: 36
  }, {
    name: '一号',
    size: 26
  }, {
    name: '小一',
    size: 24
  }, {
    name: '二号',
    size: 22
  }, {
    name: '小二',
    size: 18
  }, {
    name: '三号',
    size: 16
  }, {
    name: '小三',
    size: 15
  }, {
    name: '四号',
    size: 14
  }, {
    name: '小四',
    size: 12
  }, {
    name: '五号',
    size: 10.5
  }, {
    name: '小五',
    size: 9
  }],
  fontFamilies: [{
    name: 'Araial',
    family: 'Arial, Helvetica, sans-serif'
  }, {
    name: 'Georgia',
    family: 'Georgia, serif'
  }, {
    name: 'Impact',
    family: 'Impact, serif'
  }, {
    name: 'Monospace',
    family: '"Courier New", Courier, monospace'
  }, {
    name: 'Tahoma',
    family: "tahoma, arial, 'Hiragino Sans GB', 宋体, sans-serif"
  }],
}

const borderSetting = [
  {
    label: '边框',
    key: 'border',
    desc: ' ',
    type: 'checkboxGroup',
    dataSource: [
      {label: '上', value: 'top'},
      {label: '下', value: 'bottom'},
      {label: '左', value: 'left'},
      {label: '右', value: 'right'}
    ]
  },
  {
    label: '边框样式',
    key: 'borderStyle',
    desc: ' ',
    type: 'select',
    dataSource: [
      {label: '实线', value: 'solid'},
      {label: '虚线', value: 'dashed'},
    ]
  },
  {
    label: '边框宽度',
    key: 'borderWidth',
    desc: ' ',
    type: 'selectAuto',
    dataSource: ['1','2','3','4']
  },
  {
    label: '边框颜色',
    key: 'borderColor',
    desc: ' ',
    type: 'sketchPicker',
  },
];

const columnDataSource = [
  {label: '一行一列', value: '1'},
  {label: '一行二列', value: '2'},
  {label: '一行三列', value: '3'},
  {label: '一行四列', value: '4'},
  {label: '一行五列', value: '5'}
];
const columnWidthDataSource = [
  {label: '100%', value: '100%'},
  {label: '50%', value: '50%'},
  {label: '33.33%', value: '33.33%'},
  {label: '25%', value: '25%'},
  {label: '20%', value: '20%'}
];

const columnWidthDataSourceSetting = [
  {
    label: '独占一行',
    key: 'oneSelf',
    desc: ' ',
    type: 'checkbox',
  },
  {
    label: '元素宽度',
    key: 'wrapWidth',
    desc: ' ',
    type: 'selectAuto',
    hasClear: true,
    dataSource: columnWidthDataSource
  }
];

const commonSetting = [
  {label: '表单id', key: 'id', desc: '数据存储的名称/英文/必填 ', type: 'input', disabled: true},
  {label: '表单名称', key: 'formName', desc: ' ', type: 'input'},
  {label: '标签', key: 'labeltext', desc: ' ', type: 'input'},
  {label: '说明', key: 'description', desc: ' ', type: 'input',placeholder:'标签说明'},
    ...columnWidthDataSourceSetting,
  {label: '标签宽度', key: 'labelwidth', desc: ' ', type: 'input',placeholder:'单位px'},
  {label: '', key: 'islabelnullwidth', desc: ' ', type: 'checkbox', text: '标签内容为空时宽度为0'},
  ...borderSetting,
  {label: '隐藏', key: 'isHide', type: 'checkbox'},
  {label: '显隐规则', key: 'hideRule', type: 'hideRule'},
];

export const formSetting = [
  {
    label: '整体布局',
    key: 'column',
    type: 'select',
    dataSource: columnDataSource,
  },
  {label: '标签宽度', key: 'labelwidth', desc: ' ', type: 'input',},
  {
    label: '标签展示模式',
    key: 'displayType',
    desc: ' ',
    type: 'select',
    dataSource: [
      {label: '单行显示', value: 'row'},
      {label: '换行显示', value: 'column'},
    ]},
  {
    label: '标签显示位置',
    key: 'textAlign',
    desc: ' ',
    type: 'select',
    dataSource: [
      {label: '居左', value: 'left'},
      {label: '居中', value: 'center'},
      {label: '居右', value: 'right'},
    ]},
  ...borderSetting,
];

export const addonSetting = [
  {label: '前缀', key: 'addonTextBefore', type: 'input'},
  {label: '后缀', key: 'addonTextAfter', type: 'input'},
  {label: '单位', key: 'unit', type: 'input'},
];

export const elements = [
  {
    text: '纯文本',
    type: 'text',
    schema: {
      value: '',
      type: 'text',
      wrapstyle: {},
    },
    setting: [
      {label: '表单id', key: 'id', desc: '数据存储的名称/英文/必填 ', type: 'input', disabled: true},
      {label: '表单名称', key: 'formName', desc: ' ', type: 'input'},
      ...columnWidthDataSourceSetting,
      {label: '值', key: 'value', desc: ' ', type: 'input'},
      ...borderSetting,
      {label: '显隐规则', key: 'hideRule', type: 'hideRule'},
    ],
  },
  {
    text: '文本框',
    type: 'input',
    schema: {
      labeltext: '文本框',
      type: 'input',
      wrapstyle: {},
    },
    setting: [
      ...commonSetting,
      {label: '正则表达式', key: 'reg', type: 'input'},
      {label: '只读', key: 'disabled', desc: ' ', type: 'checkbox'},
      {label: '多行文本', key: 'isRows', desc: ' ', type: 'checkbox'},
      {label: '显示行数', key: 'rows', desc: ' ', type: 'input'},
      ...addonSetting,
    ],
  },
  {
    text: '下拉选择',
    type: 'select',
    schema: {
      labeltext: '下拉选择',
      type: 'select',
      mode: 'single',
      wrapstyle: {},
      dataSource: [
        {label: '值1', value: '01'},
        {label: '值2', value: '02'}
      ]
    },
    setting: [
      ...commonSetting,
      {label: '只读', key: 'disabled', desc: ' ', type: 'checkbox'},
      {
        label: '选择模式',
        key: 'mode',
        desc: ' ',
        type: 'select',
        dataSource: [
          {label: '单选', value: 'single'},
          {label: '多选', value: 'multiple'},
          {label: '标签', value: 'tag'}
        ]
      },
      {label: '选项', key: 'dataSource', desc: ' ', type: 'optionList'},
      ...addonSetting
    ],
  },
  {
    text: '单选框组',
    type: 'radioGroup',
    schema: {
      labeltext: '单选框组',
      type: 'radioGroup',
      wrapstyle: {},
      dataSource: [
        {label: '值1', value: '01'},
        {label: '值2', value: '02'}
      ]
    },
    setting: [
      ...commonSetting,
      {label: '只读', key: 'disabled', desc: ' ', type: 'checkbox'},
      {
        label: '显示方式',
        key: 'itemDirection',
        desc: ' ',
        type: 'radioGroup',
        dataSource: [
          {label: '平铺', value: 'hoz'},
          {label: '换行', value: 'ver'}
        ]
      },
      {label: '选项', key: 'dataSource', desc: ' ', type: 'optionList'},
    ],
  },
  {
    text: '复选按钮',
    type: 'checkbox',
    schema: {
      labeltext: '复选按钮',
      type: 'checkbox',
      wrapstyle: {},
    },
    setting: [
      ...commonSetting,
      {label: '只读', key: 'disabled', desc: ' ', type: 'checkbox'},
    ],
  },
  {
    text: '复选按钮组',
    type: 'checkboxGroup',
    schema: {
      labeltext: '复选按钮组',
      type: 'checkboxGroup',
      showtype: 'ver',
      wrapstyle: {},
      dataSource: [
        {label: '值1', value: '01'},
        {label: '值2', value: '02'}
      ]
    },
    setting: [
      ...commonSetting,
      {label: '只读', key: 'disabled', desc: ' ', type: 'checkbox'},
      {
        label: '显示方式',
        key: 'itemDirection',
        desc: ' ',
        type: 'radioGroup',
        dataSource: [
          {label: '平铺', value: 'hoz'},
          {label: '换行', value: 'ver'}
        ]
      },
      {label: '选项', key: 'dataSource', desc: ' ', type: 'optionList'},
    ],
  },
  {
    text: '日期选择器',
    type: 'datePicker',
    schema: {
      labeltext: '日期选择器',
      type: 'datePicker',
      wrapstyle: {},
    },
    setting: [
      ...commonSetting,
      {label: '只读', key: 'disabled', desc: ' ', type: 'checkbox'},
    ],
  },
  {
    text: '时间选择器',
    type: 'timePicker',
    schema: {
      labeltext: '时间选择器',
      type: 'timePicker',
      wrapstyle: {},
    },
    setting: [
      ...commonSetting,
      {label: '只读', key: 'disabled', desc: ' ', type: 'checkbox'},
    ],
  },
  {
    text: '公式计算',
    type: 'calculate',
    schema: {
      labeltext: '公式计算',
      type: 'calculate',
      wrapstyle: {},
    },
    setting: [
      ...commonSetting,
      {label: '计算规则', key: 'calculateSetting', desc: ' ', type: 'calculate'},
    ],
  },
  {
    text: '拼接文本',
    type: 'joinText',
    schema: {
      labeltext: '拼接文本',
      type: 'joinText',
      wrapstyle: {},
    },
    setting: [
      ...commonSetting,
      {label: '多行文本', key: 'isRows', desc: ' ', type: 'checkbox'},
      {label: '显示行数', key: 'rows', desc: ' ', type: 'input'},
      {label: '拼接规则', key: 'joinTextSetting', desc: ' ', type: 'joinText'},
    ],
  },
  {
    text: '布局',
    type: 'area',
    schema: {
      labeltext: '布局',
      type: 'area',
      wrapstyle: {},
    },
    setting: [
      {label: 'id', key: 'id', desc: '数据存储的名称/英文/必填 ', type: 'input',disabled:true},
      {label: '标签', key: 'labeltext', desc: ' ', type: 'input'},
      {label: '说明', key: 'description', desc: ' ', type: 'input',placeholder:'标签说明'},
      ...columnWidthDataSourceSetting,
      {label: '显隐规则', key: 'hideRule', type: 'hideRule'},
      ...formSetting,
    ],
  },
  {
    text: '设计子表',
    type: 'group',
    schema: {
      labeltext: '设计子表',
      type: 'group',
      wrapstyle: {},
    },
    setting: [
      {label: 'id', key: 'id', desc: '数据存储的名称/英文/必填 ', type: 'input'},
      {label: '标签', key: 'labeltext', desc: ' ', type: 'input'},
      {label: '说明', key: 'description', desc: ' ', type: 'input',placeholder:'标签说明'},
      ...columnWidthDataSourceSetting,
      {label: '显隐规则', key: 'hideRule', type: 'hideRule'},
      ...formSetting,
      {label: '允许新增', key: 'allowAdd', desc: ' ', type: 'checkbox'},
      {label: '新增条数', key: 'maxAddNumber', desc: ' ', type: 'input'},
    ]
  },
  {
    text: '计数器',
    type: 'InputNumber',
    schema: {
      labeltext: '计数器',
      type: 'InputNumber',
      wrapstyle: {},
    },
    setting:[
      ...commonSetting,
    ]
  },
  {
    text: '文件上传',
    type: 'Upload',
    schema: {
      labeltext: '文件上传',
      type: 'Upload',
      wrapstyle: {},
    },
    setting:[
      {label: '上传地址', key: 'uploadAdress', desc: '', type: 'input',placeholder:'请填写附件上传地址'},
      ...commonSetting,
    ]
  },
  {
    text: '省市级联动',
    type: 'cascader',
    schema: {
      labeltext: '省市级联动',
      type: 'cascader',
      wrapstyle: {},
    },
    setting:[
      ...commonSetting,
    ]
  },
  {
    text: '用户',
    type: 'user',
    schema: {
      labeltext: '用户',
      type: 'user',
      wrapstyle: {
      },
    },
    setting:[
      ...commonSetting,
    ]
  },
  {
    text: '下拉树',
    type: 'tree',
    schema: {
      labeltext: '下拉树',
      type: 'tree',
      wrapstyle: {
      },
    },
    setting:[
      ...commonSetting,
    ]
  },
  {
    text: '部门组件',
    type: 'department',
    schema: {
      labeltext: '部门组件',
      type: 'department',
      wrapstyle: {
      },
    },
    setting:[
      ...commonSetting,
    ]
  },
  {
    text: '字典表',
    type: 'dictionary',
    schema: {
      labeltext: '字典表',
      type: 'dictionary',
      wrapstyle: {
      },
    },
    setting:[
      ...commonSetting,
    ]
  },
];
export const basicElements=[
  {
    text: '文本框',
    type: 'input',
    schema: {
      labeltext: '文本框',
      type: 'input',
      wrapstyle: {},
    },
  },
  {
    text: '计数器',
    type: 'InputNumber',
    schema: {
      labeltext: '计数器',
      type: 'InputNumber',
      wrapstyle: {},
    },
  },
  {
    text: '下拉选择',
    type: 'select',
    schema: {
      labeltext: '下拉选择',
      type: 'select',
      mode: 'single',
      wrapstyle: {},
      dataSource: [
        {label: '值1', value: '01'},
        {label: '值2', value: '02'}
      ]
    },
  },
  {
    text: '单选框组',
    type: 'radioGroup',
    schema: {
      labeltext: '单选框组',
      type: 'radioGroup',
      wrapstyle: {},
      dataSource: [
        {label: '值1', value: '01'},
        {label: '值2', value: '02'}
      ]
    },
  },
  {
    text: '复选按钮',
    type: 'checkbox',
    schema: {
      labeltext: '复选按钮',
      type: 'checkbox',
      wrapstyle: {},
    },
  },
  {
    text: '复选按钮组',
    type: 'checkboxGroup',
    schema: {
      labeltext: '复选按钮组',
      type: 'checkboxGroup',
      showtype: 'ver',
      wrapstyle: {},
      dataSource: [
        {label: '值1', value: '01'},
        {label: '值2', value: '02'}
      ]
    },
  },
  {
    text: '日期选择器',
    type: 'datePicker',
    schema: {
      labeltext: '日期选择器',
      type: 'datePicker',
      wrapstyle: {},
    },
  },
  {
    text: '时间选择器',
    type: 'timePicker',
    schema: {
      labeltext: '时间选择器',
      type: 'timePicker',
      wrapstyle: {},
    },
  },
];
export const hightElements=[
  {
    text: '纯文本',
    type: 'text',
    schema: {
      value: '',
      type: 'text',
      wrapstyle: {},
    },
  },
  {
    text: '文件上传',
    type: 'Upload',
    schema: {
      labeltext: '文件上传',
      type: 'Upload',
      wrapstyle: {},
    },
  },
  {
    text: '省市级联动',
    type: 'cascader',
    schema: {
      labeltext: '省市级联动',
      type: 'cascader',
      wrapstyle: {},
    },
  },
  {
    text: '公式计算',
    type: 'calculate',
    schema: {
      labeltext: '公式计算',
      type: 'calculate',
      wrapstyle: {},
    },
  },
  {
    text: '拼接文本',
    type: 'joinText',
    schema: {
      labeltext: '拼接文本',
      type: 'joinText',
      wrapstyle: {},
    },
  },
];
export const layoutElements=[
  {
    text: '布局',
    type: 'area',
    schema: {
      labeltext: '布局',
      type: 'area',
      wrapstyle: {},
    },
  },
];
export const GEECGElements=[
  {
    text: '设计子表',
    type: 'group',
    schema: {
      labeltext: '设计子表',
      type: 'group',
      wrapstyle: {},
    },
  },
  {
    text: '用户组件',
    type: 'user',
    schema: {
      labeltext: '用户',
      type: 'user',
      wrapstyle: {},
    },
  },
  {
    text: '部门组件',
    type: 'department',
    schema: {
      labeltext: '部门组件',
      type: 'department',
      wrapstyle: {},
    },
  },
  {
    text: '表字典',
    type: 'dictionary',
    schema: {
      labeltext: '表字典',
      type: 'dictionary',
      wrapstyle: {},
    },
  },
  {
    text: '下拉树',
    type: 'tree',
    schema: {
      labeltext: '下拉树',
      type: 'tree',
      wrapstyle: {},
    },
  },
]
export const DEFAULT_SCHEMA_EMPTY = {
  schema: {
    '#': {
      id: '#',
      parent: null,
      type: 'area',
    },
  },
  formData: {},
  frProps: {
    column: 2,
    labelwidth: 80,
    textAlign: 'right',
    displayType: 'row',
  }
};
export const DEFAULT_SCHEMA ={
  schema: {
    '#': {
      id: '#',
      parent: null,
      type: 'area',
    },
  },
  formData: {},
  frProps: {
    column: 2,
    labelwidth: 80,
    textAlign: 'right',
    displayType: 'row',
  }
}
export const DEFAULT_SCHEMA1 ={
	"schema": {
		"#": {
			"id": "#",
			"parent": null,
			"type": "area"
		},
		"area_219b163764639657096561": {
			"id": "area_219b163764639657096561",
			"labeltext": "凯兵个人信息",
			"type": "area",
			"wrapstyle": {},
			"parent": "#",
			"oneSelf": false,
			"border": ["", "top", "bottom", "left", "right"],
			"borderColor": "rgba(126,211,33,1)"
		},
		"input_70f3163764639875479714": {
			"id": "input_70f3163764639875479714",
			"labeltext": "姓名",
			"type": "input",
			"wrapstyle": {},
			"parent": "area_219b163764639657096561",
			"formName": "name",
			"oneSelf": true,
			"wrapWidth": "100%",
			"border": ["", "top", "bottom", "left", "right"],
			"borderColor": "rgba(0,0,0,1)"
		},
		"InputNumber_165b163764640094525627": {
			"id": "InputNumber_165b163764640094525627",
			"labeltext": "年龄",
			"type": "InputNumber",
			"wrapstyle": {},
			"parent": "area_219b163764639657096561",
			"formName": "age",
			"oneSelf": true,
			"wrapWidth": "100%"
		},
		"select_4093163764640212322593": {
			"id": "select_4093163764640212322593",
			"labeltext": "年收入",
			"type": "select",
			"mode": "single",
			"wrapstyle": {},
			"dataSource": [{
				"label": "5-10W",
				"value": "1"
			}, {
				"label": "10-15W",
				"value": "2"
			}, {
				"value": "3",
				"label": "15-20W",
				"calcValue": ""
			}],
			"parent": "area_219b163764639657096561",
			"formName": "income",
			"oneSelf": true,
			"wrapWidth": "100%",
			"border": ["", "top", "bottom", "left", "right"]
		},
		"radioGroup_22a5163764641200155504": {
			"id": "radioGroup_22a5163764641200155504",
			"labeltext": "婚姻状况",
			"type": "radioGroup",
			"wrapstyle": {},
			"dataSource": [{
				"label": "已婚",
				"value": "1"
			}, {
				"label": "未婚",
				"value": "2"
			}],
			"parent": "area_219b163764639657096561",
			"oneSelf": true,
			"wrapWidth": "100%"
		},
		"select_3f54163764641120175986": {
			"id": "select_3f54163764641120175986",
			"labeltext": "最高学历",
			"type": "select",
			"mode": "single",
			"wrapstyle": {},
			"dataSource": [{
				"label": "本科",
				"value": "1"
			}, {
				"label": "大专",
				"value": "2"
			}, {
				"value": "3",
				"label": "高中",
				"calcValue": ""
			}],
			"parent": "area_219b163764639657096561",
			"formName": "education",
			"oneSelf": true,
			"wrapWidth": "100%",
			"border": ["", "top", "bottom", "left", "right"]
		},
		"input_17d7163764640911345940": {
			"id": "input_17d7163764640911345940",
			"labeltext": "地址",
			"type": "input",
			"wrapstyle": {},
			"parent": "area_219b163764639657096561",
			"formName": "adress",
			"oneSelf": true,
			"wrapWidth": "100%"
		}
	},
	"formData": {
		"input_70f3163764639875479714": "何凯兵",
		"InputNumber_165b163764640094525627": 30,
		"input_17d7163764640911345940": "深圳市龙华区民乐翠园",
		"select_3f54163764641120175986": "1",
		"select_4093163764640212322593": "1",
		"radioGroup_22a5163764641200155504": "1"
	},
	"frProps": {
		"column": 2,
		"labelwidth": 80,
		"textAlign": "right",
		"displayType": "row"
	}
}
function getTypeToSetting(elements){
  const typeToSetting = {};
  elements.forEach(item=>{
    typeToSetting[item.type] = item.setting||[];
  });
  return typeToSetting
}

export const typeToSetting = getTypeToSetting(elements);

// 表单宽度跟随容器自定义改变
const flexMinWidth = {
  400: 1,
};