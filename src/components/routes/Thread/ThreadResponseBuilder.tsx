import { FC, useEffect, useState } from "react";
import ThreadItem from "../../../models/ThreadItem";
import ThreadResponse from "./ThreadResponse";


interface ThreadResponseBuilderProps {
      threadItem?: Array<ThreadItem>
      readOnly: boolean
      refreshThread?: () => void
}

const ThreadResponseBuilder: FC<ThreadResponseBuilderProps> = ({
      threadItem,
      readOnly,
      refreshThread
}) => {
      const [ responseElements, setResponseElement ] = useState<JSX.Element | undefined> ()

      useEffect(() => {
            if (threadItem) {
                  const thResponses = threadItem.map((ti) => {
                        return (
                              <li key={`thr-${ti.id}`}>
                                    <ThreadResponse
                                          body={ti.body}
                                          userName={ti.user.userName}
                                          lastModifiedOn={ti.createdOn}
                                          points={ti.points}
                                          readOnly={readOnly}
                                          threadItemId={ti?.id || "0"}
                                          refreshThread={refreshThread}
                                    />
                              </li>
                        )
                  })
                  setResponseElement(<ul>{thResponses}</ul>)
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [threadItem, readOnly])

      return (
            <div className="thread-body-container">
                  <strong style={{ marginBottom: ".75em" }}>Response</strong>
                  {responseElements}
            </div>
      )
}

export default ThreadResponseBuilder