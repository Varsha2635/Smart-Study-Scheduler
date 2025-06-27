import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, BookOpen, Sparkles,ArrowLeft, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export const Schedule = () => {

  const navigate = useNavigate();
  const [availableHours, setAvailableHours] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', examDate: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
    
    // Clear errors when user starts typing
    if (errors[`subject-${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`subject-${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: '', examDate: '' }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!availableHours || parseInt(availableHours) <= 0) {
      newErrors.availableHours = 'Please enter valid available hours';
    }
    
    subjects.forEach((subject, index) => {
      if (!subject.name.trim()) {
        newErrors[`subject-${index}-name`] = 'Subject name is required';
      }
      if (!subject.examDate) {
        newErrors[`subject-${index}-examDate`] = 'Exam date is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/schedule/create`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availableHours: parseInt(availableHours), subjects }),
      });

      const data = await res.json();
      if (data.success) {
        navigate('/dashboard');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to create schedule', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
     
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center relative">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="absolute left-0 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-2">
                {/* <Brain className="h-8 w-8 text--600" /> */}
                <h1 className="text-2xl font-bold text-gray-900">Create Your Study Schedule</h1>
                {/* <Sparkles className="h-5 w-5 text-yellow-500" /> */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto">
      <main className=" mt-10 flex-grow flex items-center justify-center px-4">
          <p className="text-xl text-gray-600 max-w-2xl text-center">
              Let us help you organize your study time efficiently. Add your subjects and exam dates to generate a personalized schedule.
          </p>
    </main>
     <div className="mt-10 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Available Hours Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Study Time</h2>
              </div>
              
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How many hours can you study per day?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={availableHours}
                    onChange={(e) => {
                      setAvailableHours(e.target.value);
                      if (errors.availableHours) {
                        const newErrors = { ...errors };
                        delete newErrors.availableHours;
                        setErrors(newErrors);
                      }
                    }}
                    className={`w-full px-4 py-3 text-lg border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.availableHours 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                    placeholder="e.g., 6"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-gray-500 text-sm">hours</span>
                  </div>
                </div>
                {errors.availableHours && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.availableHours}
                  </p>
                )}
              </div>
            </div>

            {/* Subjects Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Your Subjects</h2>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {subjects.length} subject{subjects.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="group bg-gray-50 border-2 border-gray-100 rounded-xl p-6 transition-all duration-200 hover:border-purple-200 hover:bg-purple-50/30"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Subject {index + 1}
                      </h3>
                      {subjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubject(index)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject Name
                        </label>
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
                            errors[`subject-${index}-name`]
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-purple-500 hover:border-gray-300'
                          }`}
                          placeholder="e.g., Mathematics"
                        />
                        {errors[`subject-${index}-name`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {errors[`subject-${index}-name`]}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Exam Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={subject.examDate}
                            onChange={(e) => handleSubjectChange(index, 'examDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
                              errors[`subject-${index}-examDate`]
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-purple-500 hover:border-gray-300'
                            }`}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                        {errors[`subject-${index}-examDate`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                            {errors[`subject-${index}-examDate`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addSubject}
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Another Subject
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Schedule...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Schedule
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
         <div className="text-center mt-8 text-gray-500">
          <p>Your personalized study schedule will be created based on your available time and exam dates.</p>
        </div>
      </div>
    </div>
  );
}

export default Schedule; 


// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, BookOpen, Target, Plus, ArrowLeft, Save, Trash2, Eye, AlertCircle, CheckCircle,Brain } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const API_BASE_URL = 'http://localhost:4000/api/v1';

// export const Schedule = () => {
// const [schedules, setSchedules] = useState([]);
// const [plannerItems, setPlannerItems] = useState([]);
// const [isCreateScheduleModalOpen, setIsCreateScheduleModalOpen] = useState(false);
// const [isCreatePlannerModalOpen, setIsCreatePlannerModalOpen] = useState(false);
// const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// const [selectedSchedule, setSelectedSchedule] = useState(null);
// const [loading, setLoading] = useState(true);
// const [creating, setCreating] = useState(false);
// const [activeTab, setActiveTab] = useState('schedules');


// const [scheduleFormData, setScheduleFormData] = useState({
//     subjects: [''],
//     goals: '',
//     examDate: '',
//     availableHoursPerDay: 4,
// });

// const [plannerFormData, setPlannerFormData] = useState({
//     title: '',
//     subject: '',
//     description: '',
//     startDateTime: '',
//     endDateTime: '',
//     relatedSchedule: '',
// });

// useEffect(() => {
//     fetchData();
// }, []);

// const fetchData = async () => {
//   try {
//     setLoading(true);

//     // Fetch schedules
//      try {
//         const schedulesResponse = await fetch(`${API_BASE_URL}/schedules`,{
//           credentials: 'include',
//         });
//         if (schedulesResponse.ok) {
//           const schedulesData = await schedulesResponse.json();
//           setSchedules(schedulesData);
//         }
//       } catch (error) {
//         console.log('Schedules endpoint not available or requires auth');
//       }

//      // Fetch planner items
//      try {
//         const plannerResponse = await fetch(`${API_BASE_URL}/planner`,{
//           credentials:'include',
//         });
//         if (plannerResponse.ok) {
//           const plannerData = await plannerResponse.json();
//           setPlannerItems(plannerData);
//         }
//       } catch (error) {
//         console.log('Planner endpoint not available or requires auth');
//       }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleCreateSchedule = async(e) => {
//       e.preventDefault();
//       setCreating(true);

//       try {
//         const response = await fetch(`${API_BASE_URL}/schedule`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', 
//         body: JSON.stringify({
//           subjects: scheduleFormData.subjects.filter(s => s.trim()),
//           goals: scheduleFormData.goals,
//           examDate: new Date(scheduleFormData.examDate).toISOString(),
//           availableHoursPerDay: scheduleFormData.availableHoursPerDay,
//         }),
//       });

//       if (response.ok) {
//         setIsCreateScheduleModalOpen(false);
//         setScheduleFormData({
//           subjects: [''],
//           goals: '',
//           examDate: '',
//           availableHoursPerDay: 4,
//         });
//         fetchData();
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to create schedule');
//       }
//       }catch (error) {
//       console.error('Error creating schedule:', error);
//       alert('Failed to create schedule. Please try again.');
//     } finally {
//       setCreating(false);
//     }
      
// };
// const handleCreatePlannerItem = async (e) => {
//     e.preventDefault();
//     setCreating(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/planner`, {
//         credentials:'include',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: plannerFormData.title,
//           subject: plannerFormData.subject,
//           description: plannerFormData.description,
//           startDateTime: new Date(plannerFormData.startDateTime).toISOString(),
//           endDateTime: new Date(plannerFormData.endDateTime).toISOString(),
//           relatedSchedule: plannerFormData.relatedSchedule || undefined,
//         }),
//       });

//       if (response.ok) {
//         setIsCreatePlannerModalOpen(false);
//         setPlannerFormData({
//           title: '',
//           subject: '',
//           description: '',
//           startDateTime: '',
//           endDateTime: '',
//           relatedSchedule: '',
//         });
//         fetchData();
//       } else {
//         const error = await response.json();
//         alert(error.message || 'Failed to create planner item');
//       }
//     } catch (error) {
//       console.error('Error creating planner item:', error);
//       alert('Failed to create planner item. Please try again.');
//     } finally {
//       setCreating(false);
//     }
//   };

// const addSubject = () => {
//     setScheduleFormData({
//       ...scheduleFormData,
//       subjects: [...scheduleFormData.subjects,'']
//     });
// };

//   const updateSubject = (index, value) => {
//     const updatedSubjects = scheduleFormData.subjects.map((subject, i) => 
//       i === index ? value : subject
//     );
//     setScheduleFormData({ ...scheduleFormData, subjects: updatedSubjects });
//   };

//   const removeSubject = (index) => {
//     if (scheduleFormData.subjects.length > 1) {
//       setScheduleFormData({
//         ...scheduleFormData,
//         subjects: scheduleFormData.subjects.filter((_, i) => i !== index)
//       });
//     }
//   }

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//     const formatDateTime = (dateString) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getDaysUntilExam = (examDate) => {
//     const today = new Date();
//     const exam = new Date(examDate);
//     const diffTime = exam.getTime() - today.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };



//   const getSubjectColors = (index) => {
//     const colors = [
//       'bg-blue-100 text-blue-800 border-blue-200',
//       'bg-purple-100 text-purple-800 border-purple-200',
//       'bg-green-100 text-green-800 border-green-200',
//       'bg-yellow-100 text-yellow-800 border-yellow-200',
//       'bg-pink-100 text-pink-800 border-pink-200',
//       'bg-indigo-100 text-indigo-800 border-indigo-200',
//     ];
//     return colors[index % colors.length];
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-800 border-green-200';
//       case 'overdue':
//         return 'bg-red-100 text-red-800 border-red-200';
//       case 'pending':
//       default:
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <Link 
//                 to="/dashboard" 
//                 className="text-blue-600 hover:text-blue-800 transition-colors"
//               >
//                 <ArrowLeft className="h-6 w-6" />
//               </Link>
//               <div className="flex items-center space-x-2">
//                 <Brain className="h-8 w-8 text-blue-600"/>
//                 <h1 className="text-2xl font-bold text-gray-900">Smart Scheduler</h1>
//               </div>
//             </div>
//             <div className="flex space-x-3">
//               <button
//               onClick={() => setIsCreateScheduleModalOpen(true)}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
//             >
//               <Brain className="h-5 w-5 mr-2" />
//               AI Schedule
//             </button>
//              <button
//                 onClick={() => setIsCreatePlannerModalOpen(true)}
//                 className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
//               >
//                 <Plus className="h-5 w-5 mr-2" />
//                 Add Event
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* tab Naviagation */}
//          <div className="mb-8">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex space-x-8">
//               <button
//                 onClick={() => setActiveTab('schedules')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === 'schedules'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Brain className="h-4 w-4 inline mr-2" />
//                 AI Schedules
//               </button>
//               <button
//                 onClick={() => setActiveTab('planner')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === 'planner'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Calendar className="h-4 w-4 inline mr-2" />
//                 Planner Items
//               </button>
//             </nav>
//           </div>
//         </div>


//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <>
//            {/* AI Schedules Tab */}
//             {activeTab === 'schedules' && (
//               <div className="grid grid-cols-1 gap-6">
//                 {schedules.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="bg-white rounded-xl shadow-md p-8">
//                       <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules yet</h3>
//                       <p className="text-gray-500 mb-6">Create your first AI-powered study schedule!</p>
//                       <button
//                         onClick={() => setIsCreateScheduleModalOpen(true)}
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Generate Schedule
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   schedules.map((schedule) => (
//                     <div
//                       key={schedule._id}
//                       className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex-1">
//                           <h3 className="text-xl font-semibold text-gray-900 mb-2">{schedule.goals}</h3>
//                           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//                             <span className="flex items-center">
//                               <Calendar className="h-4 w-4 mr-2" />
//                               Exam: {formatDate(schedule.examDate)}
//                             </span>
//                             <span className="flex items-center">
//                               <Clock className="h-4 w-4 mr-2" />
//                               {schedule.availableHoursPerDay}h/day
//                             </span>
//                             <span className="flex items-center">
//                               <BookOpen className="h-4 w-4 mr-2" />
//                               {schedule.subjects.flat().length} subjects
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           <div className="text-right">
//                             <div className="text-sm text-gray-500">Days remaining</div>
//                             <div className={`text-lg font-bold ${
//                               getDaysUntilExam(schedule.examDate) < 7 ? 'text-red-600' : 
//                               getDaysUntilExam(schedule.examDate) < 14 ? 'text-yellow-600' : 'text-green-600'
//                             }`}>
//                               {getDaysUntilExam(schedule.examDate)}
//                             </div>
//                           </div>
//                           <button
//                             onClick={() => {
//                               setSelectedSchedule(schedule);
//                               setIsViewModalOpen(true);
//                             }}
//                             className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
//                             title="View schedule"
//                           >
//                             <Eye className="h-5 w-5" />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                         {schedule.subjects.flat().map((subject, index) => (
//                           <div
//                             key={index}
//                             className={`p-3 rounded-lg border ${getSubjectColors(index)}`}
//                           >
//                             <div className="font-medium text-sm">{subject}</div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="mt-4 pt-4 border-t border-gray-200">
//                         <div className="text-xs text-gray-500">
//                           Created {formatDate(schedule.createdAt)}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}

//             {/* Planner Items Tab */}
//             {activeTab === 'planner' && (
//               <div className="grid grid-cols-1 gap-6">
//                 {plannerItems.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="bg-white rounded-xl shadow-md p-8">
//                       <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No planner items yet</h3>
//                       <p className="text-gray-500 mb-6">Add your first study session or event!</p>
//                       <button
//                         onClick={() => setIsCreatePlannerModalOpen(true)}
//                         className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors"
//                       >
//                         Add Event
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   plannerItems.map((item) => (
//                     <div
//                       key={item._id}
//                       className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <div className="flex items-center justify-between mb-3">
//                             <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
//                             <span className={`px-3 py-1 rounded-full border text-sm ${getStatusColor(item.status)}`}>
//                               {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                             </span>
//                           </div>
                          
//                           <div className="mb-3">
//                             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//                               {item.subject}
//                             </span>
//                           </div>

//                           {item.description && (
//                             <p className="text-gray-600 mb-4">{item.description}</p>
//                           )}

//                           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//                             <span className="flex items-center">
//                               <Clock className="h-4 w-4 mr-2" />
//                               {formatDateTime(item.startDateTime)}
//                             </span>
//                             <span className="text-gray-400">→</span>
//                             <span className="flex items-center">
//                               <Clock className="h-4 w-4 mr-2" />
//                               {formatDateTime(item.endDateTime)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </>
//         )} 

//         {/* Create Schedule Modal */}
//         {isCreateScheduleModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//               <div className="flex items-center mb-6">
//                 <Brain className="h-8 w-8 text-indigo-600 mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-900">Create AI Study Schedule</h2>
//               </div>
              
//               <form onSubmit={handleCreateSchedule} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Study Goals *
//                   </label>
//                   <input
//                     type="text"
//                     value={scheduleFormData.goals}
//                     onChange={(e) => setScheduleFormData({ ...scheduleFormData, goals: e.target.value })}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                     placeholder="e.g., Prepare for final exams, Master calculus concepts..."
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Exam Date *
//                     </label>
//                     <input
//                       type="date"
//                       value={scheduleFormData.examDate}
//                       onChange={(e) => setScheduleFormData({ ...scheduleFormData, examDate: e.target.value })}
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                       min={new Date().toISOString().split('T')[0]}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Available Hours Per Day: {scheduleFormData.availableHoursPerDay}h
//                     </label>
//                     <input
//                       type="range"
//                       min="1"
//                       max="12"
//                       value={scheduleFormData.availableHoursPerDay}
//                       onChange={(e) => setScheduleFormData({ ...scheduleFormData, availableHoursPerDay: parseInt(e.target.value) })}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                     />
//                     <div className="flex justify-between text-xs text-gray-500 mt-1">
//                       <span>1h</span>
//                       <span>6h</span>
//                       <span>12h</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex justify-between items-center mb-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Subjects to Study *
//                     </label>
//                     <button
//                       type="button"
//                       onClick={addSubject}
//                       className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
//                     >
//                       <Plus className="h-4 w-4 mr-1" />
//                       Add Subject
//                     </button>
//                   </div>

//                   <div className="space-y-3">
//                     {scheduleFormData.subjects.map((subject, index) => (
//                       <div key={index} className="flex gap-3 items-center">
//                         <input
//                           type="text"
//                           value={subject}
//                           onChange={(e) => updateSubject(index, e.target.value)}
//                           className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="Subject name"
//                           required
//                         />
//                         {scheduleFormData.subjects.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeSubject(index)}
//                             className="text-red-600 hover:text-red-800 p-2"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsCreateScheduleModalOpen(false);
//                       setScheduleFormData({
//                         subjects: [''],
//                         goals: '',
//                         examDate: '',
//                         availableHoursPerDay: 4,
//                       });
//                     }}
//                     className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={creating}
//                     className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     {creating ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Generating...
//                       </>
//                     ) : (
//                       <>
//                         <Brain className="h-4 w-4 mr-2" />
//                         Generate AI Schedule
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Create Planner Item Modal */}
//         {isCreatePlannerModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <h2 className="text-2xl font-bold mb-6 text-gray-900">Add Planner Item</h2>
              
//               <form onSubmit={handleCreatePlannerItem} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Title *
//                     </label>
//                     <input
//                       type="text"
//                       value={plannerFormData.title}
//                       onChange={(e) => setPlannerFormData({ ...plannerFormData, title: e.target.value })}
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                       placeholder="Study session title"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Subject *
//                     </label>
//                     <input
//                       type="text"
//                       value={plannerFormData.subject}
//                       onChange={(e) => setPlannerFormData({ ...plannerFormData, subject: e.target.value })}
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                       placeholder="Subject name"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     value={plannerFormData.description}
//                     onChange={(e) => setPlannerFormData({ ...plannerFormData, description: e.target.value })}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                     rows={3}
//                     placeholder="Optional description..."
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Start Date & Time *
//                     </label>
//                     <input
//                       type="datetime-local"
//                       value={plannerFormData.startDateTime}
//                       onChange={(e) => setPlannerFormData({ ...plannerFormData, startDateTime: e.target.value })}
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       End Date & Time *
//                     </label>
//                     <input
//                       type="datetime-local"
//                       value={plannerFormData.endDateTime}
//                       onChange={(e) => setPlannerFormData({ ...plannerFormData, endDateTime: e.target.value })}
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsCreatePlannerModalOpen(false);
//                       setPlannerFormData({
//                         title: '',
//                         subject: '',
//                         description: '',
//                         startDateTime: '',
//                         endDateTime: '',
//                         relatedSchedule: '',
//                       });
//                     }}
//                     className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={creating}
//                     className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {creating ? 'Creating...' : 'Add Item'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* View Schedule Modal */}
//         {isViewModalOpen && selectedSchedule && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">{selectedSchedule.goals}</h2>
//                 <button
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <div className="text-blue-600 text-sm font-medium">Exam Date</div>
//                   <div className="text-lg font-bold text-blue-900">{formatDate(selectedSchedule.examDate)}</div>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <div className="text-green-600 text-sm font-medium">Days Remaining</div>
//                   <div className="text-lg font-bold text-green-900">{getDaysUntilExam(selectedSchedule.examDate)}</div>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <div className="text-purple-600 text-sm font-medium">Hours/Day</div>
//                   <div className="text-lg font-bold text-purple-900">{selectedSchedule.availableHoursPerDay}h</div>
//                 </div>
//                 <div className="bg-yellow-50 p-4 rounded-lg">
//                   <div className="text-yellow-600 text-sm font-medium">Subjects</div>
//                   <div className="text-lg font-bold text-yellow-900">{selectedSchedule.subjects.flat().length}</div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-3">Subjects</h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   {selectedSchedule.subjects.flat().map((subject, index) => (
//                     <div
//                       key={index}
//                       className={`p-3 rounded-lg border ${getSubjectColors(index)}`}
//                     >
//                       <div className="font-medium">{subject}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold mb-3">AI Generated Study Plan</h3>
//                 <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
//                   <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
//                     {selectedSchedule.plan}
//                   </pre>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Schedule; 