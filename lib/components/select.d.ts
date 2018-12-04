import React from 'react';
declare namespace Core {
    type Option = string | {
        label: string;
        icon: string;
        [key: string]: any;
    };
    interface SelectProps {
        value?: Option;
        options: any[];
        initialOptions: any[];
        onChange: Function;
    }
    interface SelectState {
        focus: boolean;
        highlight: number;
        maxHeight: string;
    }
}
declare class Select extends React.Component<Core.SelectProps, Core.SelectState> {
    resultContainer: any;
    static defaultProps: {
        onChange: Function;
    };
    constructor(props: any);
    readonly open: boolean;
    readonly error: boolean;
    results(value: any, options?: Core.Option[], initialOptions?: Core.Option[]): Core.Option[];
    onChange(e: any): void;
    onFocus(e: any): void;
    render(): JSX.Element;
}
export default Select;
