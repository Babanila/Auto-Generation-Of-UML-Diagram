import React from "react";
import styled from "@emotion/styled";
import * as go from "gojs";
import { ToolManager, Diagram } from "gojs";
import { GojsDiagram, ModelChangeEventType } from "react-gojs";
import NewUML from "./AddForm";
import { getRandomColor } from "../Helpers/ColorHelper";
import { sampleData } from "../sampleData";

const GojsDiagramStyles = styled(GojsDiagram)`
  width: 90%;
  height: 500px;
  flex: 1 1 auto;
  margin: auto;
  z-index: 50;
`;

const Div = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  top: 9.5em;
  left: 60%;
  z-index: 90;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  text-align: center;
  margin-bottom: 1em;
`;

const Button = styled.div`
  display: inline-block;
  font-size: 15px;
  font-weight: 900;
  border-radius: 4px;
  padding: 5px;
  color: #ffffff;
  cursor: pointer;
  margin-right: 1em;
`;

class UMLDiagram extends React.Component {
  nodeId = 0;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedNodeKeys: [],
      model: {
        nodeDataArray: sampleData,
        linkDataArray: [
          { from: sampleData[0].name, to: sampleData[0].to },
          { from: sampleData[1].name, to: sampleData[1].to },
          { from: sampleData[2].name, to: sampleData[2].to },
          //   { from: sampleData[3].name, to: sampleData[3].to }
          //   { from: sampleData[4].name, to: sampleData[4].to }
        ],
      },
    };
  }

  render() {
    const { open } = this.state;
    return [
      <ButtonGroup key="ButtonGroup">
        <Button style={{ backgroundColor: "green" }} key="addButton" type="button" onClick={this.showAddForm}>
          Add Node
        </Button>
        <Button style={{ backgroundColor: "red" }} key="deleteButton" type="button" onClick={this.deleteUMLNode}>
          Remove Node
        </Button>
      </ButtonGroup>,
      <Div key="addForm">{open && <NewUML onSubmit={this.onSubmit} />}</Div>,
      <GojsDiagramStyles
        key="gojsDiagram"
        diagramId="myDiagramDiv"
        model={this.state.model}
        createDiagram={this.createDiagram}
        className="myDiagram"
        // onModelChange={this.modelChangeHandler}
      />,
    ];
  }

  showAddForm = event => {
    const { value } = event.target;
    this.setState(prevState => ({
      open: !prevState.open,
    }));
    console.log(value, "XXXX");
  };

  deleteUMLNode = () => {
    console.log("Remove");
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ open: false });
    console.log("Want to add new UML node");
  };

  createDiagram = diagramId => {
    const $ = go.GraphObject.make;

    const myDiagram = $(go.Diagram, diagramId, {
      initialContentAlignment: go.Spot.LeftCenter,
      layout: $(go.TreeLayout, {
        angle: 0,
        arrangement: go.TreeLayout.ArrangementVertical,
        treeStyle: go.TreeLayout.StyleLayered,
      }),

      isReadOnly: false,
      allowHorizontalScroll: true,
      allowSelect: true,
      autoScale: Diagram.Uniform,
      contentAlignment: go.Spot.LeftCenter,
    });

    myDiagram.toolManager.panningTool.isEnabled = false;
    myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected),
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

  modelChangeHandler = event => {
    switch (event.eventType) {
      case ModelChangeEventType.Remove:
        if (event.nodeData) {
          this.removeNode(event.nodeData.key);
        }
        if (event.linkData) {
          this.removeLink(event.linkData);
        }
        break;
      default:
        break;
    }
  };

  addNode = () => {
    const newNodeId = "node" + this.nodeId;
    const linksToAdd = this.state.selectedNodeKeys.map(parent => {
      return { from: parent, to: newNodeId };
    });
    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        nodeDataArray: [
          ...this.state.model.nodeDataArray,
          { key: newNodeId, label: newNodeId, color: getRandomColor() },
        ],
        linkDataArray:
          linksToAdd.length > 0
            ? [...this.state.model.linkDataArray].concat(linksToAdd)
            : [...this.state.model.linkDataArray],
      },
    });
    this.nodeId += 1;
  };

  removeNode = nodeKey => {
    const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
    if (nodeToRemoveIndex === -1) {
      return;
    }
    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        nodeDataArray: [
          ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
          ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1),
        ],
      },
    });
  };

  removeLink = linKToRemove => {
    const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
      link => link.from === linKToRemove.from && link.to === linKToRemove.to
    );
    if (linkToRemoveIndex === -1) {
      return;
    }
    return {
      ...this.state,
      model: {
        ...this.state.model,
        linkDataArray: [
          ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
          ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1),
        ],
      },
    };
  };

  updateNodeText = (nodeKey, text) => {
    const nodeToUpdateIndex = this.state.model.nodeDataArray.findIndex(node => node.key === nodeKey);
    if (nodeToUpdateIndex === -1) {
      return;
    }
    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        nodeDataArray: [
          ...this.state.model.nodeDataArray.slice(0, nodeToUpdateIndex),
          {
            ...this.state.model.nodeDataArray[nodeToUpdateIndex],
            label: text,
          },
          ...this.state.model.nodeDataArray.slice(nodeToUpdateIndex + 1),
        ],
      },
    });
  };

  nodeSelectionHandler = (nodeKey, isSelected) => {
    if (isSelected) {
      this.setState({
        ...this.state,
        selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey],
      });
    } else {
      const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(key => key === nodeKey);
      if (nodeIndexToRemove === -1) {
        return;
      }
      this.setState({
        ...this.state,
        selectedNodeKeys: [
          ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
          ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1),
        ],
      });
    }
  };

  onTextEdited = e => {
    const tb = e.subject;
    if (tb === null) {
      return;
    }
    const node = tb.part;
    if (node instanceof go.Node) {
      this.updateNodeText(node.key, tb.text);
    }
  };
}

export default UMLDiagram;
