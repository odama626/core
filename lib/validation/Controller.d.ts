/// <reference types="react" />
/**
 * _@core / Form / Controller_
 *
 * ### Control FormFields in a Form and handle validation
 * ```
 * `
 * Pass an instance of ${ Controller } into a ${ Form } and
 * it's ${ children FormFields } to manage input ${ updates }
 * and ${ validation } checks
 * `
 *```
 *
 */
export default class Controller implements Core.FormController {
    components: {
        [name: string]: Core.FormField;
    };
    context: React.Context<Core.FormProviderContext>;
    provider: Core.Provider;
    constructor();
    attachContext(provider: any): void;
    attachComponent(name: any, component: any): void;
    validateByName(name: any): boolean;
    /**
     * ```
     * `
     * runs ${ validate } on all connected ${ FormFields }
     * inside containing ${ Form }
     *
     * marks all ${ FormFields } invalid that return falsey
     * from ${ validate } function
     *
     * returns ${ true } if all ${ FormFields } pass validation
     * `
     * ```
     * example:
     * ```
     * if (controller.validate()) {
     *   // Form is valid, grab form data
     *   let data = controller.getValues();
     * } else {
     *  // show error message here
     * }
     * ```
     */
    validate(): boolean;
    /**
     * ```
     * `
     * Get values from all connected ${ FormFields }
     *
     * returns ${ key value pairs } where the key is
     * the ${ FormField name } and the value is it's value
     * `
     * ```
     */
    getValues(): {
        [name: string]: any;
    };
}
