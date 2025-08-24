import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import StarRating from './components/StarRating';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} />

    <StarRating maxRating={10} />
    <StarRating /> */}

  </React.StrictMode>
);

