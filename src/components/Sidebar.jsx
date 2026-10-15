import { LayoutGrid, Library, CheckCircle2, BookmarkX } from 'lucide-react'

const ITEMS = [
  { id: 'inicio', label: 'Inicio', icon: LayoutGrid },
  { id: 'todos', label: 'Todos los libros', icon: Library },
  { id: 'disponibles', label: 'Disponibles', icon: CheckCircle2 },
  { id: 'prestados', label: 'Prestados', icon: BookmarkX },
]

export default function Sidebar({ active, onChange }) {
  return (
    <nav className="sidebar" aria-label="Menú principal">
      <ul>
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              type="button"
              className={`sidebar-item ${active === id ? 'is-active' : ''}`}
              onClick={() => onChange(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}