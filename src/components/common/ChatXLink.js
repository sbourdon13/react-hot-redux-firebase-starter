import React from 'react';
import { Link } from 'react-router';

const ChatXLink = () => {
  return (
    <span>
      {" | "}
      <Link to="/chatX" activeClassName="active">ChatX</Link>
    </span>
  );
};

export default ChatXLink;
