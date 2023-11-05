// ParentComponent.jsx
import React, { useState } from 'react';
import ChildTable from '../ChildTable/ChildTable';
import ChildEditForm from '../ChildEditForm/ChildEditForm';

const ParentComponent = () => {
  const [children, setChildren] = useState([]);

  const handleUpdate = (updatedChild) => {
    const updatedChildren = children.map((child) => {
      if (child.firstName === updatedChild.firstName) {
        return updatedChild;
      }
      return child;
    });
    setChildren(updatedChildren);
  };

  const handleDelete = (childId) => {
    const updatedChildren = children.filter((child) => child.id !== childId);
    setChildren(updatedChildren);
  };

  return (
    <div>
      <ChildTable
        children={children}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ParentComponent;


