'use client'

import { useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export default function Caption({text, duration = 2, delay = 0.5, className} : {text: string, duration?: number, delay?: number, className?:string}) {
    const textArr = text.match(/(\S+|\s+)/g) || []
    const fontSettings = className ? className : `  text-liber-brown text-6xl `

    return (
        <div className={` flex flex-wrap font-bold ` + fontSettings}>
            {
                textArr.map((item) => {
                    if (item === " ") {
                        return (
                            <><p>&nbsp;</p></>
                        )
                    }

                    return (
                        <CaptionSpan duration={duration} delay={delay} word={item}/>
                    )
                })
            }
        </div>
    )
}

function CaptionSpan({word, duration, delay}: {word:string, duration: number, delay: number}) {
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
        if (isInView) {
            animate(scope.current, {
                opacity: 1,
                filter: 'blur(0px)'
            }, {
                duration: duration,
                type: 'spring',
                delay: delay
            })
        }
    })

    return (
        <>
            <p
                ref={scope}
                className="
                  hover:translate-y-1 hover:text-liber-beige hover:bg-liber-red
                  active:bg-liber-red-3 cursor-none
                  transition-all duration-100 tracking-tighter"
                style={{
                    opacity: 0,
                    filter: 'blur(20px)'
                }}
            >
                {word}
            </p>
        </>
    )
}
