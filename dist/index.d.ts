declare type Key = 'Control' | 'a' | 'f' | 'F2' | 'Alt' | 'm';
export declare const createShortcutHook: (keys: Key[]) => (listener: () => void) => void;
export declare const anyShortcut: (...hooks: ((listener: (() => void)) => void)[]) => (listener: () => void) => void;
export {};
