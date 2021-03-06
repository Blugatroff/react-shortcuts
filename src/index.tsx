import React from 'react'

type UpperCase = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type LowerCase = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
type Alphabet = LowerCase | UpperCase
type ShiftNum = '!' | '@' | '#' | '$' | '%' | '^' | '&' | '*' | '(' | ')'
type FKeys = 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12'
type SpecialKeys = 'Control' | 'Alt' | 'Backspace' | 'Tab' | 'Shift' | 'Enter' | 'End'
type Arrows = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft'
type Key = Alphabet | FKeys | SpecialKeys | Arrows | ShiftNum

class KeysState {
  private keys: Map<string, boolean> = new Map()

  public isPressed(key: Key): boolean {
    return this.keys.get(key) ?? false
  }
  public update(e: KeyboardEvent, state: boolean) {
    this.keys.set(e.key, state)
  }
}

type Listener = (keys: KeysState) => void
const listeners: Map<string, Listener[]> = new Map()

const addListener = (key: Key, listener: Listener): (() => void) => {
  const listenersOnKey = listeners.get(key) ?? []
  listeners.set(key, [...listenersOnKey, listener])
  return () => {
    const listenersOnKey = listeners.get(key)
    if (listenersOnKey === undefined) return
    listeners.set(key, listenersOnKey.filter(f => f !== listener))
  }
}

const keysState = new KeysState()
document.body.onkeydown = e => {
  keysState.update(e, true)
  for (const listener of listeners.get(e.key) ?? []) listener(keysState)
}
document.body.onkeyup = e => keysState.update(e, false)

const useKey = (key: Key, listener: Listener) =>
  React.useEffect(
    () => addListener(key, listener),
    [listener, key]
  )

export const createShortcutHook = (keys: Key[]) => (listener: () => void): void => {
  useKey(keys[keys.length - 1], React.useMemo(() => state => {
    for (let i = 0; i < keys.length - 1; i++) {
      if (!state.isPressed(keys[i])) return
    }
    listener()
  }, [listener]))
}

export const anyShortcut = (...hooks: ((listener: (() => void)) => void)[]) => (listener: () => void) => hooks.forEach(h => h(listener))
