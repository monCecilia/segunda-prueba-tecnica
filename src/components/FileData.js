import React, { Fragment } from 'react';
import { Button } from "react-bootstrap";

const FileData = ( props ) => {
   
    return (
       <Fragment>
           <tr style={props.style}>
              <td>
                <img src={props.photo} alt="profile"></img>
              </td>
              <td>{props.name}</td>
              <td>{props.surname}</td>
              <td>{props.country}</td>
              <td>
              <Button
                variant="outline-secondary"
                onClick={props.deleteButton}
              >
                Delete
              </Button>
              </td> 
            </tr>
  
       </Fragment>
    );
}

export default FileData;
