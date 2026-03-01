import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import { config } from './lib/wagmi'
import { Layout } from './components/Layout'
import { HomePage } from './pages/Home'
import { TimestampPage } from './pages/Timestamp'
import { ActivityPage } from './pages/Activity'
import { CertificatePage } from './pages/Certificate'
import { ValidatorPage } from './pages/Validator'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timestamp" element={<TimestampPage />} />
                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/certificate/:hash" element={<CertificatePage />} />
                <Route path="/validate" element={<ValidatorPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
