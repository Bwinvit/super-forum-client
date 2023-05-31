import { FC, useEffect, useState } from "react";
import ThreadItem from "../../../models/ThreadItem";
import ThreadResponse from "./ThreadResponse";


interface ThreadResponseBuilderProps {
      threadItem?: Array<ThreadItem>
}

const ThreadResponseBuilder: FC<ThreadResponseBuilderProps> = ({ threadItem }) => {
      const [ responseElements, setResponseElement ] = useState<JSX.Element | undefined> ()

      useEffect(() => {
            if (threadItem) {
                  const thResponse = threadItem.map((ti) => {
                        return (
                              <li key={`thr-${ti.id}`}>
                                    <ThreadResponse
                                          body={ti.body}
                                          userName={ti.userName}
                                          LastModifiedOn={ti.createdOn}
                                          points={ti.points}
                                    />
                              </li>
                        )
                  })
                  setResponseElement(<ul>{thResponse}</ul>)
            }
      }, [threadItem])

      return (
            <div className="thread-body-container">
                  <strong style={{ marginBottom: ".75em" }}>Response</strong>
                  {responseElements}
            </div>
      )
}

export default ThreadResponseBuilder