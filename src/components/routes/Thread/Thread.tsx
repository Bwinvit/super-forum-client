import { useEffect, useReducer, useState } from "react";
import ThreadModel from "../../../models/Thread";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../../areas/Nav/Nav";
import ThreadHeader from "./ThreadHeader";
import ThreadCategory from "./ThreadCategory";
import ThreadTitle from "./ThreadTitle";
import "./Thread.css";
import ThreadBody from "./ThreadBody";
import ThreadResponseBuilder from "./ThreadResponseBuilder";
import ThreadPointsBar from "../../points/ThreadPointsBar";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Category from "../../../models/Category";
import { useAppSelector } from "../../../store/hooks";
import ThreadResponse from "./ThreadResponse";
import useWindowDimensions from "../../../hook/useWindowDimension";
import ThreadPointsInline from "../../points/ThreadPointInline";
import { getTextFromNodes } from "../../editor/RichEditor";
import { Node } from "slate";

const GetThreadById = gql`
    query GetThreadById($id: ID!) {
        getThreadById(id: $id) {
            ... on EntityResult {
                messages
            }
            ... on Thread {
                id
                user {
                    userName
                    id
                }
                lastModifiedOn
                title
                body
                points
                category {
                    id
                    name
                }
                threadItems {
                    id
                    body
                    points
                    user {
                        userName
                        id
                    }
                }
            }
        }
    }
`;

const CreateThread = gql`
    mutation createThread(
        $userId: ID!
        $categoryId: ID!
        $title: String!
        $body: String!
    ) {
        createThread(
            userId: $userId
            categoryId: $categoryId
            title: $title
            body: $body
        ) {
            messages
        }
    }
`;

const threadReducer = (state: any, action: any) => {
    switch (action.type) {
        case "userId":
            return { ...state, userId: action.payload };
        case "category":
            return { ...state, category: action.payload };
        case "title":
            return { ...state, title: action.payload };
        case "body":
            return { ...state, body: action.payload };
        case "bodyNode":
            return { ...state, bodyNode: action.payload };
        default:
            throw new Error("Unknown action type");
    }
};

const Thread = () => {
    const { width } = useWindowDimensions();
    const [execGetThreadById, { data: threadData }] = useLazyQuery(
        GetThreadById,
        { fetchPolicy: "no-cache" }
    );
    const [thread, setThread] = useState<ThreadModel | undefined>();
    const { id } = useParams();
    const [readOnly, setReadOnly] = useState(false);
    const user = useAppSelector((state) => state.user);
    const [{ userId, category, title, bodyNode }, threadReducerDispatch] =
        useReducer(threadReducer, {
            userId: user ? user.id : "0",
            category: undefined,
            title: "",
            body: "",
            bodyNode: undefined,
        });
    const [postMsg, setPostMsg] = useState("");
    const [execCreateThread] = useMutation(CreateThread);
    const navigate = useNavigate();

    const refreshThread = () => {
        if (id && parseInt(id) > 0) {
            execGetThreadById({
                variables: {
                    id,
                },
            });
        }
    };

    useEffect(() => {
        if (id && parseInt(id) > 0) {
            execGetThreadById({
                variables: {
                    id,
                },
            });
        }
    }, [id, execGetThreadById]);

    useEffect(() => {
        if (threadData && threadData.getThreadById) {
            setThread(threadData.getThreadById);
            setReadOnly(true);
        } else {
            setThread(undefined);
            setReadOnly(false);
        }
    }, [threadData]);

    const receiveSelectedCategory = (cat: Category) => {
        threadReducerDispatch({
            type: "category",
            payload: cat,
        });
    };

    const receiveTitle = (updateTitle: string) => {
        threadReducerDispatch({
            type: "title",
            payload: updateTitle,
        });
    };

    const receiveBody = (body: Node[]): void => {
        threadReducerDispatch({
            type: "bodyNode",
            payload: body,
        });
        threadReducerDispatch({
            type: "body:",
            payload: getTextFromNodes(body),
        });
    };

    const onClickPost = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        console.log("bodyNode", getTextFromNodes(bodyNode));
        // gather updated data
        if (!userId || userId === "0") {
            setPostMsg("You must be logged in before you can post.");
        } else if (!category) {
            setPostMsg("Please select a category for your post.");
        } else if (!title) {
            setPostMsg("Please enter a title.");
        } else if (!bodyNode) {
            setPostMsg("Please enter a body.");
        } else {
            setPostMsg("");
            const newThread = {
                userId,
                categoryId: category?.id,
                title,
                body: JSON.stringify(bodyNode),
            };
            console.log("newThread", newThread);
            // send to server to save
            const { data: createThreadMsg } = await execCreateThread({
                variables: newThread,
            });
            console.log("createThreadMsg", createThreadMsg);
            if (
                createThreadMsg.createThread &&
                createThreadMsg.createThread.messages &&
                !isNaN(createThreadMsg.createThread.messages[0])
            ) {
                setPostMsg("Thread posted successfully.");
                navigate(`/thread/${createThreadMsg.createThread.messages[0]}`);
            } else {
                setPostMsg(createThreadMsg.createThread.messages[0]);
            }
        }
    };

    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Nav />
            </div>
            <div className="thread-content-container">
                <div className="thread-content-post-container">
                    {width <= 768 ? (
                        <ThreadPointsInline points={thread?.points || 0} />
                    ) : null}

                    <ThreadHeader
                        userName={
                            thread ? thread.user.userName : user?.userName
                        }
                        LastModifiedOn={
                            thread ? thread.lastModifiedOn : new Date()
                        }
                        title={thread ? thread.title : title}
                    />

                    <ThreadCategory
                        category={thread ? thread.category : category}
                        sendOutSelectedCategory={receiveSelectedCategory}
                    />

                    <ThreadTitle
                        title={thread ? thread?.title : ""}
                        readOnly={readOnly}
                        sendOutTitle={receiveTitle}
                    />

                    <ThreadBody
                        body={thread ? thread.body : ""}
                        readOnly={thread ? readOnly : false}
                        sendOutBody={receiveBody}
                    />
                </div>

                <div className="thread-content-points-container">
                    <ThreadPointsBar
                        points={thread?.points || 0}
                        responseCount={
                            (thread &&
                                thread.threadItems &&
                                thread.threadItems.length) ||
                            0
                        }
                        threadId={thread?.id || "0"}
                        allowUpdatePoints={true}
                        refreshThread={refreshThread}
                    />
                </div>
            </div>

            {thread ? (
                <div className="thread-content-response-container">
                    <hr className="thread-section-divider" />
                    <div style={{ marginBottom: ".5em" }}>
                        <strong>Post Response</strong>
                    </div>
                    <ThreadResponse
                        body={""}
                        userName={user?.userName}
                        lastModifiedOn={new Date()}
                        points={0}
                        readOnly={false}
                        threadItemId={thread.id}
                        refreshThread={refreshThread}
                    />
                </div>
            ) : null}

            {thread ? (
                <div className="thread-content-response-container">
                    <hr className="thread-section-divider" />
                    <ThreadResponseBuilder
                        threadItem={thread?.threadItems}
                        readOnly={readOnly}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default Thread;
