import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

const activities = [
  {
    id: 1,
    user: "FAT PSM",
    action: "Upload penjualan BI",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    details: "GoFood, GrabFood - 15 transaksi",
  },
  {
    id: 2,
    user: "OPS BEI",
    action: "Penerimaan barang",
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    details: "PO-2024-001 - Bahan baku kopi",
  },
  {
    id: 3,
    user: "FAT PSM",
    action: "Rekonsiliasi bank",
    status: "error",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    details: "Selisih Rp 50.000 - perlu review",
  },
  {
    id: 4,
    user: "System",
    action: "Auto posting Accurate",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    details: "Batch PJ-2024-0315 - 23 dokumen",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Aktivitas terbaru sistem bridging</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.action}</p>
                <Badge
                  variant={
                    activity.status === "success"
                      ? "default"
                      : activity.status === "error"
                        ? "destructive"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {activity.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground">
                {activity.user} •{" "}
                {formatDistanceToNow(activity.timestamp, {
                  addSuffix: true,
                  locale: id,
                })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
