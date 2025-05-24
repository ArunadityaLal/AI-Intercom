"use client"

import { useState, useEffect } from "react"
// Removed Gemini import as we're using OpenAI API directly
import {
  Bot, Zap, Settings, Sparkles, MessageSquare,
  Lightbulb, RefreshCw
} from 'lucide-react'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "../components/ui/card"
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"

export default function AIAssistant() {
  const [isLoading, setIsLoading] = useState(true)
  const [promptText, setPromptText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleGenerate = async () => {
    if (!promptText.trim()) return
    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",  // or "gpt-4o" if available
          messages: [
            { role: "user", content: promptText }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const aiMessage = data.choices[0].message.content

      setGeneratedContent(aiMessage)
    } catch (err) {
      setGeneratedContent("❌ Failed to generate response. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const aiSuggestions = [
    {
      id: 1,
      title: "Checkout Bug Response",
      description: "Generate a response for customers reporting checkout issues",
    },
    {
      id: 2,
      title: "Refund Request",
      description: "Create a template for handling refund requests",
    },
    {
      id: 3,
      title: "Feature Request Acknowledgment",
      description: "Acknowledge a customer's feature request professionally",
    },
    {
      id: 4,
      title: "Technical Support Guide",
      description: "Generate step-by-step troubleshooting instructions",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-intercom-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading AI Assistant...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">Leverage AI to enhance your customer support</p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="generate">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="templates">
              <MessageSquare className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Generate AI Response</CardTitle>
                  <CardDescription>
                    Describe what you need, and our AI will generate a response for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="prompt">Your Prompt</Label>
                      <Textarea
                        id="prompt"
                        placeholder="E.g., Write a response to a customer who is having trouble with checkout"
                        className="mt-1 min-h-[150px]"
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleGenerate}
                      disabled={!promptText.trim() || isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Generate Response
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium">Suggested Prompts</h3>
                    <div className="mt-2 space-y-2">
                      {aiSuggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="cursor-pointer rounded-md border p-3 hover:bg-secondary/50"
                          onClick={() => setPromptText(suggestion.description)}
                        >
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{suggestion.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Response</CardTitle>
                  <CardDescription>The AI-generated content will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap rounded border bg-muted p-4 text-sm">
                    {generatedContent || "No response generated yet."}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid gap-4 md:grid-cols-2">
              {aiSuggestions.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      onClick={() => setPromptText(template.description)}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Assistant Settings</CardTitle>
                <CardDescription>Customize how the AI assistant behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-toggle">Enable AI Suggestions</Label>
                  <Switch id="ai-toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="typing-effect">Typing Animation</Label>
                  <Switch id="typing-effect" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
