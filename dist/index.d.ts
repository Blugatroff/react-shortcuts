declare type Alphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
declare type FKeys = 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12';
declare type SpecialKeys = 'Control' | 'Alt';
declare type Key = Alphabet | FKeys | SpecialKeys;
export declare const createShortcutHook: (keys: Key[]) => (listener: () => void) => void;
export declare const anyShortcut: (...hooks: ((listener: (() => void)) => void)[]) => (listener: () => void) => void;
export {};
