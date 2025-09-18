import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Database } from "lucide-react"
import { type DashboardStats as DashboardStatsType } from "@/types"

interface DashboardStatsProps {
  data?: DashboardStatsType;
}

export function DashboardStats({ data }: DashboardStatsProps) {
  // Fallback data for demo
  const stats = data || {
    total_files_today: 8,
    success_rate: 87.5,
    pending_reconciliation: 3,
    total_difference_amount: 125000,
    last_sync_time: "2024-01-15 14:30:00"
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Files Processed Today */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Files Processed</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total_files_today}</div>
          <p className="text-xs text-muted-foreground">files hari ini</p>
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              BOH + BI + Bank
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Success Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.success_rate}%</div>
          <p className="text-xs text-muted-foreground">posting berhasil</p>
          <div className="mt-2">
            <Progress value={stats.success_rate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Pending Reconciliation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pending_reconciliation}</div>
          <p className="text-xs text-muted-foreground">selisih perlu review</p>
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant="destructive" className="text-xs">
              Butuh perhatian
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Total Difference Amount */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Selisih</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Rp {new Intl.NumberFormat('id-ID').format(stats.total_difference_amount)}
          </div>
          <p className="text-xs text-muted-foreground">akumulasi selisih bank</p>
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {new Date(stats.last_sync_time).toLocaleString('id-ID')}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">batch menunggu bank</p>
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              1 selisih {">"} 50k
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Success Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">94%</div>
          <p className="text-xs text-muted-foreground">transaksi berhasil</p>
          <Progress value={94} className="mt-2" />
        </CardContent>
      </Card>

      {/* Total Selisih */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Selisih</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp 125k</div>
          <p className="text-xs text-muted-foreground">7 hari terakhir</p>
          <div className="mt-2 flex items-center space-x-2">
            <AlertTriangle className="h-3 w-3 text-yellow-500" />
            <span className="text-xs text-muted-foreground">Perlu review</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
