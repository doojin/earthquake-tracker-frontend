import React from 'react';
import {Flip, ToastContainer as ToastifyContainer} from 'react-toastify';
import './ToastContainer.less';

export default function ToastContainer() {
  return (
    <ToastifyContainer position="top-right"
                       hideProgressBar={true}
                       transition={Flip}
                       closeButton={false}
                       className="ToastContainer" />
  );
}
