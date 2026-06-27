"use client"

import React, { useEffect, useState } from "react"
import { getStudent } from "@/services/student"
import { useParams } from "next/navigation"
import StudentNewEditForm from "../student-new-edit-form"
import { Student } from "@/types/student"

export default function StudentEditView() {
  const { id } = useParams()
  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    if (id) {
      getStudent(id as string)
        .then((data) => {
          setStudent(data.student)
        })
        .catch((error) => {
          console.error("Error fetching student:", error)
        })
    }
  }, [id])

  if (!student) {
    return (
      <div className="flex items-center justify-center py-8">
        <div>Loading student details...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <StudentNewEditForm currentStudent={student} />
    </div>
  )
}
