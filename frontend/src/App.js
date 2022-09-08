import React, { useState } from 'react';
import SongSearchForm from './components/SongSearchForm/SongSearchForm';
import './App.css';
import CardList from './components/CardList';

const App = () => {
  const [data, setData] = useState([]); 
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  
  const getContent = async () =>{
    const url = new URL('https://itunes.apple.com/search');
    const params = { term: search, media: 'music'};
    url.search = new URLSearchParams(params);
    await fetch(url, { method: 'POST' })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setData(res.results);
    })
  }
  
  const onInputChange = (event) => {
    setInput(event.target.value);
   }

   const onButtonSubmit = () => {
    setSearch(input);
    getContent(search);
  }

  return (
    <div>
      <SongSearchForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} data={data}/>
      <CardList data={data}/>
    </div>
  );
}

export default App;


