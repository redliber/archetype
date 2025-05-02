'use client'

import Caption from "../ui/Caption"

export default function Strength({strength, colors}: {strength:string[], colors:any}) {

  return (
    <div className="flex flex-col gap-20 p-20 bg-liber-red ">
      {
        strength.map((item, index) => (
          <div className="mt-24">
            <Caption
              colors={colors}
              className='text-8xl text-liber-beige ' text={item}/>
          </div>
        ))
      }
    </div>
  )
}
