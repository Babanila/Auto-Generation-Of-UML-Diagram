import React, { useState, useEffect } from "react";
import axios from "axios";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styled from "@emotion/styled";
import Amplify from "aws-amplify";
import awsmobile from "../aws-exports";
import NewUML from "./NewUMLForm";
import initDiagram from "./UMLDiagram";
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

// This function handles any changes to the GoJS model and his is where updates to the React App takes place.
function handleModelChange(changes) {
  alert("UML model changed!");
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [umlData, setUmlData] = useState([]);
  const [key, setKey] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {}, [umlData]);

  const fetchData = async () => {
    const url = `src/sampleData.json`;

    try {
      const { data } = await axios.get(url);
      setUmlData(removeDuplicate([...umlData, ...data]));
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const removeDuplicate = allArray =>
    allArray.filter((ele, ind) => ind === allArray.findIndex(elem => elem.key === ele.key && elem.id === ele.id));

  const indexFinder = (arr, name) => {
    const result = arr.find(x => x.name === name);
    return result.key;
  };

  const linkDataDetails = allData => {
    const linkData = allData.map((data, i) => ({
      key: -(i + 1),
      from: data.from == "" || indexFinder(allData, data.from) == -1 ? "" : indexFinder(allData, data.from),
      to: data.to == "" || indexFinder(allData, data.to) == -1 ? data.key : indexFinder(allData, data.to),
    }));

    return linkData;
  };

  const handleDefault = event => {
    event.preventDefault();
    fetchData();
  };

  const handleShowAddForm = event => {
    event.preventDefault();
    setShowForm(!showForm);
  };

  const handleOnChange = event => {
    event.preventDefault();
    const { currentTarget } = event;

    if (currentTarget.name === "key") {
      setKey(parseInt(currentTarget.value));
    } else if (currentTarget.name === "id") {
      setId(parseInt(currentTarget.value));
    } else if (currentTarget.name === "age") {
      setAge(parseInt(currentTarget.value));
    } else if (currentTarget.name === "name") {
      setName(currentTarget.value);
    } else if (currentTarget.name === "description") {
      setDescription(currentTarget.value);
    } else if (currentTarget.name === "gender") {
      setGender(currentTarget.value);
    } else if (currentTarget.name === "from") {
      setFrom(currentTarget.value);
    } else if (currentTarget.name === "to") {
      setFrom(currentTarget.value);
    }
  };

  const handleDeleteUMLNode = event => {
    event.preventDefault();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newValue = { key, id, name, description, gender, age, from, to };
    setUmlData([...umlData, newValue]);
    setShowForm(false);
  };

  return (
    <AppStyles>
      <NavDiv>
        <h2>UML Generation</h2>
      </NavDiv>

      <ButtonGroup key="ButtonGroup">
        <Button onClick={e => handleDefault(e)}>Load External Data</Button>
        <Button onClick={e => handleShowAddForm(e)}>Add Node</Button>
        <Button onClick={e => handleDeleteUMLNode(e)}>Remove Node</Button>
      </ButtonGroup>

      <FormDiv key="addForm">
        {showForm && (
          <NewUML
            value={(key, id, name, description, gender, age, from)}
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
