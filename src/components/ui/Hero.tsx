'use client'
import { useAnimate } from "framer-motion"
import { useEffect, useState } from "react"
import Span from "./Span"

export default function Hero({text}: {text: string}) {
    const textArr = text.split('')
    return (
        <div className="cursor-default font-heading font-bold text-8xl flex flex-row text-center">
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

