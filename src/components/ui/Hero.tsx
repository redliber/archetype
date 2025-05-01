'use client'
import { useAnimate } from "framer-motion"
import { useEffect, useState } from "react"
import Span from "./Span"

export default function Hero({text, className}: {text: string, className?: string}) {
    const textArr = text.split('')
    const fontSettings = className ? className : ` font-bold text-8xl `

    return (
        <div
            className={`
            font-heading  
            flex flex-row gap-[0.005px] text-center ` + fontSettings}>
            {
                textArr.map((item, index) => {
                    return (
                        <Span key={index} letter={item}/>
                    )
                })
            }
        </div>
    )
}

