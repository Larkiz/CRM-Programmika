import { useState } from "react";

export const useModalControl = () => {
  const [modal, setModal] = useState({ show: false, data: null });
  function modalClose() {
    setModal({ show: false, data: null });
  }
  function modalOpen(data = null) {
    setModal({ show: true, data: data });
  }
  function modalToggler() {
    setModal({ ...modal, show: !modal.show });
  }
  function setModalData(data) {
    setModal({ ...modal, data: data });
  }
  function clearModal(data) {
    setModal({ show: false, data: null });
  }
  return {
    modalData: modal,
    modalClose,
    modalOpen,
    modalToggler,
    setModalData,
    clearModal,
  };
};
