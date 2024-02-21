"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <button className="fixed bottom-2 right-2 p-2 rounded-full cursor-pointer bg-gray-700">            
            <Image
                src="/loading.svg"
                width={36}
                height={36}
                sizes="36x36"
                alt="Loading Light/Dark Toggle"
                priority={false}
                title="Loading Light/Dark Toggle"
            />
        </button>
    )

    if (resolvedTheme === 'dark') {
        return (
            <button onClick={() => setTheme('light')} className="fixed bottom-2 right-2 p-2 rounded-full cursor-pointer bg-gray-600 hover:bg-gray-500">
                <SunIcon className="text-white h-6 w-6" />
            </button>
        )
    }
    
    if (resolvedTheme === 'light') {
        return (
            <button onClick={() => setTheme('dark')} className="fixed bottom-2 right-2 p-2 rounded-full cursor-pointer bg-white-50 shadow-lg hover:bg-slate-200">
                <MoonIcon className="text-black h-6 w-6"/>
            </button>
        )
    }
}

export default ThemeSwitch