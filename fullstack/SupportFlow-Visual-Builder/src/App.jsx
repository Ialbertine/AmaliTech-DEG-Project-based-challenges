import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import NodeCard from "./components/NodeCard";
import Connections from "./components/svgConnection";
import PreviewMode from "./components/Preview";
import flowData from "../flow_data.json";
import Edit from "./components/Edit";

const isDark = flowData.meta.theme === "dark";

const App = () => {
  const [mode, setMode] = useState("editor");
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedId, setSelectedId] = useState(null);
  const canvasRef = useRef(null);

  const handleEdit = (nodeId, newText) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId ? { ...node, text: newText } : node
      )
    );
  };

  const selectedNode = nodes.find((node) => node.id === selectedId);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">

        <Navbar
          mode={mode}
          setMode={setMode}
          onClearSelection={() => setSelectedId(null)}
        />

        {mode === "preview" ? (
          <div className="p-6">
            <p className="text-sm text-gray-400 text-center mb-4">
              choose the options in the buttons below 
            </p>
            <PreviewMode nodes={nodes} />
          </div>
        ) : (

          <>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">
                Welcome to Support Flow Visual Builder
              </h1>
            </div>

            <section className="w-full px-4 pb-6">
              <div className="mx-auto w-fit max-w-full overflow-x-auto">
                <div
                  ref={canvasRef}
                  className="relative border rounded-xl overflow-hidden bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
                  style={{
                    width: flowData.meta.canvas_size.w,
                    height: flowData.meta.canvas_size.h,
                  }}
                >
                  <Connections nodes={nodes} canvasRef={canvasRef} />

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

        )}

      </div>
    </div>
  );
};

export default App;