import StudentEditView from "@/sections/student/view/student-edit-view"
import React from "react"
import { AuthenticatedRoute } from "@/components/auth-guard"

export default function AdminStudentEditPage() {
  return (
    <AuthenticatedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Edit Student Profile</h1>
          <p className="text-muted-foreground text-sm">
            Modify the student record information.
          </p>
        </div>
        <StudentEditView />
      </div>
    </AuthenticatedRoute>
  )
}
