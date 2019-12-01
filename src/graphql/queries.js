/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUmlDiagram = `query GetUmlDiagram($id: ID!) {
  getUMLDiagram(id: $id) {
    id
    name
    description
    attribute
    from
    to
  }
}
`;
export const listUmlDiagrams = `query ListUmlDiagrams(
  $filter: ModelUMLDiagramFilterInput
  $limit: Int
  $nextToken: String
) {
  listUMLDiagrams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      attribute
      from
      to
    }
    nextToken
  }
}
`;
