export interface IWalletData {
  bankType: string;
  displayName: string;
  accountNumber: string;
  extraData: string;
}

export interface IAccounts {
  datas: IWalletData[];
}

export const INITIAL_IACOUNT = {
  datas: [{}],
};
