import React, {useState} from 'react'
import {Switch} from 'antd'

function ThemeToggle(prop) {
  return (
       <Switch onClick={prop.handleClick}/>
  );
}

export default ThemeToggle