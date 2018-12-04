export declare const lock: () => () => void;
export declare const saveLocally: (key: any, data: any) => boolean;
export declare const loadLocally: (key: any) => any;
export declare const memoize: (fun: any, ...args: any[]) => any;
