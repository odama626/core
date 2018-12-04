import * as React from 'react';
declare namespace Core {
    interface Button extends React.HTMLProps<HTMLButtonElement> {
        type?: 'text' | 'outlined' | 'contained';
        icon?: string;
    }
}
declare const _default: ({ children, type, icon, className, ...rest }: Core.Button) => JSX.Element;
export default _default;
