import React from "react";
import { RotatingLines } from 'react-loader-spinner';
import css from "./Loader.module.css";

class Loader extends React.Component {
  render() {
    return (
      <div className={css.Loader}>
        <RotatingLines
          strokeColor="blueviolet"
          strokeWidth="5"
          animationDuration="1.5"
          width="96"
          visible={true}
        />
      </div>
    )
  }
}

export default Loader;