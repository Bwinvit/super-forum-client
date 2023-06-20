import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from "../../../models/Category";
import MainHeader from "./MainHeader";
import ThreadCard from "./ThreadCard";
import { gql } from "@apollo/client/core";
import { useLazyQuery } from "@apollo/client";

const GET_THREADS_BY_CATEGORY_ID = gql`
    query getThreadsByCategoryId($categoryId: ID!) {
        getThreadsByCategoryId(categoryId: $categoryId) {
            ... on EntityResult {
                messages
            }

            ... on ThreadArray {
                threads {
                    id
                    title
                    body
                    views
                    points
                    user {
                        userName
                    }
                    threadItems {
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const GET_THREADS_LATEST = gql`
    query getThreadsLatest {
        getThreadsLatest {
            ... on EntityResult {
                messages
            }

            ... on ThreadArray {
                threads {
                    id
                    title
                    body
                    views
                    points
                    user {
                        userName
                    }
                    threadItems {
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const Main = () => {
    const [
        execGetThreadsByCat,
        {
            //error: threadsByCatErr,
            //called: threadsByCatCalled,
            data: threadsByCatData,
        },
    ] = useLazyQuery(GET_THREADS_BY_CATEGORY_ID);
    const [
        execGetThreadsLatest,
        {
            //error: threadsLatestErr,
            //called: threadsLatestCalled,
            data: threadsLatestData,
        },
    ] = useLazyQuery(GET_THREADS_LATEST);
    const { categoryId } = useParams();
    const [ category, setCategory ] = useState<Category | undefined>();
    const [ threadCards, setThreadCards ] = useState<Array<JSX.Element> | null>(
        null
    );

    useEffect(() => {
        if (categoryId && parseInt(categoryId) > 0) {
            execGetThreadsByCat({
                variables: {
                    categoryId,
                },
            });
        } else {
            execGetThreadsLatest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    useEffect(() => {
        if (
            threadsByCatData &&
            threadsByCatData.getThreadsByCategoryId &&
            threadsByCatData.getThreadsByCategoryId.threads
        ) {
            const threads = threadsByCatData.getThreadsByCategoryId.threads;
            const cards = threads.map((th: any) => {
                return <ThreadCard key={`thread-${th.id}`} thread={th} />;
            });
            setCategory(threads[0].category);
            setThreadCards(cards);
        }
    }, [threadsByCatData]);

    useEffect(() => {
        if (
            threadsLatestData &&
            threadsLatestData.getThreadsLatest &&
            threadsLatestData.getThreadsLatest.threads
        ) {
            const threads = threadsLatestData.getThreadsLatest.threads;
            const cards = threads.map((th: any) => {
                return <ThreadCard key={`thread-${th.id}`} thread={th} />;
            });
            setCategory(new Category("0", "Latest"));
            setThreadCards(cards);
        }
    }, [threadsLatestData]);

    return (
        <main className="content">
            <MainHeader category={category} />
            <div>{threadCards}</div>
        </main>
    );
};

export default Main;
