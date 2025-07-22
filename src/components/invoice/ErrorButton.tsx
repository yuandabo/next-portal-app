"use client";
import { Button } from "../ui/button";

function Page() {
  return (
    <Button
      onClick={() => {
        throw new Error("test");
      }}
    >
      抛出错误
    </Button>
  );
}

export default Page;
