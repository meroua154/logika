import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import FormPage from '../src/Pages/FormPage/FormPage';
import ChildTable from './Pages/ChildTable/ChildTable';
import ChildEditForm from './Pages/ChildEditForm/ChildEditForm';



const App = () => 
{ const [children, setChildren] = useState([]);

  useEffect(() => {
    const storedChildren = JSON.parse(localStorage.getItem('children'));
    if (storedChildren) {
      setChildren(storedChildren);
    }
  }, []);

  return (

    <Router>
      <Routes>
        
      <Route path="/form" element={<FormPage children={children} setChildren={setChildren} />} />
      <Route path="/table" element={<ChildTable children={children}/>} />
      <Route path="/edit" element={<ChildEditForm/>} />
      </Routes>    
        
      
    </Router>
  );
};

export default App;
