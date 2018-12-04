import * as React from 'react';
declare class Input extends React.Component<Core.FormFieldProps<HTMLInputElement>> implements Core.FormField {
    Context: React.Context<any>;
    validate(value: string): boolean;
    componentWillMount(): void;
    render(): JSX.Element;
}
export default Input;
