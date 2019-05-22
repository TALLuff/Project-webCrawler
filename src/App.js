import React from "react";
import "./style.css";
import writeFileP from "write-file-p";

class App extends React.Component {
  state = {
    download: false,
    "200": ["/apples.html", "/salmon.html", "/oranges.html"],
    "404": ["/stilton.html", "/garbage.html"]
  };

  componentDidUpdate() {
    if (this.state.download === true) {
      return (
        <a href="./testWrite.txt" download>
          Download
        </a>
      );
    }
  }

  writeAndDownload = () => {
    var textToWrite = document.getElementById("inputTextToSave").value;
    var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs")
      .value;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  };

  sendUrl = () => {
    // writeFileP(
    //   "./testWrite.txt",
    //   `200: ${this.state["200"]}, 400: ${this.state["400"]}`,
    //   (err, data) => {
    //     console.log(err || data);
    //   }
    // );
    this.setState({ download: true });
  };

  downloadButton = () => {
    return <a />;
  };

  render() {
    return (
      <body className="App">
        <h1>Web Crawler</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.sendUrl();
          }}
        >
          <input placeholder="Enter the URL you want to check" />
          <button type="submit">Search</button>
        </form>
        {this.downloadButton}
      </body>
    );
  }
}

export default App;
