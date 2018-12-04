declare namespace Core {

  interface FormController {
    attachComponent: (name, conmponent) => void;
    attachContext: (conmponent) => void;
    validate: () => boolean;
    validateByName: (name: string) => boolean;
  }

  interface FormField {
    validate?: (value: any) => boolean;
    Context: React.Context<FormProviderContext>;
  }

  interface FormProviderContext {
    errors: {
      [name: string]: boolean;
    };
    values: {
      [name: string]: any;
    }
    onChange: (event) => void;
  }


  interface Provider extends React.Component<any, any> {
    onChange: (event: React.SyntheticEvent<any>) => void;
    update: (errorFields: { [name: string]: any}) => void;
    Context: React.Context<FormProviderContext>;
  }


  // React Component Prop Types

  interface FormFieldProps<T> extends React.HTMLProps<T> {
    validate?: (value: any) => boolean;
    controller: FormController;
    name: string;
  }

  interface FormFieldWrapperProps extends FormFieldProps<null> {
    children: React.ReactElement<{ value: any, onChange: (event) => void }>;
  }

  interface FormProps extends React.HTMLProps<HTMLDivElement> {
    controller: FormController;
  }

  // Themes
  interface Theme {
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    light: string;
    dark: string;
  }
}
