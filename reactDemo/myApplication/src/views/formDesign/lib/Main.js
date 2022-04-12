/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器
 */
import './index.less';
import React, { forwardRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import FRWrapper from './FRWrapper';
import { useSet } from './store/hooks';
import getJoinSpecialSituationText from './store/getJoinSpecialSituationText';
import getCalculateValueText from './store/getCalculateValue';
import { DEFAULT_SCHEMA } from './config';
import { changeSideBar } from "actions/app";
import { saveFormDesign } from "actions/formDesign";
import { ServerNotification } from 'utils';
import _ from 'lodash';
const Main = (props, ref) => {
  const { defaultValue, isEdit = true, isPhone } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.formDesign.formDesignList);
  const [state, setState] = useSet({
    schema: defaultValue ? defaultValue : DEFAULT_SCHEMA,
    preview: isEdit ? false : true, // preview = false 是编辑模式
    selected: undefined, // 被选中的$id,
    selectedItem: undefined,
    undoItems: [],
    redoItems: [],
    isEdit: isEdit,
    isPhone: isPhone,
  });

  useEffect(() => {
    changeSideBar(props)(dispatch);
    const { match } = props;
    const { params } = match;
    // const obj = _.find(list, (item) => item.id == params.id);
    // const {config} = obj;
    // if(!_.isEmpty(config)){
    //   setState({schema:JSON.parse(config)})
    // }
  }, []);

  const getJointValue = (schema, formData) => {
    for (let key in schema) {
      if (schema[key].type === 'joinText') {
        const { joinTextSetting } = schema[key];
        formData[key] = getJoinSpecialSituationText(formData, joinTextSetting || {})
      }
    }
  };

  const getCalculateValue = (schema, formData) => {
    for (let key in schema) {
      if (schema[key].type === 'calculate') {
        const { calculateSetting } = schema[key];
        formData[key] = getCalculateValueText(formData, calculateSetting || {}, schema)
      }
    }
  };

  const onChange = data => {
    addUndoItems(schema);
    const result = { ...schema };
    getCalculateValue(schema.schema, data);
    getJointValue(schema.schema, data);
    result.formData = data;
    setState({ schema: result });
  };

  const onSchemaChange = newSchema => {
    addUndoItems(schema);
    const result = { ...schema };
    result.schema = newSchema;
    setState({ schema: result });
  };

  const onFrPropsChange = (frProps) => {
    addUndoItems(schema);
    const result = { ...schema };
    result.frProps = frProps;
    setState({ schema: result });
  };

  //右侧属性面板值发生改变时
  const onItemSettingChange = (selected, type, value) => {
    addUndoItems(schema);
    const result = { ...schema };
    const formData = result.formData;
    if (type === 'value') {
      formData[selected] = value;
    } else {
      result.schema[selected][type] = value;
      selectedItem[type] = value;
    }
    result.formData = formData;
    setState({
      schema: result,
      selectedItem,
    })
  };

  //导入
  const onImportData = () => {
    const file = document.createElement('input');
    file.setAttribute('type', 'file');
    file.onchange = (event) => {
      const target = event.target;
      if (target.files && target.files.length) {
        const fileInfo = target.files[0];
        const reader = new FileReader();
        reader.onload = function (evt) {
          let formDesignString = evt.target.result.toString();
          try {
            let schema = JSON.parse(formDesignString);
            setState({
              schema: schema,
              formData: schema.formData || {},
              frProps: schema.frProps || {},
            })
          } catch (e) {
          }
        };
        reader.readAsText(fileInfo, 'utf-8');
      }
    };
    file.click();
  };

  //导出
  const onExportData = () => {
    let exportData = JSON.stringify(schema);
    let eleLink = document.createElement('a');
    let name = moment(new Date()).format('YYYY-MM-DD');
    eleLink.download = `${name}.txt`;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    let blob = new Blob([exportData]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  };

  const addUndoItems = (schema) => {
    const showSchema = JSON.parse(JSON.stringify(schema));
    undoItems.push(showSchema);
    setState({
      undoItems
    })
  };
  //撤销、上一步
  const onUndo = () => {
    if (undoItems.length > 0) {
      const lastSchema = undoItems[undoItems.length - 1];

      undoItems.splice(undoItems.length - 1, 1);

      redoItems.push(JSON.parse(JSON.stringify(schema)));

      setState({
        undoItems,
        redoItems,
        schema: lastSchema
      })
    }
  };
  //撤销下一步
  const onRedo = () => {
    if (redoItems.length > 0) {
      const lastSchema = redoItems[redoItems.length - 1];

      redoItems.splice(redoItems.length - 1, 1);

      undoItems.push(JSON.parse(JSON.stringify(schema)));

      setState({
        undoItems,
        redoItems,
        schema: lastSchema
      })
    }
  };

  //预览、退出预览
  const onPreview = () => {
    setState({
      preview: !preview
    })
  };

  //保存
  const onSave = () => {
    const { match } = props;
    const { params } = match;
    const exportData = JSON.stringify(schema);
    const obj = _.find(list, (item) => item.id == params.id);
    const { title, description } = obj;
    const data = _.assign({ "type": "FORM", "screen_category_id": params.id, "config": exportData, title, description });
    saveFormDesign(data, (res, error) => {
      if (!error) {
        ServerNotification(res.msg, false)
        history.push('/form-list')
      }
    })(dispatch)
    // console.log(exportData,'保存的数据')
  }

  //重置
  const onRest = () => {
    setState({
      schema: DEFAULT_SCHEMA,
      selectedItem: ''
    })
  }

  //退出
  const onExit = () => {
    history.push('/form-list')
  }
  const { undoItems, redoItems, hovering, preview, schema, selected, selectedItem } = state;

  const rootState = {
    preview,
    simple: false,
    mapping: {},
    widgets: {},
    selected,
    selectedItem,
    hovering,
  };
  const showSchema = JSON.parse(JSON.stringify(schema));

  const allProps = {
    schema: showSchema,
    formData: showSchema.formData,
    frProps: showSchema.frProps,
    undoItems, redoItems,

    isEdit,
    isPhone,
    ...rootState,

    onChange,
    onSchemaChange,
    onFrPropsChange,
    onItemSettingChange,
    onImportData,
    onExportData,
    onUndo,
    onRedo,
    onPreview,
    onExit,
    onSave,
    onRest,
    setGlobal: setState,
  };
  return (
    <FRWrapper ref={ref} {...allProps} />
  )
};

export default forwardRef(Main);

