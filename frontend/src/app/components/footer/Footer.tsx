"use client";

import FeedbackForm from "../feedback/FeedbackForm";

const Footer = () => {
  return (
    <>
      <hr className="w-full my-12"></hr>
      <div className="w-full h-fit flex flex-row bg-gradient-to-t from-orange-200 to-white">
        <div className="mx-auto my-10">
          <h1 className="text-4xl">Tell us your Ubin story!</h1>
          <FeedbackForm />
        </div>
      </div>
    </>
  );
};
export default Footer;
