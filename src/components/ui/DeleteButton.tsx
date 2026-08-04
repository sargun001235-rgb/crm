"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ReactNode } from "react";

export function DeleteButton({ text, iconOnly = false }: { text?: string, iconOnly?: boolean }) {
  return (
    <Button 
      variant="destructive" 
      size={iconOnly ? "sm" : "default"} 
      type="submit" 
      onClick={(e) => {
        if (!confirm(`Are you sure you want to delete this ${text || "item"}?`)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 className={iconOnly ? "h-4 w-4" : "mr-2 h-4 w-4"} />
      {!iconOnly && "Delete"}
    </Button>
  );
}
