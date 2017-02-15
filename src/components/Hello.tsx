import * as React from "react";
import * as firebase from "firebase";


interface IHelloState {
  userEmail: string;
  userPassword: string;
  currentUserInfo: firebase.UserInfo;
}

export default class Hello extends React.Component<{}, IHelloState> {
  public constructor(props: any) {
    super(props);
    const user = firebase.auth().currentUser;

    this.state = {
      userEmail: "",
      userPassword: "",
      currentUserInfo: user,
    };
  }

  public render() {
    const { currentUserInfo } = this.state;

    let userStateForm = (
      <form>
        <input name="email" type="email" placeholder="User email" onChange={this.handleEmailText.bind(this)} required autoFocus/>
        <input name="password" type="password" placeholder="Password" onChange={this.handlePasswordText.bind(this)} required/>
        <br/>
        <input type="submit" value="로그인" onClick={this.handleOnSubmit.bind(this)}/>
        <input type="button" value="회원가입" onClick={this.handleOnSubmitSignUp.bind(this)}/>
      </form>
    );

    if (currentUserInfo) {
      userStateForm = (
        <div>
          Email: {currentUserInfo.email}<br/>
          Name: {currentUserInfo.displayName}<br/>
          UID: {currentUserInfo.photoURL}
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
    const { userEmail, userPassword } = this.state;
    // const credential = firebase.auth.EmailAuthProvider.credential(userEmail, userPassword);
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((res) => {
      const uid = res.uid;

      const userInfoRef = firebase.database().ref().child("users").child(uid);
      userInfoRef.on("value", (snap: firebase.database.DataSnapshot) => {
        console.log(snap.val());
      });

    }).catch((err: firebase.FirebaseError) => {
      const errorCode = err.code;
      const errorMSG = err.message;

      if (errorCode === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert(errorMSG);
      }

      console.log(err);
    });
  }

  private handleOnSubmitSignUp(e: any) {
    e.preventDefault();
    const { userEmail, userPassword } = this.state;
    // const credential = firebase.auth.EmailAuthProvider.credential(userEmail, userPassword);
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((res) => {
      const uid = res.uid;
      res.providerData.forEach((profile: firebase.UserInfo) => {
        firebase.database().ref().child("users").child(uid).set({
          displayName: profile.displayName ? profile.displayName : "",
          email: profile.email,
          photoURL: profile.photoURL ? profile.photoURL : "",
        });
        this.setState({
          currentUserInfo: profile,
        });
      });
    }).catch((err: firebase.FirebaseError) => {
      const errorCode = err.code;
      const errorMSG = err.message;

      if (errorCode === "auth/weak-password") {
        alert("Weak password");
      } else {
        alert(errorMSG);
      }
      console.log(err);
    });
  }
}
