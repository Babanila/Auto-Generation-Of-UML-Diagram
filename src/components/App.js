import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactDiagram } from "gojs-react";
import styled from "@emotion/styled";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsmobile from "../aws-exports";
import NewUML from "./NewUMLForm";
import initDiagram from "./UMLDiagram";
import { linkDataDetails, checkForDuplicate, removeObjectDuplicate } from "./Helpers";
import { createUmlDiagram, deleteUmlDiagram } from "../graphql/mutations";
import { listUmlDiagrams } from "../graphql/queries";
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

const LoadingDiv = styled.div`
  width: 90%;
  height: 500px;
  border: solid 1px black;
  background-color: rgb(250, 245, 245);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ErrorDiv = styled.div`
  width: 90%;
  height: 500px;
  border: solid 1px black;
  background-color: rgb(250, 245, 245);
  color: red;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

function App() {
  const [showForm, setShowForm] = useState(false);
  const [umlData, setUmlData] = useState([]);
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedNodeKeys, setSelectedNodeKeys] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {}, [umlData]);

  // Used for only testing data locally without AWS connection
  const fetchData = async () => {
    const url = `src/sampleData.json`;

    try {
      const { data } = await axios.get(url);
      console.log("first", data);
      setUmlData(removeObjectDuplicate([...umlData, ...data]));
    } catch (e) {
      setError(e);
    }
  };

  // Create UML in AWS Database
  const createNewUmlDiagram = async umlData => {
    await API.graphql(graphqlOperation(createUmlDiagram, { input: umlData }));
    console.log("UML Diagram created");
  };

  // Delete UML from AWS Database
  const deleteDiagram = async inputId => {
    await API.graphql(graphqlOperation(deleteUmlDiagram, { input: inputId }));
    console.log("UML Diagram deleted");
  };

  // Fetch from AWS Database
  const fetchUmlDiagram = async () => {
    const { data, errors } = await API.graphql(graphqlOperation(listUmlDiagrams));
    data ? setUmlData(data.listUMLDiagrams.items) : setError(errors[0].message);
  };

  // This function handles any changes to the GoJS model and his is where updates to the React App takes place.
  const handleModelChange = event => {
    // const { name } = event.target;
    // console.log(event.target);
    console.log("UML model changed!");
    alert("UML model changed!");
  };

  const handleDefault = event => {
    event.preventDefault();
    fetchUmlDiagram();
    // fetchData();
  };

  const handleShowAddForm = event => {
    event.preventDefault();
    setShowForm(!showForm);
  };

  const handleOnChange = event => {
    event.preventDefault();
    const { currentTarget } = event;

    if (currentTarget.name === "key") {
      setKey(currentTarget.value);
    } else if (currentTarget.name === "name") {
      setName(currentTarget.value);
    } else if (currentTarget.name === "description") {
      setDescription(currentTarget.value);
    } else if (currentTarget.name === "gender") {
      setGender(currentTarget.value);
    } else if (currentTarget.name === "age") {
      setAge(currentTarget.value);
    } else if (currentTarget.name === "from") {
      setFrom(currentTarget.value);
    } else if (currentTarget.name === "to") {
      setTo(currentTarget.value);
    }
  };

  const handleDeleteUMLNode = event => {
    event.preventDefault();
    // deleteDiagram();
    console.log("About to delete uml");
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchUmlDiagram();

    const newUmlDetails = {
      key: key,
      name: name,
      description: description ? description : null,
      gender: gender ? gender : null,
      age: age ? age : null,
      from: from ? from : null,
      to: to ? to : null,
    };

    if (checkForDuplicate(umlData, name)) {
      alert("Name already exist");
      return;
    } else if (checkForDuplicate(umlData, key)) {
      alert("Key already exist");
      return;
    } else {
      createNewUmlDiagram(newUmlDetails);
      fetchUmlDiagram();
    }

    setShowForm(false);
  };

  return (
    <AppStyles>
      <NavDiv>
        <h2>UML Generation</h2>
      </NavDiv>

      <ButtonGroup key="ButtonGroup">
        <Button onClick={e => handleDefault(e)}>Load from Database</Button>
        <Button onClick={e => handleShowAddForm(e)}>Add Node</Button>
        <Button onClick={e => handleDeleteUMLNode(e)}>Remove Node</Button>
      </ButtonGroup>

      <FormDiv key="addForm">
        {showForm && (
          <NewUML
            value={(key, name, description, gender, age, from, to)}
            onChange={e => handleOnChange(e)}
            onSubmit={e => handleSubmit(e)}
          />
        )}
      </FormDiv>

      {umlData.length === 0 ? (
        error ? (
          <ErrorDiv>
            <h1>{error}</h1>
          </ErrorDiv>
        ) : (
          <LoadingDiv>
            <h1>Loading...</h1>
          </LoadingDiv>
        )
      ) : (
        <ReactDiagram
          initDiagram={initDiagram}
          divClassName="umlDiagram"
          nodeDataArray={umlData}
          linkDataArray={linkDataDetails(umlData)}
          onModelChange={handleModelChange}
        />
      )}
    </AppStyles>
  );
}

export default App;
