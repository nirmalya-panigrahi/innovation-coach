import {useCallback, useEffect, useState} from 'react';
import type {ModalSection} from '../types/coach';

export function useDialogState() {
  const [activeModal, setActiveModal] = useState<ModalSection>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openModal = useCallback((section: Exclude<ModalSection, null>) => {
    setIsDrawerOpen(false);
    setActiveModal(section);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const resetAll = useCallback(() => {
    setIsDrawerOpen(false);
    setActiveModal(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false);
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    activeModal,
    isDrawerOpen,
    openModal,
    closeModal,
    toggleDrawer,
    closeDrawer,
    resetAll,
  };
}
