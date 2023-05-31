import { useEffect, useState } from "react"
import ThreadModel from "../../../models/Thread";
import { useParams } from "react-router-dom";
import { getThreadById } from "../../../services/DataService";
import Nav from "../../areas/Nav/Nav";
import ThreadHeader from "./ThreadHeader";
import ThreadCategory from "./ThreadCategory";
import ThreadTitle from "./ThreadTitle";
import "./Thread.css"
import ThreadBody from "./ThreadBody";
import ThreadResponseBuilder from "./ThreadResponseBuilder";

const Thread = () => {
      const [ thread, setThread ] = useState<ThreadModel | undefined>()
      const { id } = useParams()

      useEffect(() => {
            if (id && id.length > 0) {
                  getThreadById(id)
                        .then((th) => {
                              setThread(th)
                        })
            }
      }, [id])

      return (
            <div className="screen-root-container">
                  <div className="thread-nav-container">
                        <Nav />
                  </div>
                  <div className="thread-content-post-container">
                        <ThreadHeader
                              userName={thread?.userName}
                              LastModifiedOn={thread ? thread.lastModifiedOn : new Date()}
                              title={thread?.title}
                        />
                        <ThreadCategory categoryName={thread?.category?.name} />
                        <ThreadTitle title={thread?.title} />
                        <ThreadBody body={thread?.body} />
                  </div>
                  <div className="thread-content-response-container">
                        <hr className="thread-section-divider" />
                        <ThreadResponseBuilder threadItem={thread?.threadItems} />
                  </div>
            </div>
      )
}

export default Thread