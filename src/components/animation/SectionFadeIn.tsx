'use client'

import { useAnimate } from "framer-motion"
import { useEffect, type ReactNode } from "react"

export default function SectionFadeIn({duration=0.5, delay=0.1, children}: {duration?: number, children: any, delay?: number}) {

    const [scope, animate] = useAnimate()

    useEffect(() => {
        animate(scope.current, {
            opacity: 1,
        }, {
            duration: duration,
            delay: delay,
            type: 'spring'
        })
    })

    return (
        <div
            ref={scope}
            className="opacity-0"
        >
            {children}
        </div>
    )
}