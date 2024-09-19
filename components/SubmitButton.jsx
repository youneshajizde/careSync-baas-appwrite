import React from "react";
import { Button } from "./ui/button";

function SubmitButton({ isLoading, title, className }) {
  return (
    <Button className={className ?? "button-accept"} type="submit">
      {isLoading ? "Wait a bit..." : title}
    </Button>
  );
}

export default SubmitButton;
