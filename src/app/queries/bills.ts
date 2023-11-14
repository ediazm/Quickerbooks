import { gql } from "@apollo/client";

export const GET_BILLS = gql`query Bills {
    bills{
        id
        owner
        companyName
        billAmount
    }
}`;

export const BILL_AMOUNT_EDITED = gql`
  mutation changeBillAmount($billId: ID, $billAmount: Float) {
  editBillAmount(billId: $billId,billAmount: $billAmount) {
    message
  }
}
`;

export const BILL_AMOUNT_SUBSCRIPTION = gql`
  subscription BillSubscription($billId: ID, $billAmount: Float){
  billEdited(billId: $billId, billAmount: $billAmount) {
    id
    billAmount
  }
}
`;
