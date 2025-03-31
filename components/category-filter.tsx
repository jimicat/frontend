"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>(["All"])
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollAmount = 200

  // 获取所有类别
  useEffect(() => {
    // 这里应该有一个API来获取所有类别，但目前API中没有提供
    // 所以我们使用一个模拟的类别列表
    const mockCategories = [
      "All",
      "Technology",
      "Business",
      "Health & Wellness",
      "Music",
      "Food",
      "Travel",
      "Education",
      "Entertainment",
      "Science",
      "Sports",
      "News",
      "Politics",
      "History",
      "Art",
    ]
    setCategories(mockCategories)
  }, [])

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("category-container")
    if (container) {
      if (direction === "left") {
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount))
        container.scrollTo({
          left: Math.max(0, scrollPosition - scrollAmount),
          behavior: "smooth",
        })
      } else {
        setScrollPosition(scrollPosition + scrollAmount)
        container.scrollTo({
          left: scrollPosition + scrollAmount,
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <div className="relative flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-1 z-10 h-8 w-8 rounded-full bg-background/80 shadow-sm backdrop-blur-sm"
        onClick={() => handleScroll("left")}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">向左滚动</span>
      </Button>

      <div
        id="category-container"
        className="flex gap-2 overflow-x-auto py-2 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full whitespace-nowrap",
              selectedCategory === category
                ? "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
                : "",
            )}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-1 z-10 h-8 w-8 rounded-full bg-background/80 shadow-sm backdrop-blur-sm"
        onClick={() => handleScroll("right")}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">向右滚动</span>
      </Button>
    </div>
  )
}

