import React, { Component } from "react";
import "./UploadImage.css";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      file: [],
      curr: null,
      affiche: false
    };
  }

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
    if (this.state.affiche) {
      this.setState({ affiche: false });
    }
  }

  handleUpload = event => {
    let newFile = URL.createObjectURL(event.target.files[0]);
    localStorage.setItem(`image ${this.props.id}`, JSON.stringify(newFile));
    this.setState({ affiche: true });
  };

  render() {
    const imgCurrent = JSON.parse(localStorage.getItem(`image ${this.props.id}`));
    return (
      <div className="container">
        <h1>File Upload</h1>

        <form action="/upload" method="POST" encType="multipart/form-data">
          <div className="file-field input-field">
            <div className="btn grey">
              <span>File</span>
              <input name="myImage" type="file" onChange={this.handleUpload} />
            </div>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
        <br />
        <div>
          <img className="test" src={imgCurrent} alt='affiche de film' />
        </div>
      </div>
    );
  }
}

export default UploadImage;
