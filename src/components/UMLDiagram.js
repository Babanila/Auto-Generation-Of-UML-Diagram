import * as go from "gojs";

//  This function is responsible for setting up the diagram's initial properties and any templates.
function initDiagram() {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram, {
    initialContentAlignment: go.Spot.LeftCenter,
    "undoManager.isEnabled": true,
    "undoManager.maxHistoryLength": 0,
    "clickCreatingTool.archetypeNodeData": { name: "new node", color: "lightblue" },
    // Layout setting
    layout: $(go.TreeLayout, {
      angle: 0,
      arrangement: go.TreeLayout.ArrangementVertical,
      treeStyle: go.TreeLayout.StyleLayered,
    }),

    // Diagram movement setting
    isReadOnly: false,
    allowHorizontalScroll: true,
    allowVerticalScroll: true,
    allowSelect: true,
    // autoScale: go.Diagram.Uniform,
    contentAlignment: go.Spot.LeftCenter,

    // Model setting
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    {
      // selectionChanged: node => nodeSelectionHandler(node.key, node.isSelected),
    },
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
      }),
      $(go.TextBlock, { row: 1, column: 1, margin: 2, editable: true }, new go.Binding("text", "id").makeTwoWay()),

      $(go.TextBlock, "name :", {
        row: 2,
        column: 0,
        margin: 2,
      }),
      $(go.TextBlock, { row: 2, column: 1, margin: 2, editable: true }, new go.Binding("text", "name").makeTwoWay()),

      $(go.TextBlock, "description :", {
        row: 3,
        column: 0,
        margin: 2,
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
      }),
      $(go.TextBlock, { row: 4, column: 1, margin: 2, editable: true }, new go.Binding("text", "gender").makeTwoWay()),

      $(go.TextBlock, "age :", {
        row: 5,
        column: 0,
        margin: 2,
      }),
      $(go.TextBlock, { row: 5, column: 1, margin: 2, editable: true }, new go.Binding("text", "age").makeTwoWay()),

      $(go.TextBlock, "from :", {
        row: 6,
        column: 0,
        margin: 2,
      }),
      $(go.TextBlock, { row: 6, column: 1, margin: 2, editable: true }, new go.Binding("text", "from").makeTwoWay()),

      $(go.TextBlock, "to :", {
        row: 7,
        column: 0,
        margin: 2,
      }),
      $(go.TextBlock, { row: 7, column: 1, margin: 2, editable: true }, new go.Binding("text", "to").makeTwoWay())
    )
  );

  return diagram;
}

export default initDiagram;
