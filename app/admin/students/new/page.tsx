import StudentListView from "@/sections/student/view/student-list-view"
import React from "react"
import { AuthenticatedRoute } from "@/components/auth-guard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AdminStudentListPage() {
  return (
    <AuthenticatedRoute allowedRoles={["admin", "lecturer"]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Student Directory</h1>
            <p className="text-muted-foreground text-sm">
              List of all student records. View, edit, or delete student profiles.
            </p>
          </div>
          <Link href="/admin/students/new">
            <Button className="font-semibold">
              <Plus className="size-4 mr-1.5" />
              Create Student
            </Button>
          </Link>
        </div>
        <div className="border rounded-xl bg-card shadow-xs overflow-hidden">
          <StudentListView />
        </div>
      </div>
    </AuthenticatedRoute>
  )
}
