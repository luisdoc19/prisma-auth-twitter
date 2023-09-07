"use client";
import React, { useEffect, useState } from "react";
import UsernameModal from "../modals/UsernameModal";
import UserinfoModal from "../modals/UserinfoModal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <UsernameModal />
      <UserinfoModal />
    </>
  );
};

export default ModalProvider;
