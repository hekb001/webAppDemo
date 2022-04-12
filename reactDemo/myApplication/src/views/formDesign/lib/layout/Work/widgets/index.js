/**
 * Date: 2021年1月18日10:36:08
 * Author: kevin.he
 * Desc: 表单设计器-通用组件-表单
 */
import checkboxGroup from './CheckboxGroupControl';
import checkbox from './Checkbox';
import datePicker from './DatePickerControl';
import input from './InputControl';
import radioGroup from './RadioControl';
import select from './SelectControl';
import text from './TextControl';
import group from './GroupControl';
import calculate from './Calculate';
import joinText from './JoinText';
import Upload from './Upload';
import InputNumber from './InputNumber';
import timePicker from './TimePicker';
import user from './User';
import department from './Department';
import dictionary from './Dictionary';
import cascader from './Cascader';
import tree from './Tree';
const typeToWidget = {
  checkboxGroup, checkbox, datePicker, input, radioGroup, select, text, group,
  calculate, joinText,Upload,InputNumber,timePicker,user,department,dictionary,tree,cascader
};
export default typeToWidget

