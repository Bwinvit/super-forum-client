import { FC } from "react"
import UserNameAndTime from "./UserNameAndTime"
import RichEditor from "../../editor/RichEditor"


interface ThreadResponseProps {
      body?: string
      userName?: string
      LastModifiedOn?: Date
      points: number
}

const ThreadResponse: FC<ThreadResponseProps> = ({
      body,
      userName,
      LastModifiedOn,
      points
}) => {
      return (
            <div>
                  <div>
                        <UserNameAndTime userName={userName} LastModifiedOn={LastModifiedOn} />
                        <span style={{ marginLeft: "1em" }}>

                        </span>
                  </div>
                  <div className="thread-body-editor">
                        <RichEditor existingBody={body} />
                  </div>
            </div>
      )
}

export default ThreadResponse