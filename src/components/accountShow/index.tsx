import * as React from "react";
import * as firebase from "firebase";
import { Card, CardActions, CardHeader, CardText, CardTitle } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { IWalletData, IAccounts } from "../../types";

interface IAccountsShowState {
  isLoading: boolean;
  isFailed: boolean;
  accountState: IAccounts;
}

export default class AccountShow extends React.Component<{}, IAccountsShowState> {

  public constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      isFailed: false,
      accountState: null,
    }
  }

  public componentDidMount() {
    this.handleGetAccounts();
  }

  public render() {
    const { accountState } = this.state;

    let rows = null;
    if (accountState) {
      rows = accountState.datas.map((item: IWalletData, index: number) => {
        return (
          <Card key={`account_item_key_${index}`}>
            <CardHeader
              title={item.displayName}
              subtitle={item.bankType}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardTitle title={item.accountNumber}/>
            <CardText expandable={true}>
              {item.extraData}
            </CardText>
            <CardActions>
              <FlatButton label="복사" onClick={this.onClickCopyHandler.bind(this)}/>
            </CardActions>
          </Card>
        );
      });
    }

    return (
      <div>
        {rows}
      </div>
    );
  }

  private handleGetAccounts() {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const accountsRef = firebase.database().ref().child("accounts").child(uid);
    accountsRef.on("value", (snap: firebase.database.DataSnapshot) => {
      if (snap.val()) {
        this.setState({
          accountState: snap.val(),
        });
      }
    });

  }

  private onClickCopyHandler() {
    // const { accountState } = this.state;
  }
}
