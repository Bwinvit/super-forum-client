// import { FC } from "react";
// import Thread from "../../../models/Thread";
// import { useNavigate } from "react-router-dom";
// import useWindowDimensions from "../../../hook/useWindowDimension";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faReplyAll } from "@fortawesome/free-solid-svg-icons";

// interface ThreadCardProps {
//     thread: Thread;
// }

// const ThreadCard: FC<ThreadCardProps> = ({ thread }) => {
//     const navigate = useNavigate();
//     const { width } = useWindowDimensions();

//     const onClickShowThread = (e: React.MouseEvent<HTMLDivElement>) => {
//         navigate("/thread/" + thread.id);
//     };

//     const getResponse = (thread: Thread) => {
//         if (width <= 768) {
//             return (
//                 <label style={{ marginRight: ".5rem" }}>
//                     {thread && thread.threadItems && thread.threadItems.length}
//                     <FontAwesomeIcon
//                         icon={faReplyAll}
//                         className="points-icon"
//                         style={{ margin: "-.25rem 0 0 .25rem" }}
//                     />
//                 </label>
//             );
//         }
//         return null;
//     };

    
// };

export {}