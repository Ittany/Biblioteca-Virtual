import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const EMPTY_FORM = {
  title: '',
  author: '',
  category: '',
  year: '',
  description: '',
  cover: '',
  status: 'disponible',
}

export default function BookForm({ initialBook, onSubmit, onClose }) {
  const [form, setForm] = useState(
    initialBook ? { ...EMPTY_FORM, ...initialBook } : EMPTY_FORM,
  )
  const [errors, setErrors] = useState({})
  const titleRef = useRef(null)

  // Foco automático en el campo título (useRef + useEffect)
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  // Esc para cerrar (con limpieza del listener)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'El título es obligatorio.'
    if (!form.author.trim()) next.author = 'El autor es obligatorio.'
    if (!form.category.trim()) next.category = 'La categoría es obligatoria.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      id: initialBook?.id ?? crypto.randomUUID(),
      year: form.year ? Number(form.year) : null,
    })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="book-form-title">
            {initialBook ? 'Editar libro' : 'Agregar libro'}
          </h2>
          <button
            type="button"
            className="btn btn-icon"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </header>

        <form className="modal-body" onSubmit={handleSubmit} noValidate>
          <label className="form-field">
            <span>Título *</span>
            <input
              ref={titleRef}
              type="text"
              value={form.title}
              onChange={handleChange('title')}
              placeholder="Ej. El principito"
            />
            {errors.title && <small className="form-error">{errors.title}</small>}
          </label>

          <label className="form-field">
            <span>Autor *</span>
            <input
              type="text"
              value={form.author}
              onChange={handleChange('author')}
              placeholder="Ej. Antoine de Saint-Exupéry"
            />
            {errors.author && <small className="form-error">{errors.author}</small>}
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Categoría *</span>
              <input
                type="text"
                value={form.category}
                onChange={handleChange('category')}
                placeholder="Ej. Novela"
              />
              {errors.category && <small className="form-error">{errors.category}</small>}
            </label>

            <label className="form-field">
              <span>Año</span>
              <input
                type="number"
                value={form.year ?? ''}
                onChange={handleChange('year')}
                placeholder="Ej. 1943"
              />
            </label>
          </div>

          <label className="form-field">
            <span>Descripción</span>
            <textarea
              rows={3}
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Breve descripción…"
            />
          </label>

          <label className="form-field">
            <span>URL de portada</span>
            <input
              type="url"
              value={form.cover}
              onChange={handleChange('cover')}
              placeholder="https://…"
            />
          </label>

          <label className="form-field">
            <span>Estado</span>
            <select value={form.status} onChange={handleChange('status')}>
              <option value="disponible">Disponible</option>
              <option value="prestado">Prestado</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {initialBook ? 'Guardar cambios' : 'Guardar libro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}