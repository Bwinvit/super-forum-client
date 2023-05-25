import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../hook/useWindowDimension";
import { getCategories } from "../../../services/DataService";
import Category from "../../../models/Category";

const LeftMenu = () => {
    const { width } = useWindowDimensions()
    const [ categories, setCategories ] = useState<JSX.Element>(
        <div>Left Menu</div>
    )

    useEffect(() => {
        setCategories(<div>Loading...</div>);
        
        getCategories()
            .then((categories: Array<Category>) => {
                const cats = categories.map((cat) => {
                    return <li key={cat.id}>{cat.name}</li>
                })
                setCategories(<ul className="category">{cats}</ul>)
            })
            .catch((err) => {
                throw new Error(err)
            })
    }, [])

    if (width <= 768) {
        return null
    }
    return <div className="leftmenu">{categories}</div>
}

export default LeftMenu