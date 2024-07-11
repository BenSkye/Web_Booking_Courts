import { useContext } from "react"
import { ChatContext } from "../../contexts/ChatContext"

const Chat = () => {

    const { userChats,
        isUserChatsLoading,
        userchatsError } = useContext(ChatContext)

    console.log("UserChats", userChats)
    return <>Chat</>

}
export default Chat