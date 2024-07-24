"use client";
import * as Form from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";

const FormDemo = () => (
  <Form.Root className="FormRoot w-full my-10">
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
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="Input" type="email" required />
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
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter a question
        </Form.Message>
      </div>
      <Form.Control asChild>
        <textarea className="Textarea" required />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <Button
        size="3"
        color="orange"
        variant="surface"
        className="w-full mt-10"
      >
        Send
      </Button>
    </Form.Submit>
  </Form.Root>
);

export default FormDemo;
