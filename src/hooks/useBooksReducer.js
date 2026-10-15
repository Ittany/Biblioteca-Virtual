import { useReducer } from 'react'

export const initialBooksState = {
  books: [],
  filters: {
    category: 'todas',
    status: 'todos', // 'todos'  'disponible' 'prestado'
  },
  sort: {
    by: 'titulo', // 'titulo' 'anio'
    direction: 'asc', // 'asc' 'desc'
  },
}

export const BOOKS_ACTIONS = {
  INIT_BOOKS: 'INIT_BOOKS',
  ADD_BOOK: 'ADD_BOOK',
  REMOVE_BOOK: 'REMOVE_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  TOGGLE_AVAILABILITY: 'TOGGLE_AVAILABILITY',
  SET_CATEGORY_FILTER: 'SET_CATEGORY_FILTER',
  SET_STATUS_FILTER: 'SET_STATUS_FILTER',
  SET_SORT: 'SET_SORT',
  RESET_FILTERS: 'RESET_FILTERS',
}

export function booksReducer(state, action) {
  switch (action.type) {
    case BOOKS_ACTIONS.INIT_BOOKS:
      return { ...state, books: action.payload }

    case BOOKS_ACTIONS.ADD_BOOK:
      return { ...state, books: [...state.books, action.payload] }

    case BOOKS_ACTIONS.REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter((b) => b.id !== action.payload),
      }

    case BOOKS_ACTIONS.UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload.id ? { ...b, ...action.payload } : b,
        ),
      }

    case BOOKS_ACTIONS.TOGGLE_AVAILABILITY:
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload
            ? {
                ...b,
                status: b.status === 'disponible' ? 'prestado' : 'disponible',
              }
            : b,
        ),
      }

    case BOOKS_ACTIONS.SET_CATEGORY_FILTER:
      return {
        ...state,
        filters: { ...state.filters, category: action.payload },
      }

    case BOOKS_ACTIONS.SET_STATUS_FILTER:
      return {
        ...state,
        filters: { ...state.filters, status: action.payload },
      }

    case BOOKS_ACTIONS.SET_SORT: {
      const { by, direction } = action.payload
      return {
        ...state,
        sort: {
          by: by ?? state.sort.by,
          direction: direction ?? state.sort.direction,
        },
      }
    }

    case BOOKS_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: initialBooksState.filters,
        sort: initialBooksState.sort,
      }

    default:
      return state
  }
}

/* Hook que expone el reducer junto con la función dispatch.*/
export function useBooksReducer(initialState = initialBooksState) {
  const [state, dispatch] = useReducer(booksReducer, initialState)
  return { state, dispatch }
}