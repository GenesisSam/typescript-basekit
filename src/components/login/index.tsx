import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as firebase from "firebase";

import { userSignIn, userSignOut, userSignUp, userAlreadySignIn } from "./actions";
import { IUserState, IUserInformation } from "./reducer";

interface IHelloProps {
  dispatch: Dispatch<any>;
  currentUser: IUserState;
}

interface IHelloState {
  userEmail: string;
  userPassword: string;
}

function mapStateToProps(state: any) {
  return {
    currentUser: state.reduerUser,
  };
}

class LoginComponent extends React.Component<IHelloProps, IHelloState> {
  public constructor(props: IHelloProps) {
    super(props);

    this.state = {
      userEmail: "",
      userPassword: "",
    };
  }

  public componentDidMount() {
    firebase.auth().onAuthStateChanged((user: any) => {
      const { dispatch } = this.props;
      dispatch(userAlreadySignIn());
    });
  }

  public render() {
    const { currentUser } = this.props;

    let userStateForm = (
      <form>
        <input name="email" type="email" placeholder="User email" onChange={this.handleEmailText.bind(this)} required autoFocus/>
        <input name="password" type="password" placeholder="Password" onChange={this.handlePasswordText.bind(this)} required/>
        <br/>
        <input type="submit" value="로그인" onClick={this.handleOnSubmit.bind(this)}/>
        <input type="button" value="회원가입" onClick={this.handleOnSubmitSignUp.bind(this)}/>
      </form>
    );

    if (currentUser && currentUser.currentUser && currentUser.currentUser.email) {
      userStateForm = (
        <div>
          Email: {currentUser.currentUser.email}<br/>
          Name: {currentUser.currentUser.displayName}<br/>
          PhotoURL: {currentUser.currentUser.photoURL} <br/>
          <button onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
      );
    }

    return (
      <div>
        <h1>HELLO WORLD!!</h1>
        {userStateForm}
      </div>
    );
  }

  private handleLogout() {
    const { dispatch } = this.props;
    dispatch(userSignOut());
  }

  private handleEmailText(e: any) {
    this.setState({
      userEmail: e.target.value,
    });
  }

  private handlePasswordText(e: any) {
    this.setState({
      userPassword: e.target.value,
    });
  }

  private handleOnSubmit(e: any) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { userEmail, userPassword } = this.state;

    dispatch(userSignIn(userEmail, userPassword));
  }

  private handleOnSubmitSignUp(e: any) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { userEmail, userPassword } = this.state;

    dispatch(userSignUp(userEmail, userPassword));
  }

}


export default connect(mapStateToProps)(LoginComponent);

