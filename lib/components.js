import React__default, { createElement, Component } from 'react';
import classnames from 'classnames';

var style = {"container":"_2R7S6_w","text":"AlOqMqz","contained":"_2S0n6w1","outlined":"_1aNaPg3"};

var button = ({ children, type = 'text', icon, className = '', ...rest }) => (createElement("button", Object.assign({ className: `${className} ${style.container} ${style[type]}` }, rest), children));

var style$1 = {"container":"_2ueI_5a","input":"wgZ1qbM","label":"_3f3TDZ9","caption":"F5Z3G-P","valid":"_3Wm6rCv","inputWrapper":"_1QqH6NB","invalid":"_1MIjMsO","password":"_2G_k6L8","hasIcon":"_1rFLUE0"};

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validate: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            if (nextProps.onValidate && nextProps.onValidate(nextProps.value) && !this.state.validate) {
                this.setState({ validate: true });
            }
        }
    }
    handleValidationClass() {
        const { onValidate, value, error } = this.props;
        const { validate } = this.state;
        if (error)
            return style$1.invalid;
        if (onValidate && validate) {
            let result = onValidate(value);
            // undefined for result should be handled as a neutral state - neither valid nor invalid
            if (result === undefined) {
                return '';
            }
            else {
                return result ? style$1.valid : style$1.invalid;
            }
        }
        else {
            return onValidate ? style$1.hasIcon : '';
        }
        // return onValidate && validate ? (onValidate(value) ? style.valid : style.invalid) : ( onValidate ? style.hasIcon : '');
    }
    render() {
        const { multiLine = false, className = '', onChange, label, caption, value, onValidate, error, type = 'text', onSubmit, icon, ...args } = this.props;
        const Type = multiLine ? 'textarea' : 'input';
        return (createElement("div", { className: classnames(style$1.container, { [style$1.password]: type === 'password' }, this.handleValidationClass()) },
            label ? createElement("div", { className: style$1.label }, label) : null,
            createElement("div", { className: `${style$1.inputWrapper} ${icon ? icon : ''}` },
                createElement(Type, Object.assign({ value: value, onChange: e => onChange(e.target.value), onKeyPress: e => onSubmit && e.key === 'Enter' ? onSubmit() : undefined, className: classnames(style$1.input, className), onBlur: () => onValidate && this.setState({ validate: true }), type: type }, args))),
            caption ? createElement("div", { className: style$1.caption }, caption) : null));
    }
}

var style$2 = {"container":"_1inWbRo","resultContainer":"_1HbY7J-","option":"YOgzyAw","icon":"_2vETFGY","label":"_1EXPieL"};

const memoize = (fun, ...args) => {
    try {
        window.memoes = window.memoes || {};
        let key = JSON.stringify({ fun, args });
        if (!window.memoes[key]) {
            window.memoes[key] = fun(...args);
        }
        // console.log(fun.arguments);
        return window.memoes[key];
    }
    catch (e) {
        return fun(...args);
    }
};
// let a = {
//   b: {
//     c : 'Here'
//   },
//   c: {
//     d: 'There'
//   }
// }
// let m = Maybe(a);
// m('b.c') //?
// m('c.d') //?
// m('b.c.d', 'Nope') //?
// Maybe(a)('b.c') //?
// Maybe(a)('c.d', 'Nope') //?
// Maybe(a)('b.c.d', 'Nope'); //?
// Maybe(a, 'b.c') //?
// Maybe(a, 'c.d', 'Nope') //?
// Maybe(a, 'b.c.d', 'Nope'); //?

const Option = (props, key) => (React__default.createElement("div", { "data-option": key, className: style$2.option, key: key },
    React__default.createElement("div", { className: classnames(props && props.icon, style$2.icon) }),
    React__default.createElement("div", { className: style$2.label }, props && props.label || props)));
class Select extends React__default.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            highlight: -1,
            maxHeight: 'unset'
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }
    get open() {
        return this.state.focus;
    }
    get error() {
        return false;
    }
    results(value, options = [], initialOptions = []) {
        if (value && value.length) {
            let search = value.toLowerCase();
            return options.filter(option => {
                let label = (option && option['label']) || option;
                return label && label.toLowerCase().indexOf(search) > -1;
            });
        }
        else {
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
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
        let maxHeight = `${window.innerHeight - window.scrollY - parseInt(this.resultContainer.getBoundingClientRect().top) - 20}px`;
        this.setState({ focus: true, maxHeight });
    }
    render() {
        const { open, error, props: { options, initialOptions, onChange, value = '', ...rest } } = this;
        const { maxHeight } = this.state;
        let results = memoize(this.results, value, options, initialOptions);
        return (React__default.createElement("div", { className: classnames(style$2.container, { open, error }) },
            React__default.createElement("input", Object.assign({ value: value && value['label'] || value }, rest, { onChange: this.onChange, onFocus: this.onFocus, onBlur: () => setTimeout(() => this.setState({ focus: false }), 200) })),
            React__default.createElement("div", { style: { maxHeight }, ref: ref => this.resultContainer = ref, className: style$2.resultContainer, onClick: (e) => onChange(results[e.target && e.target.dataset.option]) }, results.map(Option))));
    }
}
Select.defaultProps = {
    onChange: v => console.error('OnChange not implemented', v)
};

export { button as Button, Input, Select };
