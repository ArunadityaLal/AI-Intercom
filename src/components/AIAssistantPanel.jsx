import { useState, useEffect } from "react"
import { Bot, Maximize2, Minimize2, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function AIAssistantPanel() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { text: input, sender: "user" }])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          text: getAIResponse(input),
          sender: "ai",
        },
      ])
    }, 1500)
  }

  const getAIResponse = (userInput) => {
    const responses = [
      "I can help with that! Let me analyze the conversation history for you.",
      "Based on the customer's message, I suggest focusing on their feature request.",
      "This appears to be a common issue. Here's a template response you can customize.",
      "The sentiment analysis shows this customer is frustrated. I recommend escalating this to a manager.",
      "I've found similar conversations in your knowledge base. Would you like me to summarize them?",
      "I can draft a response for you based on your previous interactions with this customer.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  useEffect(() => {
    const messageContainer = document.getElementById("ai-messages")
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight
    }
  }, [messages])

  return (
    <div className={`ai-assistant-panel ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="ai-assistant-header" onClick={toggleExpanded}>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </div>
      </div>

      {isExpanded && (
        <div className="ai-assistant-content">
          <div id="ai-messages" className="h-[calc(100%-40px)] overflow-y-auto mb-2">
            {messages.map((message, index) => (
              <div key={index} className={`message-bubble ${message.sender}`}>
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask your AI assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage()
              }}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              className="bg-intercom-primary hover:bg-intercom-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
