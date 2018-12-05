export declare const lock: () => () => void;
export declare const saveLocally: (key: any, data: any) => boolean;
export declare const loadLocally: (key: any) => any;
export declare const memoize: (fun: any, ...args: any[]) => any;
declare type maybePath = ((string | number)[]) | string;
export declare function Maybe(obj: any, path?: maybePath, other?: any): any;
export {};
