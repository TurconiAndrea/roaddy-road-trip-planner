"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter }
  from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";

interface Props {
  open:     boolean;
  title?:   string;
  message:  string;
  onConfirm: () => void;
  onClose:   () => void;
}

export default function ConfirmDialog({ open, title, message, onConfirm, onClose }: Props) {
  const lang = useLanguageStore(s => s.lang);
  const isIt = lang === "it";

  const dialogTitle = title || (isIt ? "Sei sicuro?" : "Are you sure?");

  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--muted-foreground)", fontSize: 14, padding: "4px 0" }}>
          {message}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{isIt ? "Annulla" : "Cancel"}</Button>
          <Button onClick={() => { onConfirm(); onClose(); }}
                  style={{ background: "#EF4444", color: "white" }}>
            {isIt ? "Reset" : "Reset"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
