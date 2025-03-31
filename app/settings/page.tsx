import { PodcastLayout } from "@/components/podcast-layout"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, CreditCard, HelpCircle, LogOut, Upload } from "lucide-react"

export default function SettingsPage() {
  return (
    <PodcastLayout>
      <div className="container px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Settings</h1>
            <p className="mt-2 text-muted-foreground">Manage your account settings and preferences.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-[200px_1fr]">
            <div className="hidden md:block">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="#account">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="#notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="#privacy">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="#billing">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="#help">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help
                  </a>
                </Button>
                <Separator className="my-4" />
                <Button
                  variant="ghost"
                  className="justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>

            <div>
              <Tabs defaultValue="account" className="md:hidden">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="account">
                    <User className="h-4 w-4" />
                    <span className="sr-only">Account</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="privacy">
                    <Shield className="h-4 w-4" />
                    <span className="sr-only">Privacy</span>
                  </TabsTrigger>
                  <TabsTrigger value="billing">
                    <CreditCard className="h-4 w-4" />
                    <span className="sr-only">Billing</span>
                  </TabsTrigger>
                  <TabsTrigger value="help">
                    <HelpCircle className="h-4 w-4" />
                    <span className="sr-only">Help</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="mt-6">
                  <AccountSettings />
                </TabsContent>

                <TabsContent value="notifications" className="mt-6">
                  <NotificationSettings />
                </TabsContent>

                <TabsContent value="privacy" className="mt-6">
                  <PrivacySettings />
                </TabsContent>

                <TabsContent value="billing" className="mt-6">
                  <BillingSettings />
                </TabsContent>

                <TabsContent value="help" className="mt-6">
                  <HelpSettings />
                </TabsContent>
              </Tabs>

              <div className="hidden space-y-10 md:block">
                <section id="account">
                  <AccountSettings />
                </section>

                <Separator />

                <section id="notifications">
                  <NotificationSettings />
                </section>

                <Separator />

                <section id="privacy">
                  <PrivacySettings />
                </section>

                <Separator />

                <section id="billing">
                  <BillingSettings />
                </section>

                <Separator />

                <section id="help">
                  <HelpSettings />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AudioPlayer />
    </PodcastLayout>
  )
}

function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">Update your account information and profile settings.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=100&width=100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Change
            </Button>
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" defaultValue="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" defaultValue="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="johndoe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            defaultValue="Podcast enthusiast and tech lover. I enjoy discussing the latest in technology, business, and personal development."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select defaultValue="en">
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-purple-600 text-white hover:bg-purple-700">Save changes</Button>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">Configure how you receive notifications and updates.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email notifications</Label>
            <p className="text-sm text-muted-foreground">Receive email notifications about new episodes and updates.</p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications">Push notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your device for new episodes and updates.
            </p>
          </div>
          <Switch id="push-notifications" defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="new-episodes">New episodes</Label>
            <p className="text-sm text-muted-foreground">Get notified when podcasts you follow release new episodes.</p>
          </div>
          <Switch id="new-episodes" defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="comments">Comments</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications when someone comments on your activity.
            </p>
          </div>
          <Switch id="comments" />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">Receive emails about new features, promotions, and updates.</p>
          </div>
          <Switch id="marketing" />
        </div>

        <Button className="bg-purple-600 text-white hover:bg-purple-700">Save preferences</Button>
      </div>
    </div>
  )
}

function PrivacySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Privacy</h2>
        <p className="text-muted-foreground">Manage your privacy settings and control your data.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="profile-visibility">Profile visibility</Label>
            <p className="text-sm text-muted-foreground">Make your profile visible to other users.</p>
          </div>
          <Switch id="profile-visibility" defaultChecked />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="listening-history">Listening history</Label>
            <p className="text-sm text-muted-foreground">Allow others to see what you've been listening to.</p>
          </div>
          <Switch id="listening-history" />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="data-collection">Data collection</Label>
            <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve your experience.</p>
          </div>
          <Switch id="data-collection" defaultChecked />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Data export</Label>
          <p className="text-sm text-muted-foreground">
            Download a copy of your data, including your profile information, listening history, and saved episodes.
          </p>
          <Button variant="outline">Request data export</Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Delete account</Label>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button variant="destructive">Delete account</Button>
        </div>
      </div>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Current Plan</h3>
              <p className="text-sm text-muted-foreground">Free Plan</p>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">Upgrade</Button>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Premium Plans</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between">
                <h4 className="font-medium">Monthly</h4>
                <p className="font-bold">$9.99</p>
              </div>
              <ul className="mt-2 space-y-2 text-sm">
                <li>✓ Ad-free listening</li>
                <li>✓ Offline downloads</li>
                <li>✓ High-quality audio</li>
                <li>✓ Exclusive content</li>
              </ul>
              <Button className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700">Choose Plan</Button>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">Annual</h4>
                  <p className="text-xs text-muted-foreground">Save 20%</p>
                </div>
                <p className="font-bold">$95.88</p>
              </div>
              <ul className="mt-2 space-y-2 text-sm">
                <li>✓ Ad-free listening</li>
                <li>✓ Offline downloads</li>
                <li>✓ High-quality audio</li>
                <li>✓ Exclusive content</li>
                <li>✓ Early access to new features</li>
              </ul>
              <Button className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700">Choose Plan</Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Payment Methods</h3>
          <p className="mt-1 text-sm text-muted-foreground">No payment methods added yet.</p>
          <Button variant="outline" className="mt-4">
            Add payment method
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Billing History</h3>
          <p className="mt-1 text-sm text-muted-foreground">No billing history available.</p>
        </div>
      </div>
    </div>
  )
}

function HelpSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Help & Support</h2>
        <p className="text-muted-foreground">Get help with your account and find answers to common questions.</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Frequently Asked Questions</h3>
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium">How do I download episodes for offline listening?</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                To download episodes, tap the download icon on any episode. You can find your downloads in the Library
                tab.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium">How do I cancel my subscription?</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                You can cancel your subscription at any time from the Billing section in your account settings.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium">How do I change my password?</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                You can change your password in the Account section of your settings.
              </p>
            </div>
          </div>
          <Button variant="link" className="mt-2 px-0">
            View all FAQs
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Contact Support</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Need help with something specific? Our support team is here to help.
          </p>
          <Button variant="outline" className="mt-4">
            Contact Support
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Feedback</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We're always looking to improve. Share your thoughts and suggestions with us.
          </p>
          <div className="mt-4 space-y-2">
            <Textarea placeholder="Your feedback" className="min-h-[100px]" />
            <Button className="bg-purple-600 text-white hover:bg-purple-700">Submit Feedback</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

