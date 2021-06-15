import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button } from 'react-bootstrap';

const Message = ({ msg, variant }) => {
    const [show, setShow] = useState(true);
    if (show) {
      return (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            {msg}
        </Alert>
      );
    }
    return null;
}
  
Message.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Message