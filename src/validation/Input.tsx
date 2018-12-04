import * as React from 'react';

class Input extends React.Component<Core.FormFieldProps<HTMLInputElement>> implements Core.FormField {
  Context: React.Context<any>;

  validate(value: string) {
    const { validate } = this.props;
    return validate ? validate(value || '') : true;
  }

  componentWillMount() {
    this.props.controller.attachComponent(this.props.name, this);
  }

  render() {
    const {name, controller, validate, ...directRest} = this.props;
    const { Context } = this;
    return (
      <Context.Consumer>
        {state => {
          const { values, errors, ...rest} = state;
          let value = controller ? values[name] || '' : undefined;
          let style = errors[name] ? { borderColor: 'red' } : {};
          return <input style={style} data-name={name}  {...directRest} {...rest} value={value}/>
        }}
      </Context.Consumer>
    )
  }
}

export default Input;