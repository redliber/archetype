'use client'
import { useAnimate } from "framer-motion"
import { useEffect, useState } from "react"

export default function Span({letter, key}: {letter: string, key: number}) {
    const [scope, animate] = useAnimate()
    const [useHovered, setHovered] = useState(false)

    function handleHover() {
        animate(scope.current, {
            scale: 1.75,
            rotate: Math.random() * 30 * (Math.random() < 0.5 ? -1 : 1),
            color: 'var(--color-liber-red-2)'
        }, {
            duration: 0.75,
            type: 'spring',
            stiffness: 200, 
            damping: 10
        })
    }

    function handleLeave() {
        animate(scope.current, {
            scale: 1,
            rotate: 0,
            color: 'var(--color-liber-red)'
        }, {
            duration: 0.25,
            type: 'spring'
        })
    }

    function handleClick() {
        animate(scope.current, {
            scale: 1.5,
            rotate: Math.random() * 20 * (Math.random() < 0.5 ? 1 : -1),
            color: 'var(--color-liber-red-3)'
        }, {
            duration: 0.5,
            type: 'spring'
        })
    }

    return (
        <>
            <p
                key={key}
                ref={scope}
                style={{
                    scale: 1
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onMouseDown={handleClick}
                onMouseUp={handleHover}
                >
                {letter}
            </p>
        </>
    )
}