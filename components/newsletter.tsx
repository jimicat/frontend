import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  return (
    <div className="rounded-xl bg-purple-50 p-6 dark:bg-purple-950/50">
      <div className="mx-auto max-w-2xl text-center">
        <Mail className="mx-auto h-10 w-10 text-purple-600 dark:text-purple-400" />
        <h2 className="mt-3 text-2xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="mt-2 text-muted-foreground">
          Get the latest episodes and podcast news delivered to your inbox weekly.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
          <Input type="email" placeholder="Enter your email" className="sm:w-72" />
          <Button className="bg-purple-600 text-white hover:bg-purple-700">Subscribe</Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  )
}

