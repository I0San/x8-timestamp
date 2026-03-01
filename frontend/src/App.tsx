import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import { config } from './lib/wagmi'
import { Layout } from './components/Layout'
import { HomePage } from './pages/Home'
import { TimestampPage } from './pages/Timestamp'
import { ActivityPage } from './pages/Activity'
import { CertificatePage } from './pages/Certificate'
import { ValidatorPage } from './pages/Validator'

const queryClient = new QueryClient()

const x8Theme = lightTheme({
  accentColor: '#dbc27d',
  accentColorForeground: '#231f20',
  borderRadius: 'medium',
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={x8Theme}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timestamp" element={<TimestampPage />} />
                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/certificate/:hash" element={<CertificatePage />} />
                <Route path="/validate" element={<ValidatorPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
