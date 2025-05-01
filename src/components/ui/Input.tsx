'use client'

import { px, useAnimate } from "framer-motion"
import { useEffect, useState, type ChangeEvent } from "react"
import { CornerDownLeft } from 'lucide-react'

export default function Input({siteUrl}: {siteUrl: string}) {
    const [scope, animate] = useAnimate()
    const [arrowScope, arrowAnimate] = useAnimate()
    const [useVal, setVal] = useState('')

    // useEffect(() => {
    //     console.log("INPUT VAL -->", scope.current.value)
    // }, [scope.current?.value])

    function handleHover() {
        animate(scope.current, {
            borderColor: 'var(--color-liber-red-3)',
            // fontWeight: 'var(--font-weight-black)',
            opacity: 1,
            // fontSize: 'var(--text-lg)'
        }, {
            duration: 0.5,
            // type: 'spring'
        })
    }
    
    function handleLeave() {
        animate(scope.current, {
            borderColor: 'var(--color-liber-red)',
            // fontWeight: 'var(--font-weight-light)',
            opacity: 0.75,
        }, {
            duration: 0.5,
            // type: 'spring'
        })
    }
    
    function handleFocus() {
        animate(scope.current, {
            opacity: 1,
        }, {
            duration: 0.2,
            // type: 'spring'
        })
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setVal(e.target.value)
        if (e.target.value.length > 2) {
            animate(scope.current, {
                borderColor: 'var(--color-liber-red-3)',
                fontWeight: 'var(--font-weight-black)',
                opacity: 1,
                // fontSize: 'var(--text-lg)'
            }, {
                duration: 0.5,
                // type: 'spring'
            })
            arrowAnimate(arrowScope.current, {
                opacity: 1
            }, {
                duration: 2
            })
        } else {
            animate(scope.current, {
                borderColor: 'var(--color-liber-red)',
                fontWeight: 'var(--font-weight-light)',
                opacity: 0.75,
            }, {
                duration: 0.5,
                // type: 'spring'
            })
            arrowAnimate(arrowScope.current, {
                opacity: 0
            }, {
                duration: 1
            })
        }
    }

    function handleKeyDown(e:any) {
        const target = e.target.value.trim().toLowerCase()
        if (e.key === "Enter" && e.target.value.trim()) {
            const absoluteUrl = new URL(`archetype/affiliation/${encodeURIComponent(target)}`, siteUrl).toString();
            window.location.href = absoluteUrl;
          }
    }
    
    return (
        <>
            <div className=" flex flex-row">
                <input
                    ref={scope}
                    onMouseEnter={() => handleHover()}
                    onMouseLeave={() => handleLeave()}
                    onFocus={() => handleFocus()}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleKeyDown}
                    className="
                        min-w-full h-[3.25rem] 
                        text-center text-3xl
                        placeholder:text-light 
                        rounded-sm border-b-[0.5px]
                        focus:outline-0
                        my-2"
                    style={{
                        borderColor: 'var(--color-liber-red)',
                        // fontWeight: 'var(--font-weight-light)',
                        opacity: 0.5,
                    }}
                    placeholder="Enter Affiliation"/>
            </div>
            <div 
                className="flex flex-row gap-2"
                ref={arrowScope}
                style={{
                    opacity: 0
                }} 
                >
                    <p className="text-xs">Press Enter</p>
                    <CornerDownLeft
                        color="red" 
                        size={15}/>
            </div>
        
        </>
    )
}