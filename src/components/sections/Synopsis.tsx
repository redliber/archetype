'use client'

import { useAnimate, useInView } from "framer-motion"
import Caption from "../ui/Caption"
import { useEffect, useRef, useState } from "react"
import { useIntersectionObserver, useWindowScroll, useWindowSize } from "@uidotdev/usehooks"
import { lerp, scaleValue } from "../../utils/kit"

export default function Synopsis({ synopsis, siteOrigin, colors }: { synopsis: {heading: string, body: string[]}[], siteOrigin:any, colors:any }) {
  return (
    <div className="w-full">
      {
        synopsis.map((item, index) => {
          return (
            <div className="my-[50vh]">
              <SynopsisSection
                colors={colors}
                siteOrigin={siteOrigin} total={ synopsis.length } index={index} synopsisSection={item}/>
            </div>
          )
        })
      }
    </div>
  )
}

function SynopsisSection({ total, synopsisSection, index, siteOrigin, colors }: { synopsisSection: { heading: string, body: string[] }, index: number, total: number, siteOrigin: any, colors:any }) {
  const {heading, body} = synopsisSection

  const [headingScope, headingAnimate] = useAnimate()
  const headingInView = useInView(headingScope)


  useEffect(() => {
    if (headingInView) {
      headingAnimate(headingScope.current, {
        opacity: 1,
        y: 0
      }, {
        duration: 0.5,
        // type: 'spring',
      })
    }
  })

  const headingIntersectionRef = useRef(null);
  const [position, setPosition] = useState(0);

  // Custom Intersection Observer Hook
  useEffect(() => {
    const element = headingIntersectionRef.current;
    if (!element) return;

    const updatePosition = () => {
      // @ts-ignore
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Normalize position: 0 (bottom/not visible) to 1 (top/scrolled past)
      const normalized = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
      setPosition(normalized);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) updatePosition();
      },
      { threshold: 0 }
    );

    observer.observe(element);
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);


  const [useHeadingSize, setHeadingSize] = useState(1)
  useEffect(() => {
    const STARTRESIZING = 0.5
    const SCROLLEND = 0.75
    const SCROLLENDHEROSIZE = 0.75
    const LERPCONST = 0.1

    if (position > STARTRESIZING) {
      const newVal = Math.max(lerp(useHeadingSize, scaleValue(position, [STARTRESIZING, SCROLLEND], [1, SCROLLENDHEROSIZE]), LERPCONST), SCROLLENDHEROSIZE)
      setHeadingSize(newVal)
    }
    // if (position > SCROLLEND) {
    //   headingAnimate(headingScope.current, {
    //     backgroundColor: 'var(--color-liber-red)'
    //   }, {
    //     duration: 2,
    //     // type: 'spring',
    //     delay: 0.5
    //   })
    // } else {
    //   headingAnimate(headingScope.current, {
    //     backgroundColor: 'var(--color-liber-beige)'
    //   }, {
    //     duration: 0.5,
    //     type: 'spring',
    //     delay: 0.5
    //   })
    // }
  })

  return (
    <div className="w-full flex flex-col gap-32">
      <div
        ref={headingScope}
        className="sticky top-0 px-20 py-10 opacity-0 origin-top-left
        border-b-2
        shadow-xl shadow-liber-red/10
        flex flex-row gap-10
        z-[99]"
        style={{
          transform: 'translateY(200px)',
          scale: 1,
          backgroundColor: 'var(--color-liber-beige)'
        }}
      >
        <div className="min-w-[2.5vw] h-full self-baseline">
          <p className="
              font-heading font-black pl-2
              text-liber-brown text-lg">
            {
              index + 1 == total && `FINAL ACT`
            }
            {
              index + 1 != total && `ACT ${ index + 1 }`
            }
          </p>
          <p
            ref={headingIntersectionRef}
            className="text-8xl font-black font-heading text-left origin-top-left tracking-tighter
            "
            style={{
              scale: useHeadingSize
            }}
          >{ heading }</p>
        </div>
      </div>
      <div className="">
        {
          body.map((item, index) => {
            if (item[0] === '!') {
              const src = 'archetype' + item.slice(4, item.length-1).replace('public/', '')
              const absoluteUrl = new URL(src, siteOrigin).toString();
              // console.log('Image ==> ', absoluteUrl)
              return (
                <img src={ absoluteUrl } className="w-full"/>
              )
            }
            return (
              <div className="py-64 px-20">
                <Caption
                  colors={colors}
                  duration={1.5} text={item }/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
