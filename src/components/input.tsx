import * as React from 'react';
// import * as style from './Input.scss';
import classnames from 'classnames';
const style = require('./input.module.scss');

export interface IProps {
  className?: string;
  label?: string;
  icon?: string;
  caption?: string;
  onValidate?: (x: string) => boolean;
  onChange: (x: string) => void;
  value: any;
  type?: string;
  onSubmit?: () => void;
  [x: string]: any;
  multiLine?: boolean;
  error?: boolean;
}

export default class Input extends React.Component<IProps, { validate: boolean}> {

  constructor(props) {
    super(props);
    this.state = {
      validate: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      if (nextProps.onValidate && nextProps.onValidate(nextProps.value) && !this.state.validate) {
        this.setState({validate: true});
      }
    }
  }

  handleValidationClass() {
    const { onValidate, value, error } = this.props;
    const { validate } = this.state;
    
    if (error) return style.invalid;

    if (onValidate && validate) {
      let result = onValidate(value);

      // undefined for result should be handled as a neutral state - neither valid nor invalid
      if (result === undefined) {
        return '';
      } else {
        return result ? style.valid : style.invalid;
      }
    } else {
      return onValidate ? style.hasIcon : '';
    }
    // return onValidate && validate ? (onValidate(value) ? style.valid : style.invalid) : ( onValidate ? style.hasIcon : '');
  }

  render() {
    const { multiLine = false, className = '', onChange, label, caption, value, onValidate, error, type = 'text', onSubmit, icon, ...args } = this.props;
    const Type = multiLine ? 'textarea' : 'input';
    return (
      <div className={classnames(style.container, { [style.password]: type === 'password' }, this.handleValidationClass())}>
        {label ? <div className={style.label}>{label}</div> : null}
        <div className={`${style.inputWrapper} ${icon ? icon : ''}`}>
          <Type
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => onSubmit && e.key === 'Enter' ? onSubmit() : undefined }
            className={classnames(style.input, className)}
            onBlur={() => onValidate && this.setState({validate: true})}
            type={type}
            {...args}
          />
        </div>
        {caption ? <div className={style.caption}>{caption}</div> : null}
      </div>
    );
  }
}