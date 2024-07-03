"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import LightModeIcon from "./icons/LightModeIcon.tsx";
import DarkModeIcon from "./icons/DarkModeIcon.tsx";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="w-full flex justify-end items-center gap-2.5 pt-2.5">
            The current theme is: {theme}
            <Button
                className={theme === 'light' ? 'bg-foreground' : 'bg-blend-color'}
                isIconOnly onClick={() => setTheme('light')}>
                <LightModeIcon/>
            </Button>
            <Button
                className={theme === 'dark' ? 'bg-foreground' : 'bg-blend-color'}
                onClick={() => setTheme('dark')}>
                <DarkModeIcon/>
            </Button>
        </div>
    )
};

export default ThemeSwitcher;
