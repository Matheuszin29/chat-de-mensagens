import React , { useState ,useEffect  } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const myId = uuidv4();
const socket = io('http://localhost:8080');
socket.on('connect' , ()=> console.log('[io] connect => new connection'))

const Chat = () => {
    //leitura do digitado
    const [message, updateMessage] = useState('');

    //messages recebidas
    const [messages, updateMessages] = useState([]);

    // ficçando mensagem no bate papo
    useEffect(() => {
        const handleNewMessage = newMessage =>
            updateMessages([...messages, newMessage])
        socket.on('chat.message', handleNewMessage)
        return () => socket.off('chat.message', handleNewMessage)
    }, [messages])
    
    // transformando o que foi digitado em um objeto (dica boa para banco de dados) aa
    const  handleFormSubmit = event =>{
        event.preventDefault();
        if(message.trim()){
            socket.emit('chat.message', {
                id : myId ,
                message
            })
            updateMessage('');
        }

    }

    // transformando os valores recebidos em uma constante
    const  handleinputchange = event => updateMessage(event.target.value);

    return(
        <main className='container'> 
            <ul className='list'>
                {messages.map((m, index)=>
                <li 
                    className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}
                    key={index}
                >
                        <span className= {`message message--${m.id === myId ? 'mine' : 'other'}`} >
                            { m.message }
                        </span>
                </li>
                )}
            </ul>
            <form className='form' onSubmit= {handleFormSubmit}>
                <input
                    type='text' 
                    className='form__field'
                    onChange={handleinputchange}
                    placeholder='type a new message' 
                    value={message} 
                />
            </form>
        </main>
    )
}

export default Chat ; 