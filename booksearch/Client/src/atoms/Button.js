import React from 'react';
import styled from 'styled-components';
// materialuiを使用する
import { Button } from '@material-ui/core';

// materialuiを使用せず独自のボタンを使用したい場合は新たにスタイルを定義例
const Button2 = styled.button`
    display: inline-block;
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-weight: bold;
    font-size: 0.8rem;
    line-height: 1;
    text-decoration: none;
    transition: opacity 0.3s;
    color: red;
    cursor: pointer;
`;

// materialuiのスタイルを変更したい場合の定義例
const Button3 = styled(Button)`
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;

const ButtonComponent = ({...props}) => <Button {...props} />;
const ButtonComponent2 = ({...props}) => <Button2 {...props} />;
const ButtonComponent3 = ({...props}) => <Button3 {...props} />;
export default ButtonComponent ;
export {
    ButtonComponent2,
    ButtonComponent3,
  }