'use client'

import { useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export default function Caption({text} : {text: string}) {
    const textArr = text.match(/(\S+|\s+)/g) || []
    
    return (
        <div className="flex flex-wrap text-6xl font-bold text-liber-brown">
            {
                textArr.map((item) => {
                    if (item === " ") {
                        return (
                            <><p>&nbsp;</p></>
                        )
                    }

                    return (
                        <CaptionSpan word={item}/>
                    )
                })
            }
        </div>
    )
}

function CaptionSpan({word}: {word:string}) {
    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
        if (isInView) {
            animate(scope.current, {
                opacity: 1,
                filter: 'blur(0px)'
            }, {
                duration: 0.5,
                type: 'spring'
            })
        }
    })

    return (
        <>
            <p
                ref={scope}
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