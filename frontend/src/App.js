import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ChatInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
