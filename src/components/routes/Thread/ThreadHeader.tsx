import { FC } from "react"
import UserNameAndTime from "./UserNameAndTime"


interface ThreadHeaderProps {
      userName: string
      LastModifiedOn: any
      title: string
}

const ThreadHeader: FC<ThreadHeaderProps> = ({
      userName,
      LastModifiedOn,
      title
}) => {
      return (
            <div className="thread-header-container">
                  <h3>{title}</h3>
                  <UserNameAndTime userName={userName} LastModifiedOn={LastModifiedOn} />
            </div>
      )
}

export default ThreadHeader