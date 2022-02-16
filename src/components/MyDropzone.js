import React, { Component } from "react";

class MyDropzone extends Component {
  render() {
    const { fileSelectedHandler } = this.props;
    return (
      <>
        <h5 style={{ padding: "1.5rem" }}> Attach photos:</h5>
        <div className="box" method="post">
          <input
            style={{ display: "none" }}
            type="file"
            onChange={fileSelectedHandler}
            ref={fileInput => (this.fileInput = fileInput)}
          />
          <button class="btn btn-light" onClick={() => this.fileInput.click()}>
            Upload photo
          </button>
          <button style={{ display: "none" }} class="btn btn-light">
            Upload
          </button>
        </div>
      </>
    );
  }
}

export default MyDropzone;
