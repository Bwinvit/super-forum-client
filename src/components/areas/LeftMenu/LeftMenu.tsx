import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../hook/useWindowDimension";
// import { getCategories } from "../../../services/DataService";
// import Category from "../../../models/Category";
import { useAppSelector } from "../../../store/hooks";
import { Link } from "react-router-dom";

const LeftMenu = () => {
    const { width } = useWindowDimensions();
    const category = useAppSelector((state) => state.category)
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Left Menu</div>
    );

    useEffect(() => {
        const categoryList = category.payload.map((cat: any) => {
            return <li key={cat.id}>
                <Link to={`/categorythreads/${cat.id}`} style={{textDecoration: "none"}}>{cat.name}</Link>
            </li>
        })
        setCategories(<ul className="category">{categoryList}</ul>)
    }, [category]);

    if (width <= 768) {
        return null;
    }
    return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;
