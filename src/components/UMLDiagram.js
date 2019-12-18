import React from "react";

const UMLDiagram = () => {
  return <div>This is UML diagram</div>;
};

export default UMLDiagram;

/*
import React, { useRef, createRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import useDeepCompareEffect from "use-deep-compare-effect";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import NewUML from "./NewUMLForm";
import testData from "../testData";

//
import { ToolManager } from "gojs";
import { GojsDiagram, ModelChangeEventType } from "react-gojs";

const RootDiv = styled.div`
  height: 91.7vh;
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 4em;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.div`
  display: inline-block;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 4px;
  padding: 10px;
  color: #ffffff;
  cursor: pointer;
  margin-right: 1em;
`;

const FormDiv = styled.div`
  width: 320px;
  height: 61%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  top: 8em;
  left: 60%;
  z-index: 90;
`;

const UMLDiv = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  z-index: 70;
`;

const GojsDiagramStyles = styled(GojsDiagram)`
  width: 90%;
  height: 500px;
  background: lightgray;
  z-index: 50;
`;

const UMLDiagram = () => {
  // Declaring local variable
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState({
    key: "",
    name: "",
    description: "",
    gender: "",
    age: "",
    to: "",
  });
  const [nodeId, setNodeId] = useState(0);
  const [selectedNodeKeys, setSelectedNodeKeys] = useState([]);
  const [umlData, setUmlData] = useState(testData);
  const [model, setModel] = useState({
    nodeDataArray: umlData,
    linkDataArray: [{ from: umlData[0].key, to: umlData[0].to }],
  });
  const [error, setError] = useState("");

  const handleShowAddForm = () => {
    setShowForm(!showForm);
    console.log("add button clicked");
  };

  const handleOnChange = event => {
    event.preventDefault();
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleDeleteUMLNode = () => {
    console.log("Remove");
  };

  const handleSubmit = event => {
    event.preventDefault();
    setShowForm(false);
    console.log(value, "ZTZTZTZTZTZ");
  };

  const modelChangeHandler = () => {};

  const nodeSelectionHandler = () => {};

  // Create UML Diagram
  const createDiagram = diagramId => {
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, diagramId, {
      initialContentAlignment: go.Spot.LeftCenter,
      "undoManager.isEnabled": true,
      "animationManager.isInitial": false,
      layout: $(go.TreeLayout, {
        angle: 0,
        arrangement: go.TreeLayout.ArrangementVertical,
        treeStyle: go.TreeLayout.StyleLayered,
      }),

      isReadOnly: false,
      allowHorizontalScroll: true,
      allowVerticalScroll: true,
      allowZoom: false,
      allowSelect: true,
      contentAlignment: go.Spot.LeftCenter,
      //   autoScale: Diagram.Uniform,
      //   TextEdited: this.onTextEdited,
    });

    myDiagram.toolManager.panningTool.isEnabled = false;
    myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        selectionChanged: node => nodeSelectionHandler(node.key, node.isSelected),
      },
      $(go.Shape, "Rectangle", {
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
      }),
      $(
        go.Panel,
        "Table",
        $(
          go.TextBlock,
          "alignment: Center",
          {
            row: 0,
            column: 0,
            columnSpan: 4,
            margin: 3,
            font: "bold 15pt sans-serif",
          },
          new go.Binding("text", "name")
        ),
        // Horizontal line before row 1:
        $(go.RowColumnDefinition, {
          row: 1,
          column: 0,
          separatorStrokeWidth: 1.5,
          separatorStroke: "black",
        }),

        $(go.TextBlock, "id :", {
          row: 1,
          column: 0,
          margin: 2,
          editable: true,
        }),
        $(go.TextBlock, { row: 1, column: 1, margin: 2, editable: true }, new go.Binding("text", "id")),
        $(go.TextBlock, "name :", {
          row: 2,
          column: 0,
          margin: 2,
          editable: true,
        }),
        $(go.TextBlock, { row: 2, column: 1, margin: 2, editable: true }, new go.Binding("text", "name")),
        $(go.TextBlock, "description :", {
          row: 3,
          column: 0,
          margin: 2,
          editable: true,
        }),
        $(go.TextBlock, { row: 3, column: 1, margin: 2, editable: true }, new go.Binding("text", "description")),
        $(go.TextBlock, "gender :", {
          row: 4,
          column: 0,
          margin: 2,
          editable: true,
        }),
        $(go.TextBlock, { row: 4, column: 1, margin: 2, editable: true }, new go.Binding("text", "gender")),
        $(go.TextBlock, "age :", {
          row: 5,
          column: 0,
          margin: 2,
          editable: true,
        }),
        $(go.TextBlock, { row: 5, column: 1, margin: 2, editable: true }, new go.Binding("text", "age"))
      )
    );

    return myDiagram;
  };

  const updateDiagramProps = event => {};

  return (
    <RootDiv>
      <ButtonGroup key="ButtonGroup">
        <Button style={{ backgroundColor: "green" }} onClick={handleShowAddForm}>
          Add Node
        </Button>
        <Button style={{ backgroundColor: "red" }} onClick={handleDeleteUMLNode}>
          Remove Node
        </Button>
      </ButtonGroup>

      <FormDiv key="addForm">
        {showForm && <NewUML value={value} onChange={handleOnChange} onSubmit={handleSubmit} />}
      </FormDiv>

      <UMLDiv>
        {umlData.length === 0 ? (
          <h3>Loading ...</h3>
        ) : (
          <GojsDiagramStyles
            key="gojsDiagram"
            diagramId="myDiagramDiv"
            model={model}
            createDiagram={createDiagram}
            className="myDiagram"
            onModelChange={modelChangeHandler}
            //   updateDiagramProps={updateDiagramProps}
          />
        )}
      </UMLDiv>
    </RootDiv>
  );
};

export default UMLDiagram;
*/
