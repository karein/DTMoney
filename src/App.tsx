import { useState } from 'react'

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from './components/NewTransactionModal';

import { GlobalStyles } from "./styles/global";


export function App() {
  const [isNewtransactionModalOpen, setIsNewtransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewtransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewtransactionModalOpen(false)
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal isOpen={isNewtransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

      <GlobalStyles />
    </>
  );
}