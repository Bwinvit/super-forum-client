import { FC, useEffect, useState } from "react"


interface ThreadTitleProps {
      title?: string
      readOnly: boolean
      sendOutTitle: (title: string) => void
}

const ThreadTitle: FC<ThreadTitleProps> = ({
      title,
      readOnly,
      sendOutTitle
}) => {
      const [ currentTile, setCurrentTile ] = useState("")

      useEffect(() => {
            setCurrentTile(title || "")
      }, [title])

      const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentTile(e.target.value)
            sendOutTitle(e.target.value)
      }

      return (
            <div className="thread-title-container">
                  <strong>Title</strong>
                  <div className="field">
                        <input
                              type="text"
                              value={currentTile}
                              onChange={onChangeTitle}
                              readOnly={readOnly}
                        />
                  </div>
            </div>
      )
}

export default ThreadTitle