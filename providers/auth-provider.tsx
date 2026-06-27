"use client"

import React, { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import apiClient from "@/lib/api-client"

export interface AuthUser {
  id: number
  email: string
  role: string
  created_at?: string
}

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string, role: string) => Promise<any>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          return JSON.parse(storedUser)
        } catch (e) {
          console.error("Failed to parse user from localStorage", e)
        }
      }
    }
    return null
  })
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const response = await apiClient.post("/api/auth/login", { email, password })
    const { access_token, user: loggedInUser } = response.data

    if (access_token && loggedInUser) {
      localStorage.setItem("token", access_token)
      localStorage.setItem("user", JSON.stringify(loggedInUser))
      setToken(access_token)
      setUser(loggedInUser)
    }
    return response.data
  }

  const register = async (email: string, password: string, role: string) => {
    const response = await apiClient.post("/api/auth/register", {
      email,
      password,
      role,
    })
    return response.data
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    router.push("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
