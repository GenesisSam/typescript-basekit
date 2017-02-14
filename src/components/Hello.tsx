import * as React from "react";

export default class Hello extends React.Component<{}, {}> {
  public componentDidMount() {
    console.log("componentDidMount");
  }

  public render() {
    return (
      <h1>HELLO WORLD!!</h1>
    );
  }
}
