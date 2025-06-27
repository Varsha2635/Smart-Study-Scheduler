import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, RotateCcw, Settings, Clock, Target, TrendingUp, ArrowLeft, CheckCircle, Coffee, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export default function Focus() {
       // Timer state
      const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
      const [isRunning, setIsRunning] = useState(false);
      const [currentMode, setCurrentMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
      const [sessionsCompleted, setSessionsCompleted] = useState(0);

      //settings
      const [settings, setSettings] = useState({
            focusTime:25,
            shortBreak:5,
            longBreak:15,
            longBreakInterval:4
      });

      const [showSettings, setShowSettings] = useState(false);

      //Tasks and sessions
  const [tasks, setTasks] = useState();
  const [selectedTask, setSelectedTask] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Audio notification
//   const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
  }, [timeLeft, isRunning]);

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const response = await fetch(`${API_BASE_URL}/tasks`,{
            credentials:'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.filter((task) => task.status !== 'completed'));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

    const loadSessionsFromStorage = () => {
    const stored = localStorage.getItem('focusSessions');
    if (stored) {
      const parsedSessions = JSON.parse(stored).map((session) => ({
        ...session,
        completedAt: new Date(session.completedAt)
      }));
      setSessions(parsedSessions);
    }
  };

  const saveSessionsToStorage = (newSessions) => {
    localStorage.setItem('focusSessions', JSON.stringify(newSessions));
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    // Play notification sound
//     if (audioRef.current) {
//       audioRef.current.play().catch(console.error);
//     }

    // Save session
    const newSession = {
      id: Date.now().toString(),
      taskId: selectedTask?._id,
      taskTitle: selectedTask?.title || 'No task selected',
      duration: getCurrentModeDuration(),
      completedAt: new Date(),
      type: currentMode === 'focus' ? 'focus' : 'break',
      interrupted: false
    };

    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    saveSessionsToStorage(updatedSessions);

    if (currentMode === 'focus') {
      setSessionsCompleted(prev => prev + 1);
      // Auto-switch to break
      const nextMode = (sessionsCompleted + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
      switchMode(nextMode);
    } else {
      // Auto-switch back to focus
      switchMode('focus');
    }
  };

  const getCurrentModeDuration = () => {
    switch (currentMode) {
      case 'focus':
        return settings.focusTime;
      case 'shortBreak':
        return settings.shortBreak;
      case 'longBreak':
        return settings.longBreak;
      default:
        return settings.focusTime;
    }
  };
  const switchMode = (mode) => {
    setCurrentMode(mode);
    setIsRunning(false);
    
    switch (mode) {
      case 'focus':
        setTimeLeft(settings.focusTime * 60);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreak * 60);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getCurrentModeDuration() * 60);
  };

  const stopTimer = () => {
    if (isRunning && timeLeft < getCurrentModeDuration() * 60) {
      // Save interrupted session
      const newSession = {
        id: Date.now().toString(),
        taskId: selectedTask?._id,
        taskTitle: selectedTask?.title || 'No task selected',
        duration: Math.round((getCurrentModeDuration() * 60 - timeLeft) / 60),
        completedAt: new Date(),
        type: currentMode === 'focus' ? 'focus' : 'break',
        interrupted: true
      };

      const updatedSessions = [newSession, ...sessions];
      setSessions(updatedSessions);
      saveSessionsToStorage(updatedSessions);
    }
    
    setIsRunning(false);
    setTimeLeft(getCurrentModeDuration() * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProductivityScore = () => {
    const today = new Date();
    const todaySessions = sessions.filter(session => 
      session.completedAt.toDateString() === today.toDateString() && 
      session.type === 'focus' && 
      !session.interrupted
    );
    
    const totalFocusTime = todaySessions.reduce((sum, session) => sum + session.duration, 0);
    const targetTime = 4 * settings.focusTime; // Target: 4 focus sessions per day
    
    return Math.min(Math.round((totalFocusTime / targetTime) * 100), 100);
  };

  const getTodayStats = () => {
    const today = new Date();
    const todaySessions = sessions.filter(session => 
      session.completedAt.toDateString() === today.toDateString()
    );
    
    const focusSessions = todaySessions.filter(s => s.type === 'focus' && !s.interrupted);
    const totalFocusTime = focusSessions.reduce((sum, session) => sum + session.duration, 0);
    
    return {
      sessionsCompleted: focusSessions.length,
      totalFocusTime,
      averageSessionLength: focusSessions.length > 0 ? Math.round(totalFocusTime / focusSessions.length) : 0
    };
  };

  const getModeColor = () => {
    switch (currentMode) {
      case 'focus':
        return 'from-blue-500 to-blue-600';
      case 'shortBreak':
        return 'from-blue-500 to-blue-600';
      case 'longBreak':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getModeIcon = () => {
    switch (currentMode) {
      case 'focus':
        return <Brain className="h-6 w-6" />;
      case 'shortBreak':
      case 'longBreak':
        return <Coffee className="h-6 w-6" />;
      default:
        return <Brain className="h-6 w-6" />;
    }
  };

  const todayStats = getTodayStats();

      

  return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">Focus Mode</h1>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Mode Selector */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                  {[
                    { key: 'focus', label: 'Focus', time: settings.focusTime },
                    { key: 'shortBreak', label: 'Short Break', time: settings.shortBreak },
                    { key: 'longBreak', label: 'Long Break', time: settings.longBreak }
                  ].map((mode) => (
                    <button
                      key={mode.key}
                      onClick={() => switchMode(mode.key)}
                      disabled={isRunning}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentMode === mode.key
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {mode.label} ({mode.time}m)
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer Display */}
              <div className={`bg-gradient-to-r ${getModeColor()} rounded-2xl p-12 text-center text-white mb-8`}>
                <div className="flex items-center justify-center mb-4">
                  {getModeIcon()}
                  <span className="ml-2 text-lg font-medium capitalize">
                    {currentMode === 'shortBreak' ? 'Short Break' : 
                     currentMode === 'longBreak' ? 'Long Break' : 'Focus Time'}
                  </span>
                </div>
                <div className="text-6xl md:text-8xl font-mono font-bold mb-4">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-lg opacity-90">
                  {selectedTask ? `Working on: ${selectedTask.title}` : 'No task selected'}
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={toggleTimer}
                  className={`bg-gradient-to-r ${getModeColor()} text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center shadow-lg`}
                >
                  {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </button>
                <button
                  onClick={stopTimer}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center"
                >
                  <Square className="h-5 w-5 mr-2" />
                  Stop
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Session Progress</span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((getCurrentModeDuration() * 60 - timeLeft) / (getCurrentModeDuration() * 60)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${getModeColor()} h-2 rounded-full transition-all duration-1000`}
                    style={{ 
                      width: `${((getCurrentModeDuration() * 60 - timeLeft) / (getCurrentModeDuration() * 60)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Sessions Counter */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{sessionsCompleted}</div>
                <div className="text-sm text-gray-600">Sessions completed today</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Selection */}
            {/* <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Focus Task
              </h3>
              
              {loadingTasks ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">No tasks available</p>
                  <Link 
                    to="/tasks" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Create a task
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      !selectedTask 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">No specific task</div>
                    <div className="text-sm text-gray-500">General focus session</div>
                  </button>
                  
                  {tasks.slice(0, 5).map((task) => (
                    <button
                      key={task._id}
                      onClick={() => setSelectedTask(task)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedTask?._id === task._id 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium truncate">{task.title}</div>
                      <div className="text-sm text-gray-500 truncate">{task.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            {/* Today's Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Today's Progress
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{getProductivityScore()}%</div>
                  <div className="text-sm text-gray-600">Productivity Score</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-gray-900">{todayStats.sessionsCompleted}</div>
                    <div className="text-xs text-gray-600">Sessions</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{todayStats.totalFocusTime}m</div>
                    <div className="text-xs text-gray-600">Focus Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
              
              {sessions.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No sessions yet</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sessions.slice(0, 10).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {session.type === 'focus' ? (
                          <Brain className="h-4 w-4 text-red-500 mr-2" />
                        ) : (
                          <Coffee className="h-4 w-4 text-green-500 mr-2" />
                        )}
                        <div>
                          <div className="text-sm font-medium truncate max-w-[120px]">
                            {session.taskTitle}
                          </div>
                          <div className="text-xs text-gray-500">
                            {session.completedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{session.duration}m</div>
                        {session.interrupted && (
                          <div className="text-xs text-red-500">Interrupted</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Timer Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.focusTime}
                    onChange={(e) => setSettings({ ...settings, focusTime: parseInt(e.target.value) || 25 })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Break (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.shortBreak}
                    onChange={(e) => setSettings({ ...settings, shortBreak: parseInt(e.target.value) || 5 })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Long Break (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.longBreak}
                    onChange={(e) => setSettings({ ...settings, longBreak: parseInt(e.target.value) || 15 })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Long Break Interval (sessions)
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={settings.longBreakInterval}
                    onChange={(e) => setSettings({ ...settings, longBreakInterval: parseInt(e.target.value) || 4 })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSettings(false);
                    if (!isRunning) {
                      setTimeLeft(getCurrentModeDuration() * 60);
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Audio element for notifications
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio> */}
    </div>
  )
}


