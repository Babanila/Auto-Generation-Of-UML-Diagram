/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUmlDiagram = `mutation CreateUmlDiagram(
  $input: CreateUMLDiagramInput!
  $condition: ModelUMLDiagramConditionInput
) {
  createUMLDiagram(input: $input, condition: $condition) {
    id
    key
    name
    description
    gender
    age
    from
    to
  }
}
`;

export const updateUmlDiagram = `mutation UpdateUmlDiagram(
  $input: UpdateUMLDiagramInput!
  $condition: ModelUMLDiagramConditionInput
) {
  updateUMLDiagram(input: $input, condition: $condition) {
    id
    key
    name
    description
    gender
    age
    from
    to
  }
}
`;

export const deleteUmlDiagram = `mutation DeleteUmlDiagram(
  $input: DeleteUMLDiagramInput!
  $condition: ModelUMLDiagramConditionInput
) {
  deleteUMLDiagram(input: $input, condition: $condition) {
    id
    key
    name
    description
    gender
    age
    from
    to
  }
}
`;
