import { FC } from "react"
import getTimePassIfLessThanDay from "../../../common/dates"


interface UserNameAndTimeProps {
      userName?: string
      LastModifiedOn?: Date
}

const UserNameAndTime: FC<UserNameAndTimeProps> = ({
      userName,
      LastModifiedOn
}) => {
      return (
            <span>
                  <strong>{userName}</strong>
                  <label style={{ marginLeft: "1em"}}>
                        {LastModifiedOn ? getTimePassIfLessThanDay(LastModifiedOn) : ""}
                  </label>
            </span>
      )
}

export default UserNameAndTime