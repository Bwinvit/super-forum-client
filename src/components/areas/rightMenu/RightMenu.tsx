import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../hook/useWindowDimension";
import { getTopCategories } from "../../../services/DataService";
import { groupBy } from "lodash";
import TopCategory from "./TopCategory";
import "./RightMenu.css"

const RightMenu = () => {
    const { width } = useWindowDimensions()
    const [ topCategories, setTopCategories ] = useState<Array<JSX.Element> | undefined>()

    useEffect(() => {
        getTopCategories()
            .then((res) => {
                const topCatThread = groupBy(res, "category")
                const topElement = []
                for (let key in topCatThread) {
                    const currentTop = topCatThread[key]
                    topElement.push(<TopCategory key={key} topCategories={currentTop} />)
                }
                setTopCategories(topElement)
            })
    }, [])

    if (width <= 768) {
        return null
    }
    return <div className="rightmenu rightmenu-container">{topCategories}</div>
}

export default RightMenu