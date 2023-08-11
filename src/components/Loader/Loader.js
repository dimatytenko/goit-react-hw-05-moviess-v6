import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { LoaderBox } from "./Loader.styled";

const Loader = () => {
  return (
    <LoaderBox>
      <Spinner
        type="CradleLoader"
        color="#00BFFF"
        height={300}
        width={320}
        timeout={5000}
      />
    </LoaderBox>
  );
};

export default Loader;
