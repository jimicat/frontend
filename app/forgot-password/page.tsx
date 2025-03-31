import Link from "next/link"
import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "忘记密码 | PodcastHub",
  description: "重置您的PodcastHub账户密码。",
}

export default function ForgotPasswordPage() {
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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">重置您的密码</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            输入您的电子邮件地址，我们将向您发送重置密码的链接。
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-background px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <ForgotPasswordForm />
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            记起密码了？{" "}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

