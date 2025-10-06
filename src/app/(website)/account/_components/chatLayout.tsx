import ChatLayout from '@/components/chat/chatLayout'

export default function ChatPage() {
  const conversations = [
    {
      id: '1',
      orderId: 'XXXXX',
      preview: 'Hi, I have a question...',
      timestamp: '10:15 AM',
      messages: [
        {
          id: '1',
          content: 'Hi, Mindy',
          sender: 'user',
          timestamp: '09:41 AM',
        },
        {
          id: '2',
          content: "I've tried the app",
          sender: 'user',
          timestamp: '09:41 AM',
        },
        {
          id: '3',
          content: 'Really?',
          sender: 'support',
          timestamp: '09:42 AM',
        },
      ],
    },
    {
      id: '2',
      orderId: 'XXXXX',
      preview: 'Hi, I have a question...',
      timestamp: '10:15 AM',
      messages: [],
    },
  ]

  return <ChatLayout conversations={conversations} />
}
