"use client";

import FeedbackForm from "../feedback/FeedbackForm";

const Footer = () => {
  return (
    <div className="my-16 w-full h-64 flex flex-row">
      <div className="mx-auto my-10">
        <h1 className="text-4xl">Tell us your Ubin story!</h1>
        <FeedbackForm />
      </div>
    </div>
  );
};
export default Footer;
