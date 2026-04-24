const Navbar = ({ mode, setMode, onClearSelection }) => {
  return (
    <nav className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-gray-800 font-bold text-lg">
          Support Flow
        </a>

        <div>
          <button
            className="bg-primary text-white px-6 py-2 rounded cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => {
              setMode(mode === "editor" ? "preview" : "editor");
              onClearSelection();
            }}
          >
            {mode === "editor" ? "Play preview" : "Back to canvas"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
