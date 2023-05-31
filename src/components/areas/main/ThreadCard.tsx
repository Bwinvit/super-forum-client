import React, { FC } from "react";
import "./ThreadCard.css"
import Thread from '../../../models/Thread'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowDimensions from "../../../hook/useWindowDimension";
import { faEye, faHeart, faReply } from "@fortawesome/free-solid-svg-icons";
import "./ThreadCard.css"

interface ThreadCardProps {
    thread: Thread
}

const ThreadCard: FC<ThreadCardProps> = ({ thread }) => {
    const navigate = useNavigate()
    const { width } = useWindowDimensions()

    const onClickShowThread = (e: React.MouseEvent<HTMLElement>) => {
        navigate("/thread/" + thread.id)
    }

    const getPoints = ( thread: Thread) => {
        if ( width <= 768 ) {
            return (
                <label
                    style={{ margin: ".25rem .75rem"}}
                >
                    {thread.points || 0}
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="points-icon"
                        style={{ marginLeft: ".2rem"}}
                    />
                </label>
            )
        }
        return null
    }

    const getResponse = ( thread : Thread ) => {
        if ( width <= 768) {
            return (
                <label
                    style={{ marginRight: ".5rem"}}
                >
                    { thread && thread.threadItems && thread.threadItems.length}
                    <FontAwesomeIcon
                        icon={faReply}
                        className="points-icon"
                        style={{ margin: "-.25rem 0 0 .25rem"}}
                    />
                </label>
            )
        }
        return null
    }

    const getPointsNonMobile = () => {
        if ( width > 768) {
            return (
                <div className="threadcard-points">
                    <div className="threadcard-points-item">
                        { thread.points || 0}
                        <br />
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="points-icon"
                        />
                    </div>
                    <div className="threadcard-points-item" style={{ marginBottom: ".75rem"}}>
                        { thread && thread.threadItems && thread.threadItems.length}
                        <br />
                        <FontAwesomeIcon
                            icon={faReply}
                            className="points-icon"
                        />
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <section className="panel threadcard-container">
            <div className="threadcard-txt-container">
                <div className="content-header">
                    <Link
                        to={`/categorythreads/${thread.category.id}`}
                        className="link-txt"
                    >
                        <strong>{thread.category.name}</strong>
                    </Link>
                    <span className="usernamme-header" style={{ marginLeft: ".5rem"}}>
                        {thread.userName}
                    </span>
                </div>
                <div className="question">
                    <div
                        onClick={onClickShowThread}
                        data-thread-id={thread.id}
                        style={{marginBottom: ".4em"}}
                    >
                        <strong>{thread.title}</strong>
                    </div>
                    <div
                        className="threadcard-body"
                        onClick={onClickShowThread}
                        data-thread-id={thread.id}
                    >
                        <div>{thread.body}</div>
                    </div>
                    <div className="threadcard-footer">
                        <span
                            style={{marginRight: ".5em"}}
                        >
                            <label>
                                {thread.views}
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="icon-lg"
                                />
                            </label>
                        </span>
                        <span>
                            {getPoints(thread)}
                            {getResponse(thread)}
                        </span>
                    </div>
                </div>
            </div>
            {getPointsNonMobile()}
        </section>
    )
}

export default ThreadCard