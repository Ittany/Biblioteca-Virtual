import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StatsCards from './components/StatsCards'
import BookCard from './components/BookCard'
import BookForm from './components/BookForm'
import BookFilters from './components/BookFilters'
import {
  useBooksReducer,
  BOOKS_ACTIONS,
  loadBooksFromStorage,
} from './hooks/useBooksReducer'

const SAMPLE_BOOKS = [
  {
    id: 'b1',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    category: 'Novela',
    year: 1605,
    description: 'Clásico de la literatura española.',
    cover: '',
    status: 'disponible',
  },
  {
    id: 'b2',
    title: 'El principito',
    author: 'Antoine de Saint-Exupéry',
    category: 'Infantil',
    year: 1943,
    description: 'Relato poético sobre la amistad y la vida.',
    cover: '',
    status: 'prestado',
  },
  {
    id: 'b3',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    category: 'Novela',
    year: 1967,
    description: 'Obra cumbre del realismo mágico.',
    cover: '',
    status: 'disponible',
  },
  {
    id: 'b4',
    title: 'La ciudad y los perros',
    author: 'Mario Vargas Llosa',
    category: 'Novela',
    year: 1963,
    description: 'Novela ambientada en un colegio militar.',
    cover: '',
    status: 'disponible',
  },
  {
    id: 'b5',
    title: 'Alicia en el país de las maravillas',
    author: 'Lewis Carroll',
    category: 'Infantil',
    year: 1865,
    description: 'Aventuras fantásticas de Alicia.',
    cover: '',
    status: 'prestado',
  },
  {
    id: 'b6',
    title: 'El diario de Ana Frank',
    author: 'Ana Frank',
    category: 'Biografía',
    year: 1947,
    description: 'Diario escrito durante la Segunda Guerra Mundial.',
    cover: '',
    status: 'disponible',
  },
]

const BOOKS_STORAGE_KEY = 'praxis-books'

export default function App() {
  const { state, dispatch } = useBooksReducer(undefined, () => {
    const saved = loadBooksFromStorage(BOOKS_STORAGE_KEY)
    return {
      books: saved && saved.length > 0 ? saved : SAMPLE_BOOKS,
      filters: { category: 'todas', status: 'todos' },
      sort: { by: 'titulo', direction: 'asc' },
    }
  })

  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('inicio')
  const [formOpen, setFormOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(state.books))
    } catch (error) {
      console.warn('No se pudieron guardar los libros', error)
    }
  }, [state.books])

  const categories = useMemo(() => {
    const set = new Set(state.books.map((b) => b.category))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [state.books])

  const visibleBooks = useMemo(() => {
    const term = search.trim().toLowerCase()
    const { category, status } = state.filters
    const { by, direction } = state.sort

    let result = state.books.filter((b) => {
      const matchesTerm =
        !term ||
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term)
      const matchesCategory = category === 'todas' || b.category === category
      const matchesStatus = status === 'todos' || b.status === status
      return matchesTerm && matchesCategory && matchesStatus
    })

    result = [...result].sort((a, b) => {
      let cmp = 0
      if (by === 'titulo') {
        cmp = a.title.localeCompare(b.title)
      } else if (by === 'anio') {
        cmp = (a.year ?? 0) - (b.year ?? 0)
      }
      return direction === 'asc' ? cmp : -cmp
    })

    return result
  }, [state.books, state.filters, state.sort, search])

  const stats = useMemo(() => {
    const total = state.books.length
    const available = state.books.filter((b) => b.status === 'disponible').length
    const borrowed = total - available
    return { total, available, borrowed, categories: categories.length }
  }, [state.books, categories])

  const handleAddBook = useCallback(() => {
    setEditingBook(null)
    setFormOpen(true)
  }, [])

  const handleEditBook = useCallback((book) => {
    setEditingBook(book)
    setFormOpen(true)
  }, [])

  const handleCloseForm = useCallback(() => {
    setFormOpen(false)
    setEditingBook(null)
  }, [])

  const handleSubmitBook = useCallback(
    (book) => {
      if (editingBook) {
        dispatch({ type: BOOKS_ACTIONS.UPDATE_BOOK, payload: book })
      } else {
        dispatch({ type: BOOKS_ACTIONS.ADD_BOOK, payload: book })
      }
      handleCloseForm()
    },
    [editingBook, handleCloseForm, dispatch],
  )

  const handleRemoveBook = useCallback(
    (id) => {
      dispatch({ type: BOOKS_ACTIONS.REMOVE_BOOK, payload: id })
    },
    [dispatch],
  )

  const handleToggleStatus = useCallback(
    (id) => {
      dispatch({ type: BOOKS_ACTIONS.TOGGLE_AVAILABILITY, payload: id })
    },
    [dispatch],
  )

  const handleNavChange = useCallback(
    (id) => {
      setActiveNav(id)
      if (id === 'disponibles') {
        dispatch({
          type: BOOKS_ACTIONS.SET_STATUS_FILTER,
          payload: 'disponible',
        })
      } else if (id === 'prestados') {
        dispatch({
          type: BOOKS_ACTIONS.SET_STATUS_FILTER,
          payload: 'prestado',
        })
      } else {
        dispatch({ type: BOOKS_ACTIONS.RESET_FILTERS })
      }
      if (id === 'inicio') {
        setSearch('')
      }
    },
    [dispatch],
  )

  const handleCategoryChange = useCallback(
    (category) => {
      dispatch({ type: BOOKS_ACTIONS.SET_CATEGORY_FILTER, payload: category })
    },
    [dispatch],
  )

  const handleStatusChange = useCallback(
    (status) => {
      dispatch({ type: BOOKS_ACTIONS.SET_STATUS_FILTER, payload: status })
    },
    [dispatch],
  )

  const handleSortByChange = useCallback(
    (by) => {
      dispatch({ type: BOOKS_ACTIONS.SET_SORT, payload: { by } })
    },
    [dispatch],
  )

  const handleDirectionChange = useCallback(
    (direction) => {
      dispatch({ type: BOOKS_ACTIONS.SET_SORT, payload: { direction } })
    },
    [dispatch],
  )

  return (
    <div className="app">
      <Header
        search={search}
        onSearchChange={setSearch}
        onAddBook={handleAddBook}
      />

      <div className="layout">
        <Sidebar active={activeNav} onChange={handleNavChange} />

        <main className="content">
          <StatsCards
            total={stats.total}
            available={stats.available}
            borrowed={stats.borrowed}
            categories={stats.categories}
          />

          <BookFilters
            categories={categories}
            category={state.filters.category}
            onCategoryChange={handleCategoryChange}
            status={state.filters.status}
            onStatusChange={handleStatusChange}
            sortBy={state.sort.by}
            onSortByChange={handleSortByChange}
            direction={state.sort.direction}
            onDirectionChange={handleDirectionChange}
          />

          {visibleBooks.length === 0 ? (
            <div className="empty-state">
              <p>No se encontraron libros con esos criterios.</p>
            </div>
          ) : (
            <section className="books-grid">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleStatus={handleToggleStatus}
                  onRemove={handleRemoveBook}
                  onEdit={handleEditBook}
                />
              ))}
            </section>
          )}
        </main>
      </div>

      {formOpen && (
        <BookForm
          initialBook={editingBook}
          onSubmit={handleSubmitBook}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}