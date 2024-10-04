import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function ChatInterface() {
  const [input, setInput] = useState('');
  const [domain, setDomain] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [view, setView] = useState('lookup'); 

  const handleInput = event => setInput(event.target.value);
  const handleDomainChange = event => setDomain(event.target.value);
  const handleLevelChange = event => setLevel(event.target.value);

  const toggleView = () => {
    setView(view === 'lookup' ? 'list' : 'lookup');
    setResponseData(null); 
    setError('');
  };

  const handleLookupSubmit = async () => {
    setLoading(true);
    setError('');
    setResponseData(null);

    try {
      const response = await axios.post('http://localhost:3001/api/chatbot', {
        type: 'lookup',
        code: input
      });
      setResponseData(response.data);
    } catch (error) {
      setError('Failed to lookup milestone');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleListSubmit = async () => {
    setLoading(true);
    setError('');
    setResponseData(null);

    try {
      const response = await axios.post('http://localhost:3001/api/chatbot', {
        type: 'list',
        domain,
        level
      });
      setResponseData(response.data);
    } catch (error) {
      setError('Failed to list milestones');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    if (responseData.description) {
      return (
        <div className="response-card">
          <h3>Milestone Description</h3>
          <p>{responseData.description}</p>
        </div>
      );
    } else if (responseData.milestones) {
      return (
        <div className="response-list">
          <h3>Milestones List</h3>
          {responseData.milestones.map((milestone, index) => (
            <div key={index} className="response-card">
              <p><strong>{milestone.code}:</strong> {milestone.description}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Milestone Lookup and Listing</h2>

        <button className="toggle-button" onClick={toggleView}>
          {view === 'lookup' ? 'Switch to List Milestones' : 'Switch to Lookup Milestone'}
        </button>

        {view === 'lookup' ? (
          <>
            <h3>Lookup Milestone</h3>
            <input
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Enter milestone code"
              disabled={loading}
            />
            <button onClick={handleLookupSubmit} disabled={loading || !input}>
              Lookup Milestone
            </button>
          </>
        ) : (
          <>
            <h3>List Milestones by Domain and Level</h3>
            <select value={domain} onChange={handleDomainChange} disabled={loading}>
              <option value="">Select Domain</option>
              <option value="Mand">Mand</option>
              <option value="Tact">Tact</option>
              <option value="Listener Responding">Listener Responding</option>
            </select>

            <select value={level} onChange={handleLevelChange} disabled={loading}>
              <option value="">Select Level</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>

            <button onClick={handleListSubmit} disabled={loading || !domain || !level}>
              List Milestones
            </button>
          </>
        )}

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className={`response-container ${responseData ? 'show' : ''}`}>
          {renderResponse()}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;