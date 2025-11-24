import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Send, Search, MoreVertical, Paperclip, Mic, Smile } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Menubar from '@/components/Menubar';

// Sample chat data
interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
  isOnline: boolean;
}

const sampleChats: Chat[] = [
  {
    id: 1,
    name: 'Dr. Sharma',
    avatar: '👨‍⚕️',
    lastMessage: 'Please complete the assignment by tomorrow',
    time: '10:30 AM',
    unread: 2,
    isOnline: true,
    messages: [
      {
        id: 1,
        text: 'Hello, how can I help you today?',
        sender: 'them',
        timestamp: new Date(2025, 8, 20, 10, 20)
      },
      {
        id: 2,
        text: 'I have a question about the last lecture',
        sender: 'me',
        timestamp: new Date(2025, 8, 20, 10, 22)
      },
      {
        id: 3,
        text: 'Please complete the assignment by tomorrow',
        sender: 'them',
        timestamp: new Date(2025, 8, 20, 10, 30)
      }
    ]
  },
  {
    id: 2,
    name: 'Study Group - NEET 2025',
    avatar: '👥',
    lastMessage: 'Let\'s discuss the physics problems',
    time: '9:15 AM',
    unread: 0,
    isOnline: true,
    messages: [
      {
        id: 1,
        text: 'Welcome everyone to the study group!',
        sender: 'them',
        timestamp: new Date(2025, 8, 20, 9, 0)
      },
      {
        id: 2,
        text: 'Let\'s discuss the physics problems from chapter 5',
        sender: 'them',
        timestamp: new Date(2025, 8, 20, 9, 15)
      }
    ]
  },
  {
    id: 3,
    name: 'Admin',
    avatar: '👨‍💼',
    lastMessage: 'Your payment has been received',
    time: 'Yesterday',
    unread: 0,
    isOnline: false,
    messages: [
      {
        id: 1,
        text: 'Your payment of ₹5,999 has been received',
        sender: 'them',
        timestamp: new Date(2025, 8, 19, 14, 30)
      },
      {
        id: 2,
        text: 'Thank you!',
        sender: 'me',
        timestamp: new Date(2025, 8, 19, 14, 35)
      }
    ]
  }
];

const ChatsPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(sampleChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set first chat as active by default
  useEffect(() => {
    if (chats.length > 0 && !activeChat) {
      setActiveChat(chats[0]);
    }
  }, [chats, activeChat]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        const newMsg = {
          id: chat.messages.length + 1,
          text: newMessage,
          sender: 'me' as const,
          timestamp: new Date()
        };
        
        return {
          ...chat,
          lastMessage: newMessage,
          time: 'Just now',
          messages: [...chat.messages, newMsg]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setActiveChat(updatedChats.find(chat => chat.id === activeChat.id) || null);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = searchQuery
    ? chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on medium screens and up */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Bar */}
        <Menubar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto py-8 px-16">
          <div className="max-w-7xl mx-auto">
            {/* Chat Interface */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex h-[600px]">
                {/* Chat List */}
                <div className="w-1/3 border-r border-gray-200 flex flex-col">
                  {/* Search */}
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Chat list */}
                  <div className="flex-1 overflow-y-auto">
                    {filteredChats.length > 0 ? (
                      filteredChats.map(chat => (
                        <div 
                          key={chat.id}
                          className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${activeChat?.id === chat.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setActiveChat(chat)}
                        >
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                              {chat.avatar}
                            </div>
                            {chat.isOnline && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                          </div>
                          {chat.unread > 0 && (
                            <div className="ml-2 bg-blue-600 text-white text-xs font-medium h-5 w-5 rounded-full flex items-center justify-center">
                              {chat.unread}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        <p>No conversations found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  {activeChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                              {activeChat.avatar}
                            </div>
                            {activeChat.isOnline && (
                              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium text-gray-900">{activeChat.name}</h3>
                            <p className="text-xs text-gray-500">
                              {activeChat.isOnline ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                          {activeChat.messages.map((message) => (
                            <div 
                              key={message.id} 
                              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'me' 
                                  ? 'bg-blue-600 text-white rounded-br-none' 
                                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}
                              >
                                <p>{message.text}</p>
                                <p className={`text-xs mt-1 text-right ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {format(message.timestamp, 'h:mm a')}
                                </p>
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center">
                          <button className="text-gray-500 hover:text-gray-700 p-2">
                            <Paperclip className="h-5 w-5" />
                          </button>
                          <div className="relative flex-1 mx-2">
                            <input
                              type="text"
                              placeholder="Type a message..."
                              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={handleKeyPress}
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                              <Smile className="h-5 w-5" />
                            </button>
                          </div>
                          <button 
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                          >
                            {newMessage.trim() ? (
                              <Send className="h-5 w-5" />
                            ) : (
                              <Mic className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                      <div className="p-6 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                          <MessageSquare className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No chat selected</h3>
                        <p className="text-sm text-gray-500">Select a conversation or start a new one</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;