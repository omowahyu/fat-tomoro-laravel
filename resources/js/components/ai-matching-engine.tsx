"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, CheckCircle, AlertTriangle, Zap, RefreshCw } from "lucide-react"

interface MatchingResult {
  id: string
  channel: string
  biAmount: number
  bankAmount: number
  confidence: number
  status: "matched" | "partial" | "unmatched"
  reason?: string
}

const mockResults: MatchingResult[] = [
  {
    id: "1",
    channel: "GoFood",
    biAmount: 7950000,
    bankAmount: 7900000,
    confidence: 95,
    status: "partial",
    reason: "Selisih Rp 50.000 - kemungkinan fee belum dipotong",
  },
  {
    id: "2",
    channel: "GrabFood",
    biAmount: 7050000,
    bankAmount: 7050000,
    confidence: 100,
    status: "matched",
  },
  {
    id: "3",
    channel: "ShopeeFood",
    biAmount: 2500000,
    bankAmount: 0,
    confidence: 0,
    status: "unmatched",
    reason: "Tidak ditemukan transaksi di bank - kemungkinan pending payout",
  },
]

export function AIMatchingEngine() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<MatchingResult[]>([])

  const startMatching = () => {
    setIsProcessing(true)
    setProgress(0)
    setResults([])

    // Simulate AI processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setResults(mockResults)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>AI Matching Engine</span>
            </CardTitle>
            <CardDescription>AI Agentic untuk verifikasi dan matching otomatis</CardDescription>
          </div>
          <Button onClick={startMatching} disabled={isProcessing}>
            {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
            {isProcessing ? "Processing..." : "Start AI Matching"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>AI Processing Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">
              Analyzing patterns, matching transactions, detecting anomalies...
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>
                AI telah selesai menganalisis {results.length} channel. Review hasil matching sebelum approve.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {results.map((result) => (
                <div key={result.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{result.channel}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {result.confidence}% confidence
                      </Badge>
                      <Badge
                        variant={
                          result.status === "matched"
                            ? "default"
                            : result.status === "partial"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {result.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div>
                      <span className="text-muted-foreground">BI Amount:</span>
                      <span className="ml-2 font-medium">Rp {result.biAmount.toLocaleString("id-ID")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Bank Amount:</span>
                      <span className="ml-2 font-medium">Rp {result.bankAmount.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {result.reason && (
                    <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                      {result.status === "matched" ? (
                        <CheckCircle className="h-3 w-3 mt-0.5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mt-0.5 text-yellow-500" />
                      )}
                      <span>{result.reason}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Matched: {results.filter((r) => r.status === "matched").length} | Partial:{" "}
                {results.filter((r) => r.status === "partial").length} | Unmatched:{" "}
                {results.filter((r) => r.status === "unmatched").length}
              </div>
              <Button>Approve AI Results</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
