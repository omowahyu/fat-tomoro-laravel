import { LayoutGrid, ShoppingCart, TrendingUp, Database, Calendar, FileText, Settings } from "lucide-react"
import { type NavItem } from "@/types"

const navigation: NavItem[] = [
  {
    isActive: true,
    title: "Dashboard",
    href: "/",
    icon: LayoutGrid,
    tag: "New"
  },
  {
    isActive: true,
    title: "Pembelian",
    icon: ShoppingCart,
    tag: "Dev",
    children: [
      { title: "Import BOH", href: "/purchases/import", isActive: true },
      { title: "Transform & Preview", href: "/purchases/transform", isActive: true },
      { title: "Mapping & Validasi", href: "/purchases/mapping", isActive: true },
      { title: "Posting ke Accurate", href: "/purchases/posting", isActive: true },
      { title: "Histori & Audit", href: "/purchases/history", isActive: true },
    ],
  },
  {
    isActive: true,
    title: "Penjualan & Rekonsiliasi",
    icon: TrendingUp,
    tag: "Soon",
    children: [
      { title: "Upload Penjualan BI", href: "/sales/upload-bi", isActive: true },
      { title: "Upload Rekening Koran", href: "/sales/upload-bank", isActive: true },
      { title: "Auto Generate Diskon", href: "/sales/auto-discount", isActive: true },
      { title: "Match & Verifikasi", href: "/sales/verification", isActive: true },
      { title: "Review Selisih", href: "/sales/review", isActive: true },
      { title: "Resume Rekonsiliasi", href: "/sales/resume", isActive: true },
    ],
  },
  {
    isActive: true,
    title: "Master & Mapping",
    icon: Database,
    tag: "Soon",
    children: [
      { title: "COA Mapping", href: "/master/coa", isActive: true },
      { title: "Item/Product Mapping", href: "/master/items", isActive: true },
      { title: "Channel Mapping", href: "/master/channels", isActive: true },
      { title: "Bank Mapping", href: "/master/banks", isActive: true },
      { title: "Tax & Fee Rules", href: "/master/tax-rules", isActive: true },
    ],
  },
  {
    isActive: false,
    title: "Integrasi & Scheduler",
    icon: Calendar,
    tag: "Soon",
    children: [
      { title: "BOH Export", href: "/integration/boh", isActive: false },
      { title: "BI Export", href: "/integration/bi", isActive: false },
      { title: "Accurate API", href: "/integration/accurate", isActive: false },
      { title: "Bank API", href: "/integration/bank", isActive: false },
      { title: "Scheduler Jobs", href: "/integration/scheduler", isActive: false },
    ],
  },
  {
    isActive: false,
    title: "Audit & Notifikasi",
    icon: FileText,
    tag: "Soon",
    children: [
      { title: "Activity Logs", href: "/audit/logs", isActive: false },
      { title: "Error Center", href: "/audit/errors", isActive: false },
      { title: "Notifikasi", href: "/audit/notifications", isActive: false },
    ],
  }
]
export { navigation }