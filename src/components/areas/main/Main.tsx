import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from "../../../models/Category";
import { getThreadsByCategory } from "../../../services/DataService";
import MainHeader from "./MainHeader";

const Main = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState<Category | undefined>();
    const [threadCards, setThreadCards] = useState<Array<JSX.Element> | null>(
        null
    );

    useEffect(() => {
        if (categoryId && parseInt(categoryId) > 0) {
            getThreadsByCategory(categoryId).then((threads: any) => {
                const cards = threads.map((th: { id: any }) => {
                    // return <ThreadCards key={`thread-${th.id}`} thread={th} />
                    return <div>{th.id}</div>;
                });
                if (!category) {
                    setCategory(threads[0].category);
                }
                setThreadCards(cards);
            });
        }
    }, [category, categoryId]);

    return (
        <main className="content">
            <MainHeader category={category} />
            <div>{threadCards}</div>
        </main>
    );
};

export default Main;
