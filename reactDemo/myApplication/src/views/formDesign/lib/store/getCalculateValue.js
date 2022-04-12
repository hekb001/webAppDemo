
function getValue(value, config) {
  const {dataSource} = config;
  let valueArray = [];
  if(![null, '', undefined].includes(value)){
    if(Array.isArray(value)){
      valueArray = value;
    }else{
      valueArray = [value]
    }
  }
  
  let calculateValue = valueArray.map(m=>{
    let show = ((dataSource||[]).find(v=>v.value===m)||{}).calculate;
    return ['', undefined, null].includes(show) ? m : show;
  });
  
  return calculateValue.reduce((sum, num)=>{
    return sum + (num-0)
  }, 0);
}

// 获取公式计算的值
export default function getCalculateValue(item, calculateSetting, schema){
  let {items=[], showValue} = calculateSetting;
  
  for(let i=items.length-1; i>=0; i--){
    const {id, index} = items[i];
    const reg = new RegExp(`v${index}`, 'g');
    showValue = showValue.replace(reg, getValue(item[id], schema[id]), 'g')
  }
  
  let calculateValue;
  
  try{
    calculateValue = eval(showValue||'')
  }catch (e) {
    
  }
  
  return calculateValue
}
