export default function BookFilters({
  categories,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionChange,
}) {
  return (
    <section className="filters" aria-label="Filtros del catálogo">
      <label className="filter">
        <span>Categoría</span>
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="todas">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="filter">
        <span>Disponibilidad</span>
        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="disponible">Disponibles</option>
          <option value="prestado">Prestados</option>
        </select>
      </label>

      <label className="filter">
        <span>Ordenar por</span>
        <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
          <option value="titulo">Título</option>
          <option value="anio">Año</option>
        </select>
      </label>

      <label className="filter">
        <span>Dirección</span>
        <select value={direction} onChange={(e) => onDirectionChange(e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>
    </section>
  )
}