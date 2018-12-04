import * as React from 'react';
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
export default class Input extends React.Component<IProps, {
    validate: boolean;
}> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    handleValidationClass(): any;
    render(): JSX.Element;
}
