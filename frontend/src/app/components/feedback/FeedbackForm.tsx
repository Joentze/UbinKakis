"use client";
import * as Form from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

const FormDemo = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const feedbackData = {
      name,
      senderName: name,
      subject: "feedback",
      message: `from:${email}<br> ${question}`,
      senderEmail: "joentze01@gmail.com",
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error("Failed to send feedback");
      }

      console.log("Feedback sent successfully");
      setEmail("");
      setQuestion("");
      setName("");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center mt-10">Thank you for your feedback!</div>
    );
  }

  return (
    <Form.Root className="FormRoot w-full pb-32" onSubmit={handleSubmit}>
      <Form.Field className="FormField w-full" name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField w-full" name="name">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Name</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="Input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="FormField w-full" name="question">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Question</Form.Label>
        </div>
        <Form.Control asChild>
          <textarea
            className="Textarea"
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button
          size="3"
          color="orange"
          variant="classic"
          className="w-full mt-10"
        >
          Send
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default FormDemo;
