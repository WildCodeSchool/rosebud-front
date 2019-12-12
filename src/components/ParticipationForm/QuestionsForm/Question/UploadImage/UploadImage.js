import React, { Component } from "react";

class UploadImage extends Component {
  state = {
    data: [],
    isLoading: false,
    file: null
  };

  fetchData() {
    fetch("/upload", {
      method: "POST"
    })
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(error => console.log("ERROR"));
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading !== prevState.isLoading) {
      this.fetchData();
      console.log("didupdate");
    }
  }

  handleUpload = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      isLoading: true
    });
  };

  render() {
    return (
      <div className="container">
        <h1>File Upload</h1>
        
        <form
          action={this.state.data.file === "undefined" ? "/" : "/upload"}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="file-field input-field">
            <div className="btn grey">
              <span>File</span>
              <input name="myImage" type="file" onChange={this.handleUpload} />
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
        {this.state.isLoading && <img
          src={this.state.file}
          className="responsive-img"
          alt="prévisualisation"
        /> }
        
      </div>
    );
  }
}

export default UploadImage;
