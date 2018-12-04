import * as React from 'react';
import Controller from './Controller';

export default class Form extends React.Component<Core.FormProps, any> implements Core.Provider {
  Context;
  constructor(props) {
    super(props);
    this.state = {
      onChange: this.onChange.bind(this),
      values: {},
      errors: {},
    };
    this.props.controller.attachContext(this);
  }

  onChange(event) {
    const { values, errors } = this.state;
    let name = event.target.dataset.name;
    let nextState = {
      values: { ...values, [name]: event.target.value }
    }
    if (errors[name] && !this.props.controller.validateByName(name)) {
      nextState['errors'] = { ...errors, [name]: false}
    }
    this.setState(nextState);
  }

  update(errors) {
    this.setState({ errors });
  }

  render() {
    const { controller, ...rest } = this.props;
    const { Context } = this;
    return (
      <Context.Provider value={this.state}>
        <div {...rest} />
      </Context.Provider>
    )
  }
}