import React from "react";
import styled from "@emotion/styled";
import UMLDiagram from "./UMLDiagram";

const AppStyles = styled.div`
    text-align: center;
    height: 100%;
    display: flex;
    flex-flow: column;
`;

const H1 = styled.h1`
    background-color: #222;
    height: 25px;
    padding: 20px;
    color: white;
    flex: 0 1 auto;
`;

function App() {
    return (
        <AppStyles>
            <H1>UML Generation</H1>
            <UMLDiagram />
        </AppStyles>
    );
}

export default App;
