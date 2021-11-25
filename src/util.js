function processResponse( array) {
    let dataArray=[];
   array.forEach(e => {
     let payment={};
     payment.amount=e.paymentAmount;
     payment.currency=e.paymentCurrency;
     payment.type=e.paymentType;
     payment.date=e.paymentDate,
     payment.status=e.paymentStatus;
     payment.toAccount=e.toAccaunt.accountNumber;
     payment.fromAccount=e.fromAccount.accountNumber;
     dataArray.push(payment);
   });
   return dataArray;
 }

 export default processResponse;