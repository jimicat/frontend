"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
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

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollAmount = 200

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
        <span className="sr-only">Scroll left</span>
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
            onClick={() => setSelectedCategory(category)}
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
        <span className="sr-only">Scroll right</span>
      </Button>
    </div>
  )
}

