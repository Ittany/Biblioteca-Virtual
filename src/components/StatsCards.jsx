import { BookOpen, CheckCircle2, Clock, Tags } from 'lucide-react'

export default function StatsCards({ total, available, borrowed, categories }) {
  const cards = [
    { label: 'Total de libros', value: total, icon: BookOpen, tone: 'primary' },
    { label: 'Disponibles', value: available, icon: CheckCircle2, tone: 'success' },
    { label: 'Prestados', value: borrowed, icon: Clock, tone: 'warning' },
    { label: 'Categorías', value: categories, icon: Tags, tone: 'accent' },
  ]

  return (
    <section className="stats-grid" aria-label="Resumen del catálogo">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <article key={label} className={`stat-card stat-${tone}`}>
          <div className="stat-icon">
            <Icon size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        </article>
      ))}
    </section>
  )
}