"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter }
  from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/languageStore";

interface Props {
  open:    boolean;
  feature: string;
  onClose: () => void;
}

export default function ComingSoonDialog({ open, feature, onClose }: Props) {
  const lang = useLanguageStore(s => s.lang);
  const isIt = lang === "it";

  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isIt ? "In arrivo a breve" : "Coming Soon"}</DialogTitle>
        </DialogHeader>
        <p style={{ color: "var(--muted-foreground)", fontSize: 14, padding: "4px 0" }}>
          {isIt ? (
            <>La funzionalità <strong>{feature}</strong> non è ancora disponibile. Resta sintonizzato!</>
          ) : (
            <><strong>{feature}</strong> is not available yet. Stay tuned!</>
          )}
        </p>
        <DialogFooter>
          <Button onClick={onClose}
                  style={{ background: "var(--accent)", color: "white" }}>
            {isIt ? "Ho capito" : "Got it"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
