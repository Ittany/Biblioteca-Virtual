import { useCallback, useEffect, useState } from 'react'

/**
 * @param {string} key - Clave de almacenamiento.
 * @param {*} initialValue - Valor inicial si no existe nada guardado.
 * @returns {[*, Function]} [valor, setValor] similar a useState.
 */
export function useLocalStorage(key, initialValue) {
  // si falla el parseo o no hay dato, se usa el valor inicial.
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: no se pudo leer "${key}"`, error)
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readValue)

  // Sincroniza el estado interno con localStorage cada vez que cambia el valor.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`useLocalStorage: no se pudo guardar "${key}"`, error)
    }
  }, [key, storedValue])

  // Actualizador compatible con useState (valor directo o función).
  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        return next
      })
    },
    [],
  )

  return [storedValue, setValue]
}