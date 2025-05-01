"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function Cursor() {
    return (
        <>
            <AnimatedCursor
                color="250,10,20"
                innerSize={10}
                outerSize={100}
                innerScale={0.5}
                outerScale={2}
                outerAlpha={0.75}
                trailingSpeed={1.5}
                innerStyle={{
                    mixBlendMode: "exclusion",
                }}
                outerStyle={{
                    mixBlendMode: "exclusion",
                    border: "2px solid white",
                }}
            />
        </>
        
    );
}

function NoiseSVG() {
    return (
        <svg viewBox="0 0 200 200" xmlns='http://www.w3.org/2000/svg'>
            <filter id='noiseFilter'>
                <feTurbulence
                    type='fractalNoise'
                    baseFrequency='0.65'
                    numOctaves='3'
                    stitchTiles='stitch' />
            </filter>

            <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
    )
}