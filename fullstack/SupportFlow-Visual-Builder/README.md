# SupportFlow Visual Builder
A visual decision tree editor for building and testing customer support conversation flows

## What This Project for
SupportFlow Visual Builder makes it easy for support teams to create, update, and test bot conversations using a simple live flowchart interface. Instead of dealing with confusing Excel sheets, managers can clearly see every question, decision path, and outcome in one place. They can click on any step to quickly edit the wording, then switch to a chat preview to experience the conversation exactly as a customer would.

### Getting Started

```bash
yarn install
yarn dev
```

## Features
### Visual Graph (Editor View)

- The main canvas renders every node from **flow_data.json** as a positioned card using the x/y coordinates defined in the data. Green cards are start nodes, blue are questions, and red mark the end of a conversation path. Every parent-child relationship is drawn as a curved SVG bezier line with an arrowhead, so the direction of the flow is always clear at a glance.

- The connection lines are drawn from scratch using raw SVG and DOM coordinate math, no graph library involved. The Connections component reads the bounding rectangles of each rendered node, subtracts the canvas offset, and computes cubic bezier control points to produce smooth, readable curves.

### Inline Editing
- Clicking any node on the canvas opens an Edit Panel below the flowchart. The panel shows the node type, its internal ID, and a textarea pre-filled with the current question text. Every keystroke updates the canvas in real time, the node card reflects the new wording the moment you type it, with no save button needed. If the node has options, those are listed in the panel as read only references so you can see where each branch leads while you're editing the question.

To dismiss the panel, click the X or click elsewhere on the canvas.

### Preview Mode
- The Play button in the navbar switches the entire interface from flowchart to a chat window. Preview Mode starts at the node with id: "1" and presents its question as a bot message. The user's available answers appear as clickable buttons below. Selecting an answer logs both the bot's question and the user's choice to the conversation history and advances to the next node. When a leaf node (one with no options) is reached, a "Start over" button replaces the answer choices and resets the conversation back to the beginning.

This makes it possible for a non-technical manager to test any flow change immediately after editing, without leaving the tool.

### Dark Mode
The theme is driven by the meta.theme field in flow_data.json. Setting it to "dark" applies the dark Tailwind variant across the entire app. The current file ships with dark mode enabled.

### Wildcard Feature
- Each connector line in the flowchart clearly links one step to the next using smooth curved paths, making the conversation flow easier to follow visually.

- In flows with multiple questions and branches, clear visual connections help managers quickly understand how users move from one step to another.

### Design System
used dark. Fixed dimensions supplied by meta.canvas_size in the JSON. Nodes are placed with position: absolute using the x/y values from the data, so repositioning a node is as simple as changing its coordinates in the JSON.

### color semantics
- primary #0d9488 Start nodes 
- secondary #334155 Body text
- success #16a34a for questions node
- warning #f59e0b Selected node
- danger #dc2626 for End nodes

## Project structure

```bash
src/
  components/
    Navbar.jsx          # Mode toggle
    NodeCard.jsx        # Individual node cards 
    svgConnection.jsx   # SVG bezier lines between nodes
    Preview.jsx         # Chat bot runner
    Edit.jsx            # Node editing panel
  App.jsx               # Root state, canvas layout
  index.css             # Tailwind + CSS custom properties
flow_data.json          # support flow data used
```

## Tech Stack
- React (Vite)
- Tailwind CSS v4: custom design 
- SVG: hand-rolled connector lines and arrowhead markers
- No graph libraries
- No MUI, Bootstrap, shadcn
