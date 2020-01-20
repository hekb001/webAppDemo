import React from 'react';
 function fn (WrapComponent){
     return class HightComponent extends React.Component{
        render(){
            return <div>
                <h3>明源云面试题</h3>
                <WrapComponent/>
            </div>
        }
    }
 } 

export default fn