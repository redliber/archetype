'use client'

import { useEffect, useState } from "react";

export default function SideBar ({slug} : {slug: string}) {
    const content = ['premise', 'synopsis', 'strengths', 'characters']

    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        // Create Intersection Observer
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id); // Update active section
            }
            });
        },
        { threshold: 0.25 } // Trigger when 50% of the section is visible
        );

        // Observe each section
        content.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        // Cleanup observer on unmount
        return () => {
            content.forEach((id) => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    useEffect(() => {
        console.log('Current Section --> ', activeSection)
    }, [activeSection])

    return (
        <div className="
            text-lg
            flex flex-col
            gap-1 text-right 
            align-bottom justify-end 
            h-full p-12">
            {
                content.map((item, index) => {
                    return (
                        <div key={index} className={` 
                            hover:font-black hover:translate-x-2
                            active:text-liber-brown
                            origin-right
                            transition-all duration-200 
                            ` + (activeSection === item ? ` text-orange-100 font-black translate-x-2` : ` `)}>
                            <a
                                href={`#${item}`}
                                data-section-id={`#${item}`}
                                className="
                                    nav-link
                                    "
                                >{item.toUpperCase()}</a>
                        </div>
                    )
                })
            }
        </div>
    )
}