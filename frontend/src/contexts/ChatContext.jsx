import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest } from "../services/chatService/chatService";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userchatsError, setUserChatsError] = useState(null);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true)
                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)

                setIsUserChatsLoading(false)

                if (response.error) {
                    return setUserChatsError(response)
                }
                setUserChats(response)
            }
        }

        getUsserChats()
    }, [user])

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userchatsError
        }}>
            {children}
        </ChatContext.Provider>)

}