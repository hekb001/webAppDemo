/**
 * Date: 2021年1月18日17:18:32
 * Author: kevin.he
 * Desc: 表单设计器-属性配置区-组件配置
 */
import {Input, Radio, Select, Checkbox, Range} from '@alifd/next';
import OptionList from './OptionList';
import HideRuleSetting from './HideRuleSetting';
import SketchPickerField from './SketchPickerField';
import SplicingTextSetting from './SplicingTextSetting';
import CalculateSetting from './CalculateSetting';

const typeToComponent = {
  input: Input,
  select: Select,
  radioGroup: Radio.Group,
  checkbox: Checkbox,
  checkboxGroup: Checkbox.Group,
  sketchPicker: SketchPickerField,
  optionList: OptionList,
  hideRule: HideRuleSetting,
  range: Range,
  selectAuto: Select.AutoComplete,
  joinText: SplicingTextSetting,
  calculate: CalculateSetting,
};

export default typeToComponent