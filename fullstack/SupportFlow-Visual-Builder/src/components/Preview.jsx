import { useState } from "react";

const PreviewMode = ({ nodes }) => {
  const [currentId, setCurrentId] = useState("1");
  const [history, setHistory] = useState([]);

  const currentNode = nodes.find((n) => n.id === currentId);

  const handleOption = (optionLabel, nextId) => {
    setHistory((prev) => [
      ...prev,
      { text: currentNode.text, isBot: true },
      { text: optionLabel, isBot: false },
    ]);
    setCurrentId(nextId);
  };

  const handleRestart = () => {
    setCurrentId("1");
    setHistory([]);
  };

  const isEnd = currentNode?.options.length === 0;

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-3">

      {history.map((msg, i) => (
        <div
          key={i}
          className={`
            px-3 py-2 rounded-xl text-sm leading-snug max-w-[80%]
            ${msg.isBot
              ? "self-start bg-gray-100 border border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              : "self-end bg-primary/10 border border-primary/30 text-primary"
            }
          `}
        >
          {msg.text}
        </div>
      ))}

      {currentNode && (
        <div className="self-start bg-gray-100 border border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 px-3 py-2 rounded-xl text-sm leading-snug max-w-[80%] font-medium">
          {currentNode.text}
        </div>
      )}

      {!isEnd && (
        <div className="flex flex-col gap-2 mt-1">
          {currentNode.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOption(opt.label, opt.nextId)}
              className="px-4 py-2 text-sm text-left rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-primary transition-colors cursor-pointer"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {isEnd && (
        <button
          onClick={handleRestart}
          className="self-start mt-2 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Start over
        </button>
      )}

    </div>
  );
};

export default PreviewMode;