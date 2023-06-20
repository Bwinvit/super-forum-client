import { QueryLazyOptions, gql, useLazyQuery } from "@apollo/client";
import { setUserProfile, setLogOutUserProfile } from "../store/user/userSlice";
import { useAppDispatch } from "../store/hooks";

export const Me = gql`
query Me {
      me {
        ... on EntityResult {
          messages
        }
        ... on User {
          id
          userName
          threads {
            id
            title
            threadItems {
              id
              thread {
                id
                body
              }
            }
          }
        }
      }
    }
`

interface UseRefreshReduxMeResult {
      execMe: (option?: QueryLazyOptions<Record<string, any>> | undefined) => void
      deleteMe: () => void
      updateMe: () => void
}

const useRefreshReduxMe = (): UseRefreshReduxMeResult => {
      const [execMe, { data }] = useLazyQuery(Me)
      const appDispatch = useAppDispatch()

      if (data) {
            appDispatch(setUserProfile(data.me))
      }


      const deleteMe = () => {
            appDispatch(setLogOutUserProfile())
      }

      const updateMe = () => {
            if (data && data.me && data.me.userName) {
                  // reduxDispatcher({
                  //       type: UserProfileSetType,
                  //       payload: data.me
                  // })
            }
      }

      return { execMe, deleteMe, updateMe }
}

export default useRefreshReduxMe