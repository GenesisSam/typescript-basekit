import * as React from "react";
import * as firebase from "firebase";


interface IHelloState {
  userEmail: string;
  userPassword: string;
  CurrentUserAuth: any;
}

export default class Hello extends React.Component<{}, IHelloState> {
  public constructor(props: any) {
    super(props);
    const fbDB = this.initFirebaseDB();

    const user = firebase.auth().currentUser;

    this.state = {
      userEmail: "",
      userPassword: "",
      CurrentUserAuth: user,
    };
  }

  public componentDidMount() {
    
  }

  public render() {
    const { CurrentUserAuth } = this.state;

    let userStateForm = (
      <form>
        <input name="email" type="email" placeholder="User email" onChange={this.handleEmailText.bind(this)} required/>
        <input name="password" type="password" placeholder="Password" onChange={this.handlePasswordText.bind(this)} required/>
        <br/>
        <input type="submit" value="로그인" onClick={this.handleOnSubmit.bind(this)}/>
        <input type="button" value='회원가입' onClick={this.handleOnSubmitSignUp.bind(this)}/>
      </form>
    );

    if (CurrentUserAuth) {
      userStateForm = CurrentUserAuth.map((profile: any) => {
        return (
          <div>
            Email: {profile.email}<br/>
            Name: {profile.displayName}<br/>
            UID: {profile.uid}
          </div>
        );
      });
    }

    return (
      <div>
        <h1>HELLO WORLD!!</h1>
        {userStateForm}
      </div>
    );
  }

  private initFirebaseDB() {
    const config = {
      
    };

    firebase.initializeApp(config);
    return firebase.database();
  }

  private handleEmailText(e: any) {
    this.setState({
      userEmail: e.target.value,
    });
  }

  private handlePasswordText(e: any) {
    this.setState({
      userPassword: e.target.value,
    })
  }

  private handleOnSubmit(e: any) {
    e.preventDefault();
    const { userEmail, userPassword } = this.state;
    // const credential = firebase.auth.EmailAuthProvider.credential(userEmail, userPassword);
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((res) => {
      this.setState({
        CurrentUserAuth: res.providerData
      });
      
    }).catch((err) => {
      const errorCode = (err as any).code;
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
      this.setState({
        CurrentUserAuth: res.providerData
      });
      
    }).catch((err) => {
      const errorCode = (err as any).code;
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
