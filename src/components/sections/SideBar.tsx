'use client'

import { useEffect, useState } from "react";

export default function SideBar({ slug, sitePath, colors }: { slug: string, sitePath?: string, colors: any }) {
    const content = ['premise', 'synopsis', 'strength']
    const [useAffiliation, setAffiliation] = useState('')

    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const aff = localStorage.getItem('affiliation')
        if (aff) {
            setAffiliation(aff)
        }
    })

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
        { threshold: 0.01 }
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
        // console.log('Current Section --> ', activeSection)
    }, [activeSection])



    return (
        <div className="
            text-lg
            flex flex-col
            gap-1 text-right
            align-bottom justify-end
            h-full p-12">
                <div className="my-10 py-10 font-black tracking-wide transition-all duration-150">
                    <a className="sidebar" href={sitePath + useAffiliation.toLowerCase()}>{useAffiliation && useAffiliation}</a>
                </div>
            {
                content.map((item, index) => {
                    return (
                        <div key={index} className={`
                            hover:translate-x-2
                            origin-right
                            font-heading
                            transition-all duration-200
                            ` + (activeSection === item ? `  translate-x-2 font-semibold` : ` `)}>
                            <a
                                href={`#${item}`}
                                data-section-id={`#${item}`}
                                className="
                                    sidebar
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
