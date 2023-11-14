"use client";
import React, {useState, useEffect} from 'react';
import {useQuery, useMutation, useSubscription} from "@apollo/client";
import { GET_BILLS, BILL_AMOUNT_EDITED,BILL_AMOUNT_SUBSCRIPTION } from "../../queries/bills";

export default function Cards() { 
  
  const { loading, error, data: billsData } = useQuery(GET_BILLS);
  const [editBillAmount] = useMutation(BILL_AMOUNT_EDITED);

  const {data, loading: loadingSub} = useSubscription(BILL_AMOUNT_SUBSCRIPTION);
  
  const [billAmountInput, setBillAmountInput] = useState(Array(billsData?.bills.length).fill(''));

  useEffect(()=>{
    if(!loading && billsData){
      const billsAmount = billsData?.bills.map(billData => billData.billAmount);
      setBillAmountInput(billsAmount);
    }
  },[billsData,data])

  if (loading) return <p>Loading Table...</p>;
  
  if (error) return <p>Error : {error.message}</p>;
  
    return (
      <table>
        <thead>
          <tr >
            <th>Company</th>
            <th>Owner</th>
            <th>Bill Amount</th>
          </tr>
        </thead>
        <tbody>
        {billsData?.bills.map((item,index) =>(
        <tr key={item.id}>
          <td>
            {item.companyName}
          </td>
          <td>
            {item.owner}
          </td>
          <td>
            <form
               onSubmit={e => {
                e.preventDefault();
                editBillAmount({
                  variables: {billId: item.id, billAmount: parseFloat(billAmountInput)} 
                });
              }}
            >
             <input
              placeholder={item.billAmount}
              value={billAmountInput[index]}
              onChange={e => {
                setBillAmountInput(parseFloat(e.target.value))             
              }}
            />
            </form>
          </td>
      </tr>)
      )}
      </tbody>
  </table>
    )
  }