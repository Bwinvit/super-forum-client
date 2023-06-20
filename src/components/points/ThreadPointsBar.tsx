import { FC } from "react";
import useWindowDimensions from "../../hook/useWindowDimension";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faHeart,
    faReplyAll,
} from "@fortawesome/free-solid-svg-icons";
import useUpdateThreadPoint from "../../hook/useUpdateThreadPoint";

export interface ThreadPointsBarProps {
    points: number;
    responseCount?: number;
    threadId?: string;
    allowUpdatePoints?: boolean;
    refreshThread?: () => void;
}

const ThreadPointsBar: FC<ThreadPointsBarProps> = ({
    points = 0,
    responseCount,
    threadId,
    allowUpdatePoints = false,
    refreshThread,
}) => {
    const { width } = useWindowDimensions();
    const { onClickIncThreadPoint, onClickDecThreadPoint } = useUpdateThreadPoint( refreshThread, threadId )

    if (width > 768) {
        return (
            <div className="threadcard-points">
                <div className="threadcard-points-item">
                    <div
                        className="threadcard-points-item-btn"
                        style={{
                            display: `${allowUpdatePoints ? "block" : "none"}`,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronUp}
                            className="point-icon"
                            onClick={onClickIncThreadPoint}
                        />
                    </div>
                    {points}
                    <div
                        className="threadcard-points-item-btn"
                        style={{
                            display: `${allowUpdatePoints ? "block" : "none"}`,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="point-icon"
                            onClick={onClickDecThreadPoint}
                        />
                    </div>
                    <FontAwesomeIcon icon={faHeart} className="points-icon" />
                </div>
                <div className="threadcard-points-item">
                    {responseCount}
                    <br />
                    <FontAwesomeIcon
                        icon={faReplyAll}
                        className="points-icon"
                    />
                </div>
            </div>
        );
    }
    return null;
};

export default ThreadPointsBar;
