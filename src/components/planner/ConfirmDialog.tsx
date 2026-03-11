"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter }
  from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open:     boolean;
  title?:   string;
  message:  string;
  onConfirm: () => void;
  onClose:   () => void;
}

export default function ConfirmDialog({ open, title = "Are you sure?", message, onConfirm, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--muted-foreground)", fontSize: 14, padding: "4px 0" }}>
          {message}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { onConfirm(); onClose(); }}
                  style={{ background: "#EF4444", color: "white" }}>
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
