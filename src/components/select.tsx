import React from 'react';
import classnames from 'classnames';
// import style from './select.module.scss';
const style = require('./select.module.scss');
import { memoize } from '../utils';

declare namespace Core {
  type Option = string | { label: string, icon: string, [key: string]: any};

  export interface SelectProps {
    value?: Option;
    options: any[];
    initialOptions: any[];
    onChange: Function;
  }

  export interface SelectState {
    focus: boolean;
    highlight: number;
    maxHeight: string;
  }
}

const Option = (props, key) => (
  <div data-option={key} className={style.option} key={key}>
    <div className={classnames(props && props.icon, style.icon)} />
    <div className={style.label}>{props && props.label || props}</div>
  </div>
)



class Select extends React.Component<Core.SelectProps, Core.SelectState> {
  resultContainer;

  static defaultProps: { onChange: Function } = {
    onChange: v => console.error('OnChange not implemented', v)
  }

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      highlight: -1,
      maxHeight: 'unset'
    }
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  get open() {
    return this.state.focus;
  }

  get error() {
    return false;
  }

  results(value, options: Core.Option[] = [], initialOptions: Core.Option[] = []) {
    if (value && value.length) {
      let search = value.toLowerCase();
      return options.filter(option => {
        let label = (option && option['label']) || option;
        return label && label.toLowerCase().indexOf(search) > -1;
      });
    } else {
      return initialOptions;
    }
    // let results = value && value.length ? options : initialOptions;
    // return results.map(Option);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  onFocus(e) {
    let target = e.target;
    setTimeout(() => target.scrollIntoView({behavior: 'smooth', block: 'start' }), 200);
    
    let maxHeight = `${window.innerHeight - window.scrollY - parseInt(this.resultContainer.getBoundingClientRect().top) - 20}px`;
    this.setState({ focus: true, maxHeight});
  }

  render() {
    const {
      open, error,
      props: {
        options,
        initialOptions,
        onChange,
        value = '',
        ...rest
      }
    } = this;
    const { maxHeight } = this.state;
    let results = memoize(this.results, value, options, initialOptions);
    return (
      <div className={classnames(style.container, { open, error })}>
        <input value={value && value['label'] || value} {...rest} onChange={this.onChange} onFocus={this.onFocus} onBlur={() => setTimeout(() => this.setState({focus: false}), 200)} />
        <div style={{maxHeight}}
          ref={ref => this.resultContainer = ref}
          className={style.resultContainer}
          onClick={(e: any) => onChange(results[e.target && e.target.dataset.option])}
        >
          {results.map(Option)}
        </div>
      </div>
    )
  }
}

export default Select;