import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { post } from "services/fetchDocuments";
import moment from "moment";

export default function PaymentHook({ details, fee, attachment }) {
  console.log(details);
  //   const publicKey = "pk_live_a97fdce9de54fcf3a99bc17a9fa22ba0d7201a6f";
  const publicKey = "pk_test_f6f2dc3bd34ccb1e1a6f8da42cf27061767c535c";
  const amount = fee * 100;
  const date = moment(new Date()).add(1, "day").format("YYYY-MM-DD");
  const [email, setEmail] = useState(details?.applied_by?.email);
  const [name, setName] = useState(
    `${details?.applied_by?.firstname} ${details?.applied_by?.lastname}`
  );
  const [phone, setPhone] = useState(details?.applied_by?.phone);

  const postToBackend = async (e) => {
    const formData =  new FormData();

    formData.append("request_id", details?.request_type_id);
    formData.append("attachments[]", attachment);
    formData.append("request_type_item_id", details?.request_type_item_id);
    formData.append("note", "Good");
    formData.append("payment_channel", "paystack");
    formData.append("pledge_date", date);
    formData.append("payment_response", JSON.stringify(e));
    

    const res = await post({
      endpoint: "donations",
      body: formData,
      // auth: false,
    });

    if (res.data.success) {
      //    handleOpen(true);
      // handleClose(true);
    } else {
      console.log(res);
    }
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (e) => {
      console.log(e);
      postToBackend(e);
      // alert("Thanks for doing business with us! Come back soon!!")
    },
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className="flex w-full">
      <div className="w-full rounded-full p-4 text-center font-bold bg-primary-main text-white">
        <PaystackButton {...componentProps} />
      </div>
    </div>
  );
}
