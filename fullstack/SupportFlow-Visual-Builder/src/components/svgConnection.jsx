import { useEffect, useRef, useCallback } from "react";

export default function Connections({ nodes, canvasRef }) {
  const svgRef = useRef(null);

  const drawLines = useCallback(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) return;

    svg.querySelectorAll("path").forEach((p) => p.remove());

    const canvasRect = canvas.getBoundingClientRect();
    const edges = [];

    nodes.forEach((node) => {
      node.options.forEach((opt) => {
        const alreadyAdded = edges.find(
          (e) => e.from === node.id && e.to === opt.nextId
        );
        if (!alreadyAdded) {
          edges.push({ from: node.id, to: opt.nextId });
        }
      });
    });

    edges.forEach((edge) => {
      const fromEl = document.getElementById(`node-${edge.from}`);
      const toEl = document.getElementById(`node-${edge.to}`);
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const x1 = fromRect.left - canvasRect.left + fromRect.width / 2;
      const y1 = fromRect.top - canvasRect.top + fromRect.height;
      const x2 = toRect.left - canvasRect.left + toRect.width / 2;
      const y2 = toRect.top - canvasRect.top;
      const midY = (y1 + y2) / 2;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#B4B2A9");
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("marker-end", "url(#arrowhead)");
      svg.appendChild(path);
    });
  }, [nodes, canvasRef]);

  useEffect(() => {
    drawLines();
  }, [drawLines]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}>
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M 2 1 L 8 5 L 2 9"
              fill="none"
              stroke="#B4B2A9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
      </svg>
    </div>
  );
}