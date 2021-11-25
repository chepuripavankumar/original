import React from 'react';

export const ErrorFallbackComponent = ({message = "Something Gone Wrong" }) => {
    return (
      <div>
        <h1>An error occurred: {message}</h1>
      </div>
    );
  };
  