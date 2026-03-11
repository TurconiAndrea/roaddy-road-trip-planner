"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter }
  from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open:    boolean;
  feature: string;
  onClose: () => void;
}

export default function ComingSoonDialog({ open, feature, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Coming Soon</DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--muted-foreground)", fontSize: 14, padding: "4px 0" }}>
          <strong>{feature}</strong> is not available yet. Stay tuned!
        </p>
        <DialogFooter>
          <Button onClick={onClose}
                  style={{ background: "var(--accent)", color: "white" }}>
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
