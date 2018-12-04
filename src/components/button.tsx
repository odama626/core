import * as React from 'react';
const style = require('./button.module.scss');

declare namespace Core {
  interface Button extends React.HTMLProps<HTMLButtonElement> {
    type?: 'text'|'outlined'|'contained';
    icon?: string;
  }
}

export default ({ children, type = 'text', icon, className = '', ...rest }: Core.Button) => (
  <button className={`${className} ${style.container} ${style[type]}`} {...rest}>{children}</button>
)