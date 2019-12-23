/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncUmlDiagrams = `query SyncUmlDiagrams(
  $filter: ModelUMLDiagramFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUMLDiagrams(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      key
      name
      description
      gender
      age
      from
      to
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const getUmlDiagram = `query GetUmlDiagram($id: ID!) {
  getUMLDiagram(id: $id) {
    id
    key
    name
    description
    gender
    age
    from
    to
    _version
    _deleted
    _lastChangedAt
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
      key
      name
      description
      gender
      age
      from
      to
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
