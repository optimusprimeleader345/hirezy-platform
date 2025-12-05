export interface RecruiterConversation {
  id: string
  gigId: string
  recruiterId: string
  studentId: string
  lastMessage: string
  updatedAt: string
  unreadCount: number
  studentName: string
  gigTitle: string
  companyName: string
  isOnline: boolean
}

export const mockRecruiterConversations: RecruiterConversation[] = [
  {
    id: 'conv1',
    gigId: 'gig1',
    recruiterId: 'rec1',
    studentId: 'app1',
    lastMessage: 'Thanks, I\'ll share the files shortly!',
    updatedAt: '2025-11-05 12:30',
    unreadCount: 2,
    studentName: 'John Doe',
    gigTitle: 'Frontend Developer for E-commerce Platform',
    companyName: 'TechCorp Ltd.',
    isOnline: true,
  },
  {
    id: 'conv2',
    gigId: 'gig2',
    recruiterId: 'rec1',
    studentId: 'app2',
    lastMessage: 'Looking forward to your portfolio review.',
    updatedAt: '2025-11-04 16:45',
    unreadCount: 0,
    studentName: 'Sarah Johnson',
    gigTitle: 'React Native Mobile Development',
    companyName: 'StartupXYZ',
    isOnline: false,
  },
  {
    id: 'conv3',
    gigId: 'gig3',
    recruiterId: 'rec1',
    studentId: 'app3',
    lastMessage: 'Please send the updated proposal.',
    updatedAt: '2025-11-03 10:15',
    unreadCount: 5,
    studentName: 'Mike Chen',
    gigTitle: 'Full Stack Web Developer',
    companyName: 'FinTech Solutions',
    isOnline: true,
  },
  {
    id: 'conv4',
    gigId: 'gig4',
    recruiterId: 'rec1',
    studentId: 'app4',
    lastMessage: 'Thanks for the quick response.',
    updatedAt: '2025-11-02 14:20',
    unreadCount: 1,
    studentName: 'Emily Davis',
    gigTitle: 'Data Analyst Position',
    companyName: 'DataCorp',
    isOnline: false,
  },
]
