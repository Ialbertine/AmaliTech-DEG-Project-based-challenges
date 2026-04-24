import { useState } from "react";
import Navbar from "./components/Navbar";
import NodeCard from "./components/NodeCard";
import flowData from "../flow_data.json";
import Edit from "./components/Edit";

const App = () => {
  const [mode, setMode] = useState("editor");
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedId, setSelectedId] = useState(null);

  const handleEdit = (nodeId, newText) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId ? { ...node, text: newText } : node,
      ),
    );
  };
  const selectedNode = nodes.find((node) => node.id === selectedId);

  return (
    <>
      <Navbar
        mode={mode}
        setMode={setMode}
        onClearSelection={() => setSelectedId(null)}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Support Flow Visual Builder
        </h1>
      </div>

      <section className="w-full px-4 pb-6">
        <div className="mx-auto w-fit max-w-full overflow-x-auto">
          <div
            className="relative bg-white border border-gray-200 rounded-xl overflow-hidden"
            style={{
              width: flowData.meta.canvas_size.w,
              height: flowData.meta.canvas_size.h,
            }}
          >
            {nodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isSelected={selectedId === node.id}
                onClick={setSelectedId}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <Edit
          node={selectedNode}
          onEdit={handleEdit}
          onClose={() => setSelectedId(null)}
        />
      </section>
    </>
  );
};

export default App;
