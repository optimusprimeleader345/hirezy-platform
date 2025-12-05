export interface RecruiterMessage {
  id: string
  conversationId: string
  sender: 'recruiter' | 'student'
  senderId: string
  text: string
  timestamp: string
  messageType?: 'text' | 'file' | 'image'
  fileUrl?: string
  fileName?: string
}

export const mockRecruiterMessages: Record<string, RecruiterMessage[]> = {
  conv1: [
    {
      id: 'msg1',
      conversationId: 'conv1',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'Hi John! I reviewed your application for the Frontend Developer position.',
      timestamp: '2025-11-01 10:00'
    },
    {
      id: 'msg2',
      conversationId: 'conv1',
      sender: 'student',
      senderId: 'app1',
      text: 'Hello! Thank you for considering my application.',
      timestamp: '2025-11-01 10:15'
    },
    {
      id: 'msg3',
      conversationId: 'conv1',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'Can you share your portfolio so I can review your work?',
      timestamp: '2025-11-01 10:30'
    },
    {
      id: 'msg4',
      conversationId: 'conv1',
      sender: 'student',
      senderId: 'app1',
      text: 'Of course! Here\'s the link to my portfolio: https://johndoe.dev',
      timestamp: '2025-11-01 10:45'
    },
    {
      id: 'msg5',
      conversationId: 'conv1',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'That looks great! Can you also share some examples of your React work?',
      timestamp: '2025-11-05 10:00'
    },
    {
      id: 'msg6',
      conversationId: 'conv1',
      sender: 'student',
      senderId: 'app1',
      text: 'Thanks! I\'ll share some project links shortly.',
      timestamp: '2025-11-05 12:15'
    },
    {
      id: 'msg7',
      conversationId: 'conv1',
      sender: 'student',
      senderId: 'app1',
      text: 'Thanks, I\'ll share the files shortly!',
      timestamp: '2025-11-05 12:30'
    }
  ],
  conv2: [
    {
      id: 'msg8',
      conversationId: 'conv2',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'Hi Sarah! I saw you applied for our React Native position.',
      timestamp: '2025-11-02 14:00'
    },
    {
      id: 'msg9',
      conversationId: 'conv2',
      sender: 'student',
      senderId: 'app2',
      text: 'Hi! Yes, I\'m very interested in the position.',
      timestamp: '2025-11-02 14:30'
    },
    {
      id: 'msg10',
      conversationId: 'conv2',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'Do you have experience with Redux or other state management?',
      timestamp: '2025-11-02 15:00'
    },
    {
      id: 'msg11',
      conversationId: 'conv2',
      sender: 'student',
      senderId: 'app2',
      text: 'Yes, I have experience with Redux Toolkit and Zustand as well.',
      timestamp: '2025-11-04 16:30'
    },
    {
      id: 'msg12',
      conversationId: 'conv2',
      sender: 'student',
      senderId: 'app2',
      text: 'Looking forward to your portfolio review.',
      timestamp: '2025-11-04 16:45'
    }
  ],
  conv3: [
    {
      id: 'msg13',
      conversationId: 'conv3',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'Hello Mike! Thanks for applying to our full stack position.',
      timestamp: '2025-11-03 09:00'
    },
    {
      id: 'msg14',
      conversationId: 'conv3',
      sender: 'student',
      senderId: 'app3',
      text: 'Hello! Excited about the opportunity.',
      timestamp: '2025-11-03 09:30'
    },
    {
      id: 'msg15',
      conversationId: 'conv3',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'Before we proceed, could you please update your proposal with more details about your Node.js experience?',
      timestamp: '2025-11-03 10:00'
    },
    {
      id: 'msg16',
      conversationId: 'conv3',
      sender: 'student',
      senderId: 'app3',
      text: 'Got it. I\'ll send the updated proposal by tomorrow.',
      timestamp: '2025-11-03 10:10'
    },
    {
      id: 'msg17',
      conversationId: 'conv3',
      sender: 'student',
      senderId: 'app3',
      text: 'Please send the updated proposal.',
      timestamp: '2025-11-03 10:15'
    }
  ],
  conv4: [
    {
      id: 'msg18',
      conversationId: 'conv4',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'Hi Emily! I noticed you have great experience with data analysis.',
      timestamp: '2025-10-30 11:00'
    },
    {
      id: 'msg19',
      conversationId: 'conv4',
      sender: 'student',
      senderId: 'app4',
      text: 'Thank you! I enjoy working with data visualization and machine learning.',
      timestamp: '2025-10-30 11:30'
    },
    {
      id: 'msg20',
      conversationId: 'conv4',
      sender: 'recruiter',
      senderId: 'rec1',
      text: 'We\'re looking for someone who can handle large datasets. How comfortable are you with SQL and Python?',
      timestamp: '2025-11-02 13:00'
    },
    {
      id: 'msg21',
      conversationId: 'conv4',
      sender: 'student',
      senderId: 'app4',
      text: 'Very comfortable! I have experience with PostgreSQL, MySQL, and Python data stack (pandas, numpy, scikit-learn).',
      timestamp: '2025-11-02 13:30'
    },
    {
      id: 'msg22',
      conversationId: 'conv4',
      sender: 'student',
      senderId: 'app4',
      text: 'Thanks for the quick response.',
      timestamp: '2025-11-02 14:20'
    }
  ]
}
