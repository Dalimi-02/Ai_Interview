'use client';
import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import { SandpackProvider, SandpackPreview, SandpackCodeEditor, SandpackStack } from "@codesandbox/sandpack-react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";


const questions = [
  "Design a URL shortening service like Bit.ly",
  "Design a scalable chat application",
  "Design an online marketplace like Amazon",
  "Design a video streaming service like YouTube",
  "Design a social media platform like Facebook",
];

const initialNodes = [
  { id: "1", type: "input", data: { label: "Client" }, position: { x: 250, y: 0 } },
  { id: "2", data: { label: "Load Balancer" }, position: { x: 250, y: 100 } },
  { id: "3", data: { label: "Server" }, position: { x: 250, y: 200 } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const CustomNode = ({ data, isSelected }) => {
  const [label, setLabel] = useState(data.label);

  const handleBlur = () => {
    data.label = label;
  };

  return (
    <div>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={handleBlur}
        style={{
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "5px",
          backgroundColor: isSelected ? "#e0f7fa" : "white",
        }}
      />
    </div>
  );
};

const SystemDesignPage = () => {
  const [question, setQuestion] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(4);
  const [code, setCode] = useState(`console.log("Hello, World!");`);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const generateQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const label = prompt("Enter label for the new node:", `New Node ${nodeId}`);
    const newNode = {
      id: `${nodeId}`,
      data: { label: label || `New Node ${nodeId}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeId(nodeId + 1);
  };

  const onDelete = useCallback(
    (event) => {
      if (event.key === "Delete" || event.key === "Backspace" || event.type === "click") {
        setNodes((nds) => {
          const remainingNodes = nds.filter((node) => !node.selected);
          return remainingNodes.map((node) => ({ ...node, selected: false }));
        });
        setEdges((eds) => eds.filter((edge) => !edge.selected));
      }
    },
    [setNodes, setEdges]
  );

  const UIOptions = {
    canvasActions: {
      changeViewBackgroundColor: false,
      clearCanvas: false,
      loadScene: false,
    },
  };

  return (
    <ReactFlowProvider>
      <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ color: "#4745d2", marginBottom: "20px" }}>System Design Interview Preparation</h1>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={generateQuestion}
            style={{
              backgroundColor: "#4745d2",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Generate Question
          </button>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            {question || "Click the button to generate a question."}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}>
          <div
            style={{
              flex: "1",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              position: "relative",
              minHeight: "400px",
              backgroundColor: "#f9f9f9",
            }}
            tabIndex="0"
            onKeyDown={onDelete}
          >
            <div style={{ height: "400px" }}>
              <Excalidraw>
                <MainMenu>
                  <MainMenu.Item onSelect={() => window.alert("Item 1")}>
                    Item 1
                  </MainMenu.Item>
                  <MainMenu.Item onSelect={() => window.alert("Item 2")}>
                    Item 2
                  </MainMenu.Item>
                </MainMenu>
              </Excalidraw>
            </div>
          </div>

          <div
            style={{
              width: "300px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <SandpackProvider template="react" customSetup={{ files: { "/App.js": code } }}>
              <SandpackStack>
                <SandpackCodeEditor onCodeChange={(newCode) => setCode(newCode)} style={{ height: "200px" }} />
                <SandpackPreview />
              </SandpackStack>
            </SandpackProvider>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default SystemDesignPage;
