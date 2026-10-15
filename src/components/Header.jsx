import { useState } from 'react'
import { BookPlus, Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const LOGO_URL = 'https://www.praxispa.cl/wp-content/uploads/elementor/thumbs/logo-quqix5ifc6kn3hc7jqv4v0pzmz304kklw14a39h214.png'

export default function Header({ search, onSearchChange, onAddBook }) {
  const [logoError, setLogoError] = useState(false)

  return (
    <header className="header">
      <div className="header-brand">
        {logoError ? (
          <span className="header-logo">PRAXIS</span>
        ) : (
          <img
            src={LOGO_URL}
            alt="Logo PRAXIS"
            className="header-logo-img"
            onError={() => setLogoError(true)}
          />
        )}
        <span className="header-subtitle">Biblioteca Virtual</span>
      </div>

      <div className="header-search">
        <Search size={16} className="search-icon" />
        <input
          type="search"
          placeholder="Buscar por título o autor…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Buscar libros"
        />
      </div>

      <div className="header-actions">
        <ThemeToggle />
        <button type="button" className="btn btn-primary" onClick={onAddBook}>
          <BookPlus size={16} />
          <span>Agregar libro</span>
        </button>
      </div>
    </header>
  )
}