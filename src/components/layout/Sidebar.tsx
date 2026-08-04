import Link from "next/link";
import { LayoutDashboard, Users, Box, ShoppingCart, Activity, FileText, Settings, Eye } from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "POS Billing", href: "/pos", icon: ShoppingCart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Prescriptions", href: "/prescriptions", icon: Eye },
  { name: "Inventory", href: "/inventory", icon: Box },
  { name: "Orders", href: "/orders", icon: Activity },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border px-3 py-4">
      <div className="mb-8 flex items-center px-3">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground font-bold mr-3">
          O
        </div>
        <span className="text-xl font-bold">Amritsar Eyeclinic</span>
      </div>
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-3 py-4 border-t border-border">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium">Dr. Admin</p>
            <p className="text-xs text-muted-foreground">admin@opticalcrm.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
