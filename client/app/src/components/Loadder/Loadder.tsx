import React, { FC } from 'react';
import './Loadder.scss';

interface LoadderProps { }

const Loadder: FC<LoadderProps> = () => {
  return <div className="Loadder">
    <div className="spinner-border text-secondary" role="status"></div>
    <br></br>
    <span className="sr-only">אנא המתן/י</span>

  </div>
};

export default Loadder;
