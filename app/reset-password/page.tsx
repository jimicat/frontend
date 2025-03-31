import Link from "next/link"
import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "重置密码 | PodcastHub",
  description: "设置您的新密码。",
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M16 3H3v18h18V8l-5-5z" />
                <path d="M16 8V3l5 5h-5z" />
              </svg>
              <span>PodcastHub</span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">设置新密码</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">请输入您的新密码。</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-background px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  )
}

