import { useState, useEffect } from "react";

export interface WindowDimension {
    height: number
    width: number
}

const useWindowDimensions = (): WindowDimension => {
    const [ dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return dimensions
}

export default useWindowDimensions