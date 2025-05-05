'use client'

import { useEffect, useState } from "react";
import Hero from "../ui/Hero"
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";
import { useAnimate } from "framer-motion";
import { lerp, scaleValue } from "../../utils/kit";


export default function Title({title, colors}: {title: string, colors:any}) {
    const [{ x, y }, scrollTo] = useWindowScroll();
    const {width, height} = useWindowSize();
    const [useHeroSize, setHeroSize] = useState(1)
    const [heroScope, heroAnimate] = useAnimate()
    const [introScope, introAnimate] = useAnimate()

    const relativeHeight = y && height ? y/height : 0

    useEffect(() => {

        const STARTRESIZING = 0.2
        const SCROLLEND = 1
        const SCROLLENDHEROSIZE = 0.25
        const LERPCONST = 0.2

        if (relativeHeight > STARTRESIZING) {
            const newVal = Math.max(lerp(useHeroSize, scaleValue(relativeHeight, [STARTRESIZING, SCROLLEND], [1, SCROLLENDHEROSIZE]), LERPCONST), SCROLLENDHEROSIZE)
            setHeroSize(newVal)
        } else {
            setHeroSize(1)
        }
    }, [relativeHeight])

    useEffect(() => {
        introAnimate(introScope.current, {
            opacity: 1,
            filter: 'blur(0px)'
        }, {
            duration: 2,
            type: 'spring'
        })
    })


    return (
        <>
            <div className="h-[25vh]"></div>
            <div
                ref={introScope}
                className="sticky top-0 py-12 justify-items-end px-24 z-[1000] "
                style={{
                    opacity: 0,
                    filter: 'blur(30px)'
                }}
            >
                <div
                    ref={heroScope}
                    style={{
                        scale: useHeroSize,
                        transformOrigin: 'top right',
                    }}
                >
                  <p
                      className={`text-8xl font-black font-heading tracking-tighter w-full
                       active:scale-90
                      hover:scale-110
                      transition-all duration-300
                      `}>{title}
                  </p>
                </div>
            </div>
            <div className="h-[50vh]"></div>
        </>
    )
}
