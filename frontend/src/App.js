import React, { useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import ItemForm from './ItemForm';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/informations/${id}/`);
      setRefresh(!refresh); 
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }
  };

  const handleSuccess = () => {
    setSelectedItem(null); 
    setRefresh(!refresh); 
  };

  return (
    <div className='container'>
        <ItemForm item={selectedItem} onSuccess={handleSuccess} />
        <ItemList key={refresh} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
