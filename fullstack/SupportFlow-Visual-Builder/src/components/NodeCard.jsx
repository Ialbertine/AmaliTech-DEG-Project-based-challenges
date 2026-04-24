const TYPE_STYLES = {
  start: `
    bg-[var(--primary)]/10 
    border-[var(--primary)] 
    text-[var(--primary)]
  `,
  question: `
    bg-blue-100 
    border-blue-500 
    text-blue-800
  `,
  end: `
    bg-[var(--danger)]/10 
    border-[var(--danger)] 
    text-[var(--danger)]
  `,
}

export default function NodeCard({ node, isSelected, onClick }) {
  const typeStyle = TYPE_STYLES[node.type] || TYPE_STYLES.question

  return (
    <div
      id={`node-${node.id}`}
      onClick={() => onClick(node.id)}
      className={`
        absolute w-40 px-3 py-2 rounded-lg border-2 cursor-pointer select-none
        transition-transform duration-150
        ${typeStyle}
        ${isSelected ? 'outline-3 outline-amber-700 outline-offset-2' : ''}
      `}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <div className="text-[10px] font-semibold tracking-wider opacity-60 mb-1">
        {node.type.toUpperCase()}
      </div>

      <div className="text-sm leading-snug">
        {node.text}
      </div>
    </div>
  )
}