const Edit = ({ node, onEdit, onClose }) => {
  if (!node) return null;

  const options = node.options ?? [];
  const typeStyles = {
    start: "text-[var(--primary)] bg-[var(--primary)]/10",
    question: "text-blue-700 bg-blue-100",
    end: "text-[var(--danger)] bg-[var(--danger)]/10",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-6 mt-4 shadow-sm w-[60%] mx-auto mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-semibold tracking-wider px-2 py-1 rounded ${typeStyles[node.type]}`}
          >
            {node.type.toUpperCase()}
          </span>

          <span className="text-xs text-gray-400">node id: {node.id}</span>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          X
        </button>
      </div>

      <label className="block text-xs text-gray-500 mb-1">Question text</label>

      <textarea
        value={node.text}
        onChange={(e) => onEdit(node.id, e.target.value)}
        rows={3}
        className="w-full text-sm p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-(--primary)/40 resize-y leading-relaxed"
      />

      <div className="text-[11px] text-gray-400 mt-2">
        Changes reflect on the canvas immediately.
      </div>

      {options.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Options</div>

          <div className="space-y-1">
            {options.map((opt, i) => (
              <div
                key={i}
                className="text-xs px-3 py-1.5 rounded-md bg-gray-100 text-gray-600"
              >
                {opt.label}{" "}
                <span className="text-gray-400">
                  {opt.nextId}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
