import React, { useState, useEffect } from "react";
import { Container, Nav, Table, Button } from "react-bootstrap";
import FileData from "./FileData";

const TableData = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState(data);
  const [color, setColor] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .catch(error => console.error(error))
      .then((res) => {
        setData(res.results);
        setOriginalData(res.results);
      });
  }, []);

  const deleteButton = (id) => {
    const arrFiltered = data.filter((person) => person.login.uuid !== id);
    setData(arrFiltered);
  };

  const sortByCountry = () => {
    const arrSortByCountry = [...data].sort((a, b) => {
      if (a.location.country < b.location.country) {
        return -1;
      } else if (a.location.country > b.location.country) {
        return 1;
      } else {
        return 0;
      }
    });
    setData(arrSortByCountry);
  };

  const colorBackground = () => {
    color ? setColor(false) : setColor(true);
  };
  const restoreButton = () => {
    setData(originalData);
    setColor(true);
  };

 



  return (
    <Container>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <h1>Interview Tasks</h1>
        </Nav.Item>
      </Nav>
      <Nav className="justify-content-center m-4" activeKey="/home">
        <Nav.Item>
          <Button variant="outline-secondary" onClick={() => colorBackground()}>
            Colored Rows
          </Button>
        </Nav.Item>
        <Nav.Item className="mx-2">
          <Button variant="outline-secondary" onClick={() => sortByCountry()}>
            Sort by country
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button variant="outline-secondary" onClick={() => restoreButton()}>
            Restore
          </Button>
        </Nav.Item>
      </Nav>
      <Table bordered>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Country</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((person, index) => (
              <FileData
                index={index}
                key={person.login.uuid}
                photo={person.picture.thumbnail}
                name={person.name.first}
                surname={person.name.last}
                country={person.location.country}
                deleteButton={() => deleteButton(person.login.uuid)}
                style={{
                  backgroundColor: 
                    color ? 'white'
                    : index % 2 === 0
                    ? "#F1ECC3"
                    : "#C9D8B6",
                }} 
                
              />
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableData;
