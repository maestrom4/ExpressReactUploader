import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import Message from './Message'
import Progress from './Progress'

// import PropTypes from 'prop-types'

const FileUpload = () => {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('danger');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleInputChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }, 
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          setTimeout(() => setUploadPercentage(0), 10000)
        },
        
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage('File Uploaded');
      setVariant('success');
    } catch(err) {
      if(err.response.status === 500) {
       setMessage('There was a problem with the server: ', err.response.data.msg);
       setVariant('danger');
      }
      else {
       setMessage(err.response.data.msg);
      }
    }
  }

  const showUploadedImage = <div className="row mt-5">
    <div className="col-md-6 m-auto">
      <h3 className="text-center">{ uploadedFile.fileName }</h3>
      <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
    </div>
  </div>;

  return (
   
    <>
     {message ? <Message msg={message} variant={variant}/> : null }
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFileXs" className="custom-file mb-3">
              <Form.Label className="custom-file-label">{fileName}</Form.Label>
              <Form.Control onChange={handleInputChange} placeholder="Last name" label="fsf" type="file" size="xs" label="Enter ex"/>
              <Button type="submit" size="md" className="mt-3 w-100">Upload</Button>
          </Form.Group>
      </Form>
      { uploadedFile ? showUploadedImage: null }
      <Progress percentage={uploadPercentage} />
    </>
  );
}
export default FileUpload;