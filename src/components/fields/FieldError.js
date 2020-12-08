import React from 'react';
import './FieldError.less';

export default function FieldError({children}) {
  return (
    <div className="FieldError">
      {children}
    </div>
  );
}
