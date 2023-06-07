import { FC } from "react";
import UserNameAndTime from "./UserNameAndTime";
import RichEditor from "../../editor/RichEditor";
import ThreadPointsInline from "../../points/ThreadPointInline";

interface ThreadResponseProps {
    body?: string;
    userName?: string;
    LastModifiedOn?: Date;
    points: number;
}

const ThreadResponse: FC<ThreadResponseProps> = ({
    body,
    userName,
    LastModifiedOn,
    points,
}) => {
    return (
        <div>
            <div>
                <UserNameAndTime
                    userName={userName}
                    LastModifiedOn={LastModifiedOn}
                />
                <span style={{ marginLeft: "1em" }}>
                    <ThreadPointsInline points={points || 0} />
                </span>
            </div>
            <div className="thread-body-editor">
                <RichEditor existingBody={body} />
            </div>
        </div>
    );
};

export default ThreadResponse;
