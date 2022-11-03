import { useState } from 'react';

export const useInputState = (initialValue, onChange) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    event => {
      setValue(event.target.value);
      onChange() // additional onChange handler
    }
  ];
};

export const useObjectInputState = (initialObj, onChange) => {
  const [data, setData] = useState(initialObj?initialObj:{});

  const changeData = (event,key) => {
    let newdata = {...data}
    newdata[key] = event.target.value
    setData(newdata);
    onChange() // additional onChange handler
  }

  return {
    data : data,
    changeData : changeData,
    renderTextInput:(key)=>
      (<input 
        type='text' 
        onChange={e=>{changeData(e,key)}}
        value={data[key]}/>)
  };
};