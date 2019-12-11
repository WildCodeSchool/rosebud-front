import React, { Component } from 'react';

class UploadImage extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="container">
        <h1>File Upload</h1>
        {typeof msg !== 'undefined' ? msg : ''}
        <form action="/upload" method="POST" encType="multipart/form-data">
          <div className="file-field input-field">
            <div className="btn grey">
              <span>File</span>
              <input name="myImage" type="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <br />
        <img
          src={typeof file !== 'undefined' ? file : ''}
          className="responsive-img"
          alt="prévisualisation"
        />
      </div>
    );
  }
}

export default UploadImage;
