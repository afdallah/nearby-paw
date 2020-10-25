import React from 'react';

function info (textMessage) {
  return (
    <div class="message">
      {textMessage}
    </div>
  )
}

// message.info
export const message = {
  info,
}