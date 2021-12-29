import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <Spinner
        type="CradleLoader"
        color="#00BFFF"
        height={300}
        width={320}
        timeout={5000} //3 secs
      />
    );
  }
}

export default Loader;
