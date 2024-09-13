import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"

function SuspiciousActivityModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspicious Activity Detected</DialogTitle>
          <DialogDescription>
            We've detected suspicious activity on your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => {/* View details */}}>View Details</Button>
          <Button onClick={() => {/* Take action */}}>Take Action</Button>
          <Button variant="outline" onClick={() => {/* Ask AI */}}>Ask AI</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SuspiciousActivityModal;
