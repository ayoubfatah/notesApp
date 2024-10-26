import { useEffect, useRef } from "react";

export function useClickOutside(
  closeNoteForm: () => void,
  isNoteFormOpen: boolean
) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        closeNoteForm();
      }
    };

    if (isNoteFormOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isNoteFormOpen, closeNoteForm]);
  return { formRef };
}
