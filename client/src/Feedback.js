import React, {useState} from "react";
import axios from 'axios';

const Feedback = () => {
  const [values, setValue] = useState({
      name: '',
      email: '',
      message: '',
      phone: '',
      uploadedFiles: [],
      buttonText: 'Submit',
      uploadPhotosButtonText: 'Upload files'
  });

  // destructure state variables
  const {name, email, message, phone, uploadedFiles, buttonText, uploadPhotosButtonText: uploadPhotosButtonText} = values;

  // destructure env variables
  const {REACT_APP_API, REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_SECRET} = process.env;

  // event handler
  const handleChange = name => event => {
     setValue({...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    setValue({...values, buttonText: '...sending'})
    // send to backend for email
    // console.table({name, email, phone, message, uploadedFiles});
    axios({
        method: 'POST',
        url: `${REACT_APP_API}/feedback`,
        data: {name, email, phone, message, uploadedFiles}
    })
    .then(response => {
        console.log('feedback submit response', response);
    })
    .catch(error => {
        console.log('feedback submit error', error.response);
    })
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME, upload_preset: REACT_APP_CLOUDINARY_UPLOAD_SECRET, tags:['ebooks']},
        function(error, result) {
            // console.log(result);
            setValue({...values, uploadedFiles: result, uploadPhotosButtonText: `${result ? result.length : 0} Photos uploaded`})
        });
  }

  const feedbackForm = () => (
      <React.Fragment>

          <div className="form-group.pt-5">
              <button onClick={() => uploadWidget()} className="btn btn-outline-secondary btn-block p-5">{uploadPhotosButtonText}</button>
          </div>

          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label className="text-muted">Description</label>
                  <textarea 
                    onChange={handleChange('message')} 
                    type="text" 
                    className="form-control" 
                    value={message} 
                    required
                  ></textarea>
              </div>
              <div className="form-group">
                  <label className="text-muted">Your Name</label>
                  <input className="form-control" type="text" onChange={handleChange('name')} value={name} required/>
              </div>
              <div className="form-group">
                  <label className="text-muted">Your Email</label>
                  <input className="form-control" type="email" onChange={handleChange('email')} value={email} required/>
              </div>
              <div className="form-group">
                  <label className="text-muted">Your Phone</label>
                  <input className="form-control" type="number" onChange={handleChange('phone')} value={phone} required/>
              </div>

              <button className="btn btn-outline-primary btn-block">{buttonText}</button>
          </form>

      </React.Fragment>
  );

  return <div className="p-5">{feedbackForm()}</div>;
}

export default Feedback;
