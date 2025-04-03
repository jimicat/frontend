"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
import type { UserProfile } from "@/hooks/use-profile"

interface EditProfileDialogProps {
  profile: UserProfile
  onSave: (updatedProfile: Partial<UserProfile>) => Promise<boolean>
  isUpdating: boolean
}

export function EditProfileDialog({ profile, onSave, isUpdating }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: profile.username || "",
    bio: profile.bio || "",
    coverImage: profile.coverImage || "",
    avatarImage: profile.avatarImage || "",
    socialLinks: {
      twitter: profile.socialLinks?.twitter || "",
      instagram: profile.socialLinks?.instagram || "",
      youtube: profile.socialLinks?.youtube || "",
      website: profile.socialLinks?.website || "",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await onSave(formData)
    if (success) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Edit className="mr-2 h-4 w-4" />
          编辑资料
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑个人资料</DialogTitle>
          <DialogDescription>更新您的个人资料信息。点击保存按钮应用更改。</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                用户名
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                简介
              </Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatarImage" className="text-right">
                头像URL
              </Label>
              <Input
                id="avatarImage"
                name="avatarImage"
                value={formData.avatarImage}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverImage" className="text-right">
                封面URL
              </Label>
              <Input
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="socialLinks.twitter" className="text-right">
                Twitter
              </Label>
              <Input
                id="socialLinks.twitter"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="socialLinks.instagram" className="text-right">
                Instagram
              </Label>
              <Input
                id="socialLinks.instagram"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="socialLinks.youtube" className="text-right">
                YouTube
              </Label>
              <Input
                id="socialLinks.youtube"
                name="socialLinks.youtube"
                value={formData.socialLinks.youtube}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="socialLinks.website" className="text-right">
                网站
              </Label>
              <Input
                id="socialLinks.website"
                name="socialLinks.website"
                value={formData.socialLinks.website}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "保存中..." : "保存更改"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

