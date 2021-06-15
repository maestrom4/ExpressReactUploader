
import React from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import FileUpload from './components/FileUpload'
import './App.css';

const App = () => <div className="container mt-4">
    <h4 className="display-4 text-center mb-4"> 
    <FaCloudUploadAlt /> React Upload File
    </h4>
    <FileUpload />
</div>

export default App;
