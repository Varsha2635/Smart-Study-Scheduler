// Sample Courses
export const sampleCourses = [
  {
    id: 'c1',
    name: 'Computer Networks',
    color: '#3B82F6',
    credits: 3,
    professor: 'Dr.Bhavana Shrivastava',
    difficulty: 3
  },
  {
    id: 'c2',
    name: 'Machine Learning',
    color: '#10B981',
    credits: 3,
    professor: 'Dr. K.V Sridhar',
    difficulty: 4
  },
  {
    id: 'c3',
    name: 'Data Structures',
    color: '#8B5CF6',
    credits: 4,
    professor: 'Dr. Mohit',
    difficulty: 4
  },
  {
    id: 'c4',
    name: 'Operating Systems',
    color: '#F59E0B',
    credits: 3,
    professor: 'Dr. Shradha Kapra',
    difficulty: 3
  }
];

// Sample Tasks
export const sampleTasks = [
  {
  id: 't1',
  title: 'Computer Networks Assignment 1',
  description: 'Read Physical Layer and DataLink Layer',
  courseId: 'c1',
  dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  priority: 'medium',
  estimatedTime: 120, // in minutes
  completed: false,
  tags: ['reading', 'understanding', 'important']
  },

  {
  id: 't2',
  title: 'Machine Learning Project Proposal Outline',
  description: 'Create an outline for the term project on supervised learning techniques',
  courseId: 'c2',
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  priority: 'medium',
  estimatedTime: 90, // in minutes
  completed: false,
  tags: ['project', 'research', 'proposal']
  },

  {
    id: 't3',
    title: 'Implement Binary Search Tree',
    description: 'Code implementation and testing of BST operations',
    courseId: 'c3',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: 'high',
    estimatedTime: 180,
    completed: false,
    tags: ['coding', 'project']
  },
  {
  id: 't5',
  title: 'Read Operating Systems Chapters 3-4',
  description: 'Read and take notes on process management and scheduling',
  courseId: 'c5',
  dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // due in 1 day
  priority: 'low',
  estimatedTime: 60, // in minutes
  completed: true,
  completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // completed yesterday
  tags: ['reading']
  }

];

// Sample Study Sessions
export const sampleSessions = [
  {
    id: 's1',
    courseId: 'c1',
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000),
    description: 'Study data transmission and network layers',
    completed: true,
    location: 'Library',
    actualFocusTime: 100
  },
  {
    id: 's2',
    courseId: 'c3',
    startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000),
    description: 'Algorithm complexity analysis',
    completed: true,
    location: 'Hostel Room',
    actualFocusTime: 110
  },
  {
    id: 's3',
    courseId: 'c2',
    startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000),
    description: 'Review linear regression and loss functions',
    completed: false,
    location: 'Home'
  },
  {
    id: 's4',
    courseId: 'c4',
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
    description: 'Review process synchronization and deadlocks',
    completed: false,
    location: 'Cafe'
  }
];

// Utility: Get upcoming 7 days
export const getUpcomingWeekDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Utility: Simulated available time slots
export const getAvailableTimeSlots = () => {
  const weekDates = getUpcomingWeekDates();
  return weekDates.map(date => {
    const availableHours = Math.floor(Math.random() * 4) + 2;
    return {
      date,
      availableMinutes: availableHours * 60,
      preferredTimeBlocks: [
        {
          startTime: new Date(new Date(date).setHours(9, 0, 0, 0)),
          endTime: new Date(new Date(date).setHours(11, 0, 0, 0)),
        },
        {
          startTime: new Date(new Date(date).setHours(14, 0, 0, 0)),
          endTime: new Date(new Date(date).setHours(16, 0, 0, 0)),
        }
      ]
    };
  });
};

// Utility: Generate 14-day study statistics
export const getSampleStatistics = () => {
  const dailyStudyTime = [];
  const today = new Date();
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dayOfWeek = date.getDay();
    
    let minutes = 0;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      minutes = Math.floor(Math.random() * 90) + 30;
    } else {
      minutes = Math.floor(Math.random() * 180) + 60;
    }

    dailyStudyTime.push({
      date: date.toISOString().split('T')[0],
      minutes
    });
  }

  return { dailyStudyTime };
};
