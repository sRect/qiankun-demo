import React from 'react';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="home">
      base react home page
      <div>
        <Link to="/">home</Link> | 
        <Link to="/baseAbout">about</Link> | 
        <Link to="/modelShow">model show</Link> |
      </div>
    </div>
  );
}

export default App;
