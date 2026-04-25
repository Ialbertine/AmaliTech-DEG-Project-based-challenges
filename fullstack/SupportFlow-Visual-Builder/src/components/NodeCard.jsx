const TYPE_STYLES = {
  start: "bg-primary/10 border-primary text-primary",
  question: "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-950 dark:border-blue-400 dark:text-blue-300",
  end: "bg-danger/10 border-danger text-danger",
};

export default function NodeCard({ node, isSelected, onClick }) {
  const typeStyle = TYPE_STYLES[node.type] || TYPE_STYLES.question;

  return (
    <div
      id={`node-${node.id}`}
      onClick={() => onClick(node.id)}
      className={`
        absolute w-40 px-3 py-2 rounded-lg border-2 cursor-pointer select-none
        transition-transform duration-150
        ${typeStyle}
        ${isSelected ? "ring-2 ring-warning ring-offset-2 ring-offset-white dark:ring-offset-gray-900" : ""}
      `}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <div className="text-[10px] font-semibold tracking-wider opacity-60 mb-1 uppercase">
        {node.type}
      </div>
      <div className="text-sm leading-snug">
        {node.text}
      </div>
    </div>
  );
}