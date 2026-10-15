import { memo } from 'react'
import { BookOpen, Pencil, Trash2, CheckCircle2, Clock } from 'lucide-react'

function BookCard({ book, onToggleStatus, onRemove, onEdit }) {
  const isAvailable = book.status === 'disponible'

  return (
    <article className="book-card">
      <div className="book-cover">
        {book.cover ? (
          <img
            src={book.cover}
            alt={`Portada de ${book.title}`}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="book-cover-placeholder">
            <BookOpen size={36} />
          </div>
        )}
      </div>

      <div className="book-body">
        <h3 className="book-title" title={book.title}>
          {book.title}
        </h3>
        <p className="book-author">{book.author}</p>

        <div className="book-meta">
          <span className="book-category">{book.category}</span>
          {book.year && <span className="book-year">{book.year}</span>}
        </div>

        <span className={`book-status ${isAvailable ? 'is-available' : 'is-borrowed'}`}>
          {isAvailable ? <CheckCircle2 size={14} /> : <Clock size={14} />}
          {isAvailable ? 'Disponible' : 'Prestado'}
        </span>

        <div className="book-actions">
          <button
            type="button"
            className="btn btn-small"
            onClick={() => onToggleStatus(book.id)}
            title={isAvailable ? 'Marcar como prestado' : 'Marcar como disponible'}
          >
            {isAvailable ? <Clock size={14} /> : <CheckCircle2 size={14} />}
            <span>{isAvailable ? 'Prestar' : 'Devolver'}</span>
          </button>

          <button
            type="button"
            className="btn btn-small"
            onClick={() => onEdit(book)}
            title="Editar libro"
          >
            <Pencil size={14} />
          </button>

          <button
            type="button"
            className="btn btn-small btn-danger"
            onClick={() => onRemove(book.id)}
            title="Eliminar libro"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default memo(BookCard)