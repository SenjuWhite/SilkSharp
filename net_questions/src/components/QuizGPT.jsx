import React,{useState,useEffect} from "react";
import '../styles/stylesChat.css'
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react'


const QuizGPT = (props) => {
    const API_KEY = process.env.REACT_APP_GPT_KEY;
    const [typing,setTyping] = useState(false);
    const questionInfo = String(props.question);
   useEffect(()=> {
   const resetMessages = [messages[0]];
    setMessages(resetMessages);
    console.log('useEffect')
   }, [questionInfo]);
    const [messages, setMessages] = useState([
        {
        message:"Привіт, я Бобік! Напиши мені свою відповідь на це питання, щоб перевірити себе. Якщо ж твоя відповідь виявиться неправильною, виправлю та допоможу розібратися! ",
        sender: "ChatGPT",
        direction: "incoming"
        }
    ]);
    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage];
        setTyping(true);
        setMessages(newMessages);
        await processMessageToChatGPT(newMessages);

    }
const processMessageToChatGPT  = async (chatMessages) => {
let apiMessages = chatMessages.map((messageObj)=> { 
let role = messageObj.sender == "ChatGPT" ? "assistant" : "user";
return {
    role: role, content: messageObj.message
}
});
const systemMessage = {
    role: "system",
    content: `Ти є асистентом на сайті по підготовці до співбесід на .NET Developer. На сторінці згенеровано випадкове питання ${questionInfo} і користувач надішле тобі свою відповідь на нього. Перевір її, якщо вона неправильно, виправ та поясни чому так. Якщо впродовж бесіди користувач задає уточнюючі питання, відповідай на них.`
}
const apiRequestBody = {
    "model": "gpt-4o-mini",
    "messages" : [
        systemMessage,
        ...apiMessages
    ]
}
await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"

    },
    body: JSON.stringify(apiRequestBody)
}).then((data)=> {
    return data.json();
}).then((data)=>{
    console.log(data.choices[0].message.content);
    setMessages(
        [...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming"

        }]
    );
    setTyping(false);
})
}
  return (
    <div  style={{height:"85%"}} className="mt-25">
        <MainContainer>
            <ChatContainer>
                <MessageList
                 typingIndicator={typing ? <TypingIndicator content="Бобік пише"/> : null}>
                {messages.map((message, i)=>{
                    return <Message key={i} model={message}/>
                })}
                </MessageList>
                <MessageInput placeholder="Повідомлення для Бобіка" onSend={handleSend} />
            </ChatContainer>
        </MainContainer>
    </div>
  )
}

export default QuizGPT