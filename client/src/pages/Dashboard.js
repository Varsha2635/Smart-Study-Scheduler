import React, { useEffect, useState } from 'react';
import { Calendar, BarChart2, Clock, BookOpen, CheckCircle, Quote, Plus, ArrowRight, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../components/ProfileDropdown';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);


  useEffect(() => {
    fetchSchedules();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
  try {
    setLoadingTasks(true);
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error("Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  } finally {
    setLoadingTasks(false);
  }
}; 

  const fetchSchedules = async () => {
    try {
      setLoadingSchedules(true);
      const response = await fetch(`${API_BASE_URL}/schedule`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setSchedules(data.schedules || []);
        console.log("Fetched schedules from API:", data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoadingSchedules(false);
    }
  };

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getStudySessionsForDate = (date)=> {
    const dateStr = date.toISOString().split('T')[0];
    const sessions= [];
    
    schedules.forEach(schedule => {
      schedule.plan.forEach(session => {
        if (session.date === dateStr) {
          sessions.push(session);
        }
      });
    });
    
    return sessions;
  };
  const getSubjectColor = (subject, index) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    return colors[index % colors.length];
  };

  const getAllSubjects = () => {
    const subjects = new Set();
    schedules.forEach(schedule => {
      schedule.subjects.forEach(subject => {
        subjects.add(subject.name);
      });
    });
    return Array.from(subjects);
  };

  const getTotalStudyHours = () => {
    return schedules.reduce((total, schedule) => {
      return total + schedule.plan.reduce((sum, session) => sum + session.hours, 0);
    }, 0);
  };

  const getCompletedTasks = () => {
    // This would come from your tasks API - for now showing mock data
    return 12;
  };

  const getActiveCourses = () => {
    return getAllSubjects().length;
  };

  const getWeeklyProgress = () => {
    // Calculate based on completed vs planned sessions for the week
    const weekDates = getWeekDates(currentWeek);
    const today = new Date();
    let completed = 0;
    let total = 0;

    weekDates.forEach(date => {
      if (date <= today) {
        const sessions = getStudySessionsForDate(date);
        total += sessions.length;
        completed += sessions.length; // Assuming all past sessions are completed
      }
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const weekDates = getWeekDates(currentWeek);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'text-green-600 bg-green-100 border-green-200';
    case 'in_progress':
      return 'text-blue-600 bg-blue-100 border-blue-200';
    case 'pending':
      return 'text-gray-600 bg-gray-100 border-gray-200';
    default:
      return 'text-gray-600 bg-gray-100 border-gray-200';
  }
};


  return (
        <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link 
                to="/tasks"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Manage Tasks
              </Link>
              <Link 
                to="/schedule"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Target className="h-4 w-4 mr-2" />
                Smart Scheduler
              </Link>
              <Link 
                to="/focus"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Clock className="h-4 w-4 mr-2" />
                Focus Mode
              </Link>
              <div className="relative">
                {/* <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="User"
                /> */}
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Motivational Quote */}
        {/* <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <Quote className="h-6 w-6 text-white opacity-75 flex-shrink-0 mt-1" />
            <p className="text-white text-lg font-medium italic">
              {isLoadingQuote ? 'Loading your daily inspiration...' : quote}
            </p>
          </div>
        </div> */}

        {/* Stats Overview */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Study Hours', value: getTotalStudyHours().toFixed(1), icon: Clock, color: 'bg-blue-500' },
            { title: 'Tasks Completed', value: getCompletedTasks().toString(), icon: CheckCircle, color: 'bg-green-500' },
            { title: 'Active Courses', value: getActiveCourses().toString(), icon: BookOpen, color: 'bg-purple-500' },
            { title: 'Weekly Progress', value: `${getWeeklyProgress()}%`, icon: BarChart2, color: 'bg-yellow-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}


        {/* Recent Tasks */}
<div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
  {loadingTasks ? (
    <div className="text-center text-gray-500">Loading tasks...</div>
  ) : tasks.length === 0 ? (
    <div className="text-center text-gray-500 text-sm">No tasks found.</div>
  ) : (
    <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
      {tasks.slice(0, 5).map(task => (
        <li key={task._id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
              {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 truncate">{task.description || 'No description'}</p>
          <p className="text-xs text-gray-500 mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  )}
  <div className="text-right mt-4">
    <Link to="/tasks" className="text-indigo-600 text-sm hover:underline flex items-center justify-end">
      View All Tasks <ArrowRight className="h-4 w-4 ml-1" />
    </Link>
  </div>
</div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Study Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Study Calendar</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateWeek('prev')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-gray-600 min-w-[120px] text-center">
                      {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => navigateWeek('next')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {loadingSchedules ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : schedules.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No study schedule yet</h3>
                    <p className="text-gray-500 mb-4">Create a study schedule to see your calendar</p>
                    <Link
                      to="/schedule"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Create Schedule
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-2">
                    {/* Day headers */}
                    {dayNames.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar days */}
                    {weekDates.map((date, index) => {
                      const sessions = getStudySessionsForDate(date);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const allSubjects = getAllSubjects();
                      
                      return (
                        <div
                          key={index}
                          className={`min-h-[120px] p-2 border rounded-lg ${
                            isToday ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className={`text-sm font-medium mb-2 ${
                            isToday ? 'text-indigo-600' : 'text-gray-900'
                          }`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {sessions.map((session, sessionIndex) => {
                              const subjectIndex = allSubjects.indexOf(session.subject);
                              return (
                                <div
                                  key={sessionIndex}
                                  className={`text-xs p-1 rounded text-white ${getSubjectColor(session.subject, subjectIndex)}`}
                                  title={`${session.subject} - ${session.hours}h`}
                                >
                                  <div className="truncate">{session.subject}</div>
                                  <div>{session.hours}h</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subject Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Subject Progress</h2>
            {getAllSubjects().length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No subjects yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getAllSubjects().map((subject, index) => {
                  const totalHours = schedules.reduce((sum, schedule) => {
                    return sum + schedule.plan
                      .filter(session => session.subject === subject)
                      .reduce((sessionSum, session) => sessionSum + session.hours, 0);
                  }, 0);
                  
                  // Mock progress calculation
                  const progress = Math.min(85 + (index * 5), 100);
                  
                  return (
                    <div key={subject}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">{subject}</span>
                        <span className="text-sm font-medium text-gray-900">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getSubjectColor(subject, index)}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {totalHours.toFixed(1)} hours planned
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import { Calendar, BarChart2, Clock, BookOpen, CheckCircle, Quote, Plus, ArrowRight, Target } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function Dashboard() {
//   // const [quote, setQuote] = useState('');
//   // const [isLoadingQuote, setIsLoadingQuote] = useState(true);
//   //   useEffect(() => {
//   //   const fetchQuote = async () => {
//   //     try {
//   //       const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-quote`, {
//   //         headers: {
//   //           Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//   //         },
//   //       });
//   //       const data = await response.json();
//   //       setQuote(data.quote);
//   //     } catch (error) {
//   //       console.error('Error fetching quote:', error);
//   //       setQuote('Embrace the journey of learning, for every moment of study shapes your future.');
//   //     } finally {
//   //       setIsLoadingQuote(false);
//   //     }
//   //   };
//   //   fetchQuote();
//   // }, []);
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Dashboard Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/tasks"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Manage Tasks
//               </Link>
//               <Link 
//                 to="/schedule"
//                 className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center"
//               >
//                 <Target className="h-4 w-4 mr-2" />
//                 Smart Scheduler
//               </Link>
//               <div className="relative">
//                 <img
//                   className="h-8 w-8 rounded-full"
//                   src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
//                   alt="User"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Motivational Quote */}
//         {/* <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
//           <div className="flex items-start space-x-4">
//             <Quote className="h-6 w-6 text-white opacity-75 flex-shrink-0 mt-1" />
//             <p className="text-white text-lg font-medium italic">
//               {isLoadingQuote ? 'Loading your daily inspiration...' : quote}
//             </p>
//           </div>
//         </div> */}

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {[
//             { title: 'Study Hours', value: '24.5', icon: Clock, color: 'bg-blue-500' },
//             { title: 'Tasks Completed', value: '12', icon: CheckCircle, color: 'bg-green-500' },
//             { title: 'Active Courses', value: '4', icon: BookOpen, color: 'bg-purple-500' },
//             { title: 'Weekly Progress', value: '85%', icon: BarChart2, color: 'bg-yellow-500' }
//           ].map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className={`${stat.color} p-3 rounded-lg`}>
//                   <stat.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                   <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Today's Schedule */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
//                   <Link 
//                     to="/tasks"
//                     className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
//                   >
//                     View all tasks
//                     <ArrowRight className="h-4 w-4 ml-1" />
//                   </Link>
//                 </div>
//                 <div className="space-y-4">
//                   {[
//                     { time: '09:00 - 10:30', subject: 'Mathematics', type: 'Study Session', color: 'border-blue-500' },
//                     { time: '11:00 - 12:30', subject: 'Physics', type: 'Lab Work', color: 'border-purple-500' },
//                     { time: '14:00 - 15:30', subject: 'Literature', type: 'Essay Writing', color: 'border-green-500' }
//                   ].map((session, index) => (
//                     <div
//                       key={index}
//                       className={`border-l-4 ${session.color} bg-white p-4 rounded-lg shadow-sm`}
//                     >
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <p className="font-semibold text-gray-900">{session.subject}</p>
//                           <p className="text-sm text-gray-500">{session.type}</p>
//                         </div>
//                         <span className="text-sm text-gray-600">{session.time}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Weekly Progress */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h2>
//             <div className="space-y-4">
//               {[
//                 { subject: 'Mathematics', progress: 85 },
//                 { subject: 'Physics', progress: 70 },
//                 { subject: 'Literature', progress: 90 },
//                 { subject: 'Chemistry', progress: 65 }
//               ].map((subject, index) => (
//                 <div key={index}>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-medium text-gray-600">{subject.subject}</span>
//                     <span className="text-sm font-medium text-gray-900">{subject.progress}%</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-blue-600 h-2 rounded-full"
//                       style={{ width: `${subject.progress}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
