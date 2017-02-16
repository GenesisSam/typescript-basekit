import * as React from "react";

const styles = require("./Hello.css");

export default class Hello extends React.Component<{}, {}> {
  public componentDidMount() {
    console.log("componentDidMount");
  }

  public render() {
    return (
      <h1 className={styles.container}>HELLO WORLD!!</h1>
    );
  }
}
