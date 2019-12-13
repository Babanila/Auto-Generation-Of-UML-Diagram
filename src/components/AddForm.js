import React from "react";
import styled from "@emotion/styled";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: black;
  background-color: lightgray;
`;

const P = styled.p`
  width: 75%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  align-self: center;
  font-size: 1rem;
  font-weight: 900;
`;

const Input = styled.input`
  align-self: center;
  text-align: center;
  padding: 5px 5px;
  outline: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #006400;
  font-size: 1rem;
  font-weight: 900;
  align-self: center;
  border-radius: 4px;
  padding: 5px;
  color: #ffffff;
  margin-bottom: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #003399;
  }
`;

const NewUML = props => {
  const { name, description, gender, age, to, onChange, onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <h2>New Node</h2>
        <h3>Enter details below</h3>
      </div>
      <P>
        <Label>Name </Label>
        <Input name="name" value={name} onChange={onChange} />
      </P>
      <P>
        <Label>Descrp. </Label>
        <Input name="description" value={description} onChange={onChange} />
      </P>
      <P>
        <Label>Gender </Label>
        <Input name="gender" value={gender} onChange={onChange} />
      </P>
      <P>
        <Label>Age </Label>
        <Input name="age" value={age} onChange={onChange} />
      </P>
      <P>
        <Label>To </Label>
        <Input name="to" value={to} onChange={onChange} />
      </P>
      <Button className="search-button" type="submit">
        Add Node
      </Button>
    </Form>
  );
};

export default NewUML;
