import React, { useState } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styled from "@emotion/styled";
import Amplify from "aws-amplify";
import awsmobile from "../aws-exports";
import NewUML from "./NewUMLForm";
// import UMLDiagram from "./UMLDiagram";
// import testData from "../testData";

import "./App.css";

Amplify.configure(awsmobile);

const AppStyles = styled.div`
  height: 100%;
  width: 100%;
`;

const NavDiv = styled.div`
  width: 100%;
  height: 4em;
  color: white;
  display: flex;
  text-align: center;
  justify-content: center;
  background-color: black;
  margin-bottom: 2em;
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
  font-size: 1rem;
  font-weight: 900;
  align-self: center;
  border-radius: 4px;
  padding: 5px;
  color: white;
  background-color: #006400;
  margin-right: 1em;
  &:hover {
    cursor: pointer;
    background-color: #003399;
  }
`;

const FormDiv = styled.div`
  width: 300px;
  height: 62.8%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  left: 50%;
  z-index: 90;
`;

/**
 * This function is responsible for setting up the diagram's initial properties and any templates.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true,
    "clickCreatingTool.archetypeNodeData": { name: "new node", color: "lightblue" },
    // Layout setting
    layout: $(go.TreeLayout, {
      angle: 0,
      arrangement: go.TreeLayout.ArrangementVertical,
      treeStyle: go.TreeLayout.StyleLayered,
    }),

    // Model setting
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(
      go.Shape,
      "Rectangle",
      { name: "SHAPE", fill: "white", stroke: "black", strokeWidth: 2 },
      // Shape.fill is bound to Node.data.color
      new go.Binding(("fill", "white")).makeTwoWay()
    ),

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
        new go.Binding("text", "name").makeTwoWay()
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
      $(go.TextBlock, { row: 1, column: 1, margin: 2, editable: true }, new go.Binding("text", "id").makeTwoWay()),
      $(go.TextBlock, "name :", {
        row: 2,
        column: 0,
        margin: 2,
        editable: true,
      }),
      $(go.TextBlock, { row: 2, column: 1, margin: 2, editable: true }, new go.Binding("text", "name").makeTwoWay()),
      $(go.TextBlock, "description :", {
        row: 3,
        column: 0,
        margin: 2,
        editable: true,
      }),
      $(
        go.TextBlock,
        { row: 3, column: 1, margin: 2, editable: true },
        new go.Binding("text", "description").makeTwoWay()
      ),
      $(go.TextBlock, "gender :", {
        row: 4,
        column: 0,
        margin: 2,
        editable: true,
      }),
      $(go.TextBlock, { row: 4, column: 1, margin: 2, editable: true }, new go.Binding("text", "gender").makeTwoWay()),
      $(go.TextBlock, "age :", {
        row: 5,
        column: 0,
        margin: 2,
        editable: true,
      }),
      $(go.TextBlock, { row: 5, column: 1, margin: 2, editable: true }, new go.Binding("text", "age").makeTwoWay())
    )
  );

  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
  alert("GoJS model changed!");
}

function App() {
  const testData = [
    {
      key: 0,
      id: 1,
      name: "Baba",
      description: "1st test",
      gender: "male",
      age: 30,
      from: "",
      to: "Mama",
    },
    {
      key: 1,
      id: 2,
      name: "Mama",
      description: "2nd test",
      gender: "female",
      age: 25,
      from: "Baba",
      to: "Son",
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState({
    key: "",
    id: "",
    name: "",
    description: "",
    gender: "",
    age: "",
    from: "",
    to: "",
  });

  const [umlData, setUmlData] = useState(testData);

  const handleShowAddForm = event => {
    event.preventDefault();
    setShowForm(!showForm);
    console.log(value);
    console.log(umlData);
  };

  const handleOnChange = event => {
    event.preventDefault();
    event.target.name === "key" || event.target.name === "id" || event.target.name === "age"
      ? setValue({ ...value, [event.target.name]: parseInt(event.target.value) })
      : setValue({ ...value, [event.target.name]: event.target.value });

    console.log(value);
  };

  const handleDeleteUMLNode = event => {
    event.preventDefault();
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUmlData([...umlData, value]);
    setShowForm(false);
  };

  return (
    <AppStyles>
      <NavDiv>
        <h2>UML Generation</h2>
      </NavDiv>
      {/* <UMLDiagram /> */}

      <ButtonGroup key="ButtonGroup">
        <Button onClick={e => handleShowAddForm(e)}>Add Node</Button>
        <Button onClick={e => handleDeleteUMLNode(e)}>Remove Node</Button>
      </ButtonGroup>

      <FormDiv key="addForm">
        {showForm && <NewUML value={value} onChange={e => handleOnChange(e)} onSubmit={e => handleSubmit(e)} />}
      </FormDiv>

      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="umlDiagram"
        nodeDataArray={umlData}
        // { key: 3, text: "Delta", color: "pink", loc: "150 150" },

        linkDataArray={[
          { key: -1, from: 0, to: 1 },
          { key: -2, from: 0, to: 2 },
          // { key: -3, from: 1, to: 1 },
          // { key: -4, from: 2, to: 3 },
          // { key: -5, from: 3, to: 0 },
        ]}
        onModelChange={handleModelChange}
      />
    </AppStyles>
  );
}

export default App;
