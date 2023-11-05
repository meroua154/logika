import React, { useState } from 'react';
import ChildEditForm from '../ChildEditForm/ChildEditForm';

const ChildTable = ({ children, handleUpdate, handleDelete }) => {
  const [editingChildId, setEditingChildId] = useState(null);

  const handleEdit = (id) => {
    setEditingChildId(id);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Matricule</th>
            <th>Lieu de naissance</th>
            <th>Date de naissance</th>
            <th>Parent</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child, index) => (
            <tr key={index}>
              <td>{child.firstName}</td>
              <td>{child.lastName}</td>
              <td>{child.id}</td>
              <td>{child.placeOfBirth}</td>
              <td>{child.dateOfBirth}</td>
              <td>{child.parent}</td>
              <td>
                {editingChildId === child.id ? (
                  <ChildEditForm child={child} handleUpdate={handleUpdate} />
                ) : (
                  <>
                    <button onClick={() => handleEdit(child.id)}>Modifier</button>
                    <button onClick={() => handleDelete(child.id)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildTable;
