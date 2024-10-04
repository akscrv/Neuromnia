import React, { useState } from 'react';

function ChatInterface() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInput = event => setInput(event.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: input })
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError('Failed to send message');
      console.error('There was a problem with your fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInput} disabled={loading} />
      <button onClick={handleSubmit} disabled={loading}>Submit</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ChatInterface;
