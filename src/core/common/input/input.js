import { Input } from "antd";
import React from "react";

function CustomInput(props) {
  const {
    placeholder,
    size,
    prefix,
    suffix
  } = props;

  return(
    <Input 
      placeholder={placeholder}
      size={size}
      prefix={prefix}
      suffix={suffix}
    ></Input>
  )
}

export default CustomInput;