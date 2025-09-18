import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Send, CheckCircle } from "lucide-react"

interface ChannelSummary {
  channel: string
  grossSales: number
  comFee: number
  ads: number
  nettSales: number
  bankIn: number
  selisih: number
  status: "approved" | "pending" | "review"
}

const channelData: ChannelSummary[] = [
  {
    channel: "GoFood",
    grossSales: 10000000,
    comFee: -2000000,
    ads: -50000,
    nettSales: 7950000,
    bankIn: 7900000,
    selisih: -50000,
    status: "approved",
  },
  {
    channel: "GrabFood",
    grossSales: 9000000,
    comFee: -1800000,
    ads: -150000,
    nettSales: 7050000,
    bankIn: 7050000,
    selisih: 0,
    status: "approved",
  },
  {
    channel: "ShopeeFood",
    grossSales: 3000000,
    comFee: -450000,
    ads: -50000,
    nettSales: 2500000,
    bankIn: 0,
    selisih: -2500000,
    status: "review",
  },
]

export function ReconciliationResume() {
  const totalGross = channelData.reduce((sum, item) => sum + item.grossSales, 0)
  const totalNett = channelData.reduce((sum, item) => sum + item.nettSales, 0)
  const totalBank = channelData.reduce((sum, item) => sum + item.bankIn, 0)
  const totalSelisih = channelData.reduce((sum, item) => sum + item.selisih, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Resume Rekonsiliasi</CardTitle>
            <CardDescription>Ringkasan per channel untuk posting ke Accurate</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button size="sm">
              <Send className="w-4 h-4 mr-2" />
              Post to Accurate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Channel Details */}
        <div className="space-y-4">
          {channelData.map((channel) => (
            <div key={channel.channel} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-lg">{channel.channel}</h4>
                <Badge
                  variant={
                    channel.status === "approved"
                      ? "default"
                      : channel.status === "review"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {channel.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-muted-foreground">Gross Sales</span>
                  <div className="font-medium">Rp {channel.grossSales.toLocaleString("id-ID")}</div>
                  <span className="text-xs text-muted-foreground">Agregator/BI</span>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground">Com Fee</span>
                  <div className="font-medium text-red-600">Rp {channel.comFee.toLocaleString("id-ID")}</div>
                  <span className="text-xs text-muted-foreground">Data agregator</span>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground">Ads</span>
                  <div className="font-medium text-red-600">Rp {channel.ads.toLocaleString("id-ID")}</div>
                  <span className="text-xs text-muted-foreground">Data agregator</span>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground">Nett Sales</span>
                  <div className="font-medium text-green-600">Rp {channel.nettSales.toLocaleString("id-ID")}</div>
                  <span className="text-xs text-muted-foreground">Data agregator</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-muted-foreground">Data Bank</span>
                  <div className="font-medium">Rp {channel.bankIn.toLocaleString("id-ID")}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground">Selisih Rekening Bank</span>
                  <div className={`font-medium ${channel.selisih < 0 ? "text-red-600" : "text-green-600"}`}>
                    Rp {channel.selisih.toLocaleString("id-ID")}
                  </div>
                  <span className="text-xs text-muted-foreground">Hasil cross check</span>
                </div>
              </div>

              {channel.status === "review" && (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                  ⚠️ Channel ini memerlukan review manual karena selisih besar atau tidak ada data bank
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-3">Total Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Gross Sales</span>
              <div className="font-bold text-lg">Rp {totalGross.toLocaleString("id-ID")}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Nett Sales</span>
              <div className="font-bold text-lg text-green-600">Rp {totalNett.toLocaleString("id-ID")}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Bank In</span>
              <div className="font-bold text-lg">Rp {totalBank.toLocaleString("id-ID")}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Selisih</span>
              <div className={`font-bold text-lg ${totalSelisih < 0 ? "text-red-600" : "text-green-600"}`}>
                Rp {totalSelisih.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>2 channel approved, 1 needs review</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Review Selisih</Button>
            <Button>Approve & Post to Accurate</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
