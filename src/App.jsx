import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Conversations from "./pages/Conversations"
import ConversationDetail from "./pages/ConversationDetail"
import Customers from "./pages/Customers"
import Settings from "./pages/Settings"
import AIAssistant from "./pages/AIAssistant"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="conversations" element={<Conversations />} />
        <Route path="conversations/:id" element={<ConversationDetail />} />
        <Route path="customers" element={<Customers />} />
        <Route path="ai-assistant" element={<AIAssistant />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
