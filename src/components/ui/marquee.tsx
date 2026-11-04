import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to ease the animation to a stop on hover and back up on leave,
   * instead of freezing it instantly.
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
}

/** Milliseconds spent gliding between full speed and a standstill. */
const HOVER_EASE_MS = 600

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pauseOnHover) return

    const container = containerRef.current
    if (!container) return

    const tracksOf = () =>
      Array.from(container.querySelectorAll<HTMLElement>("[data-marquee-track]"))

    let speed = 1
    let frame = 0

    // Animate the CSS animation's playback rate rather than toggling
    // animation-play-state, so the strip coasts to a stop instead of
    // snapping to it.
    const glideTo = (target: number) => {
      cancelAnimationFrame(frame)

      const animations = tracksOf().flatMap((track) => track.getAnimations())
      const from = speed
      const start = performance.now()

      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / HOVER_EASE_MS)
        const eased = progress * progress * (3 - 2 * progress)
        speed = from + (target - from) * eased

        for (const animation of animations) {
          animation.playbackRate = speed
        }

        if (progress < 1) {
          frame = requestAnimationFrame(step)
        } else {
          speed = target
        }
      }

      frame = requestAnimationFrame(step)
    }

    const handleEnter = () => glideTo(0)
    const handleLeave = () => glideTo(1)

    container.addEventListener("pointerenter", handleEnter)
    container.addEventListener("pointerleave", handleLeave)

    return () => {
      cancelAnimationFrame(frame)
      container.removeEventListener("pointerenter", handleEnter)
      container.removeEventListener("pointerleave", handleLeave)

      for (const track of tracksOf()) {
        for (const animation of track.getAnimations()) {
          animation.playbackRate = 1
        }
      }
    }
  }, [pauseOnHover])

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            data-marquee-track
            className={cn("flex shrink-0 justify-around gap-(--gap)", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
