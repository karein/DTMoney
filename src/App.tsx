import { ThemeProvider } from 'styled-components'

import { TransactionsProvider } from './contexts/TransactionsContext'

import { Transactions } from './pages/Transactions'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
