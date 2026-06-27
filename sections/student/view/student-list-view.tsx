"use client"

import { useEffect, useState } from "react"
import { getStudents, deleteStudent } from "@/services/student"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Student } from "@/types/student"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, Pencil, Trash2 } from "lucide-react"

export default function StudentListView() {
  const [students, setStudents] = useState<Student[]>([])
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!studentToDelete) return
    setIsDeleting(true)
    try {
      await deleteStudent(studentToDelete.id)
      toast.success(
        `Student "${studentToDelete.full_name}" deleted successfully!`
      )
      setStudentToDelete(null)
      fetchStudents()
    } catch (error) {
      console.error("Error deleting student:", error)
      toast.error("Failed to delete student.")
    } finally {
      setIsDeleting(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const data = await getStudents()
      setStudents(data.students)
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="p-2 sm:p-4">
      <Table>
        <TableCaption>A list of students fetched from the API.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">CGPA</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium text-muted-foreground">#{student.id}</TableCell>
              <TableCell className="font-semibold">{student.full_name}</TableCell>
              <TableCell className="text-muted-foreground">{student.email}</TableCell>
              <TableCell className="text-right font-medium">{student.cgpa}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/admin/students/${student.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/students/${student.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-amber-600">
                      <Pencil className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setStudentToDelete(student)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={!!studentToDelete}
        onOpenChange={(open) => {
          if (!open) setStudentToDelete(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete student{" "}
              <strong className="font-semibold text-foreground">
                {studentToDelete?.full_name}
              </strong>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() => setStudentToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
