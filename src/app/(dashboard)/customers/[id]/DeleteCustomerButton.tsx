"use client";

import { Button } from "@/components/ui/button";

export default function DeleteCustomerButton() {
  return (
    <Button variant="destructive" type="submit" onClick={(e) => {
      if (!confirm('Are you sure you want to delete this customer?')) {
        e.preventDefault();
      }
    }}>
      Delete
    </Button>
  );
}
