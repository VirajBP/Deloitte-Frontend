import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}

export default ErrorMessage;