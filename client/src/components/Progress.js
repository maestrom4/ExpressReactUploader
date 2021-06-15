import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, ProgressBar } from 'react-bootstrap';

const Progress = ({ percentage }) => {
    return (
        <ProgressBar animated now={percentage} label={`${percentage}%`}/>
    );
}
  
Progress.propTypes = {
    percentage: PropTypes.number.isRequired,
}

export default Progress