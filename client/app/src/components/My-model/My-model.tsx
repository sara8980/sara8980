import React, { FC } from 'react';
import './My-model.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MyModelProps {
  funcParent:()=>void
  funcParentClose:()=>void
  titel:string
  children:React.ReactNode
 }

const MyModel: FC<MyModelProps> = (props:MyModelProps) => {
  return <div className="My-model">
     <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
          <Modal.Title>{props.titel}</Modal.Title>
        <Modal.Body>
         {props.children}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.funcParentClose} >Cancel</Button>
          <Button variant="btn btn-outline-warning" onClick={props.funcParent}>Approval</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    </div>
  
};

export default MyModel;
