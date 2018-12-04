import * as React from 'react';
/**
 * _@core / Form / Wrapper_
 *
 * ### Wrap a component that has value and onChange
 * ```
 * `
 * sets ${data-name} of component to track onChange
 * adds ${data-error} when there is an error with the input
 * `
 * ```
 * ### Accepted Props
 * ```
 * controller: Core.FormController // instance of FormController
 *
 * validate?: (value) => boolean // optional validation function
 *
 * name: string // the key the value will be under in the controller
 * ```
 */
export default class Wrapper extends React.Component<Core.FormFieldWrapperProps> implements Core.FormField {
    Context: React.Context<any>;
    validate(value: string): boolean;
    componentWillMount(): void;
    render(): JSX.Element;
}
