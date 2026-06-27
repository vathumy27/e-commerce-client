"use client"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome to the Staff Portal. Monitor student statistics, directory
          lists, and curriculum setups.
        </p>
      </div>
    </div>
  )
}
