'use client';

import React, { useRef, useEffect, useState } from "react";
import * as go from "gojs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Plus, Link as LinkIcon, RotateCcw, LayoutTemplate, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SystemDesignPage = () => {
  const diagramRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [activeTab, setActiveTab] = useState("diagram");

  const questions = [
    {
      title: "URL Shortening Service",
      description: "Design a URL shortening service like Bit.ly",
      components: ["Load Balancer", "API Gateway", "URL Service", "Database", "Cache"]
    },
    {
      title: "Chat Application",
      description: "Design a scalable chat application",
      components: ["WebSocket Server", "Message Queue", "Chat Service", "User Service", "Notification Service"]
    },
    {
      title: "E-commerce Platform",
      description: "Design an online marketplace like Amazon",
      components: ["Product Service", "Order Service", "Payment Gateway", "Inventory System", "Search Service"]
    },
    {
      title: "Video Streaming",
      description: "Design a video streaming service like YouTube",
      components: ["CDN", "Transcoding Service", "Storage Service", "Analytics Engine", "Recommendation System"]
    },
    {
      title: "Social Media Platform",
      description: "Design a social media platform like Facebook",
      components: ["News Feed Service", "Graph Database", "Content Delivery", "Authentication", "Analytics"]
    }
  ];

  const generateQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
    
    // Create initial diagram with components
    const diagram = diagramRef.current.diagramInstance;
    const nodeDataArray = randomQuestion.components.map(component => ({
      key: component,
      category: "service"
    }));
    
    diagram.model = new go.GraphLinksModel(nodeDataArray, []);
  };

  useEffect(() => {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, diagramRef.current, {
      initialContentAlignment: go.Spot.Center,
      "undoManager.isEnabled": true,
      layout: $(go.ForceDirectedLayout, {
        springLength: 70,
        defaultSpringStiffness: 0.1,
      }),
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
    });

    // Service Node Template
    const serviceTemplate = $(
      go.Node,
      "Auto",
      {
        locationSpot: go.Spot.Center,
        selectionAdorned: true,
        resizable: true,
        resizeObjectName: "SHAPE",
      },
      $(
        go.Shape,
        "RoundedRectangle",
        {
          name: "SHAPE",
          fill: "#4f46e5",
          stroke: "#4338ca",
          strokeWidth: 2,
          portId: "",
          cursor: "pointer",
          fromLinkable: true,
          toLinkable: true,
        }
      ),
      $(
        go.TextBlock,
        {
          margin: 12,
          stroke: "white",
          font: "500 14px Inter",
          editable: true,
        },
        new go.Binding("text", "key").makeTwoWay()
      )
    );

    // Define Node templates for different categories
    diagram.nodeTemplateMap.add("service", serviceTemplate);

    // Enhanced Link Template
    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 10,
        toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true,
      },
      $(
        go.Shape,
        { strokeWidth: 2, stroke: "#6366f1" }
      ),
      $(
        go.Shape,
        { toArrow: "Standard", stroke: "#6366f1", fill: "#6366f1" }
      )
    );

    diagramRef.current.diagramInstance = diagram;

    return () => {
      diagram.div = null;
    };
  }, []);

  const addNode = () => {
    const diagram = diagramRef.current.diagramInstance;
    const newNode = { 
      key: `Service ${Math.floor(Math.random() * 1000)}`,
      category: "service"
    };
    diagram.model.addNodeData(newNode);
  };

  const resetDiagram = () => {
    const diagram = diagramRef.current.diagramInstance;
    diagram.model = new go.GraphLinksModel();
  };

  const connectNodes = () => {
    const diagram = diagramRef.current.diagramInstance;
    const selectedNodes = diagram.selection.filter(part => part instanceof go.Node).toArray();

    if (selectedNodes.length === 2) {
      const [node1, node2] = selectedNodes;
      diagram.model.addLinkData({ from: node1.data.key, to: node2.data.key });
    }
  };

  const changeLayout = (layoutType) => {
    const diagram = diagramRef.current.diagramInstance;

    switch (layoutType) {
      case "tree":
        diagram.layout = $(go.TreeLayout, {
          angle: 90,
          layerSpacing: 35,
          alignment: go.TreeLayout.AlignmentStart
        });
        break;
      case "circular":
        diagram.layout = $(go.CircularLayout, {
          spacing: 60,
          radius: 160
        });
        break;
      case "force":
        diagram.layout = $(go.ForceDirectedLayout, {
          springLength: 70,
          springStrength: 0.1,
        });
        break;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            System Design Interview Preparation
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveTab("help")}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="diagram">Design Canvas</TabsTrigger>
            <TabsTrigger value="help">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="diagram" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Challenge</span>
                  <Button onClick={generateQuestion}>
                    Generate New Question
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {question ? (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                    <p className="text-gray-600">{question.description}</p>
                  </div>
                ) : (
                  <p className="text-gray-600">Click "Generate New Question" to start.</p>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={addNode} className="gap-2">
                <Plus className="h-4 w-4" /> Add Service
              </Button>
              <Button onClick={connectNodes} variant="secondary" className="gap-2">
                <LinkIcon className="h-4 w-4" /> Connect Services
              </Button>
              <Button onClick={() => changeLayout("tree")} variant="secondary" className="gap-2">
                <LayoutTemplate className="h-4 w-4" /> Tree Layout
              </Button>
              <Button onClick={() => changeLayout("circular")} variant="secondary" className="gap-2">
                <LayoutTemplate className="h-4 w-4" /> Circular Layout
              </Button>
              <Button onClick={() => changeLayout("force")} variant="secondary" className="gap-2">
                <LayoutTemplate className="h-4 w-4" /> Force Layout
              </Button>
              <Button onClick={resetDiagram} variant="destructive" className="gap-2">
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            </div>

            <div
              ref={diagramRef}
              className="w-full h-[600px] border rounded-lg bg-gray-50"
            />
          </TabsContent>

          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle>System Design Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Tips for a Great System Design</AlertTitle>
                  <AlertDescription>
                    Start with requirements, scale considerations, and main components before diving into details.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="font-semibold">Key Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Clarify Requirements and Constraints</li>
                    <li>Estimate Scale and Performance Needs</li>
                    <li>Define System Interface (API Design)</li>
                    <li>Outline High-Level Components</li>
                    <li>Detail Data Model and Storage</li>
                    <li>Consider Scalability and Performance</li>
                    <li>Discuss Trade-offs and Alternatives</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemDesignPage;