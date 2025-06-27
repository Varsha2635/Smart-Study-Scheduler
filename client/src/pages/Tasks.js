import React,{useState,useEffect} from 'react'
import { Plus, Edit2, Trash2, Tag, Calendar, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title:'',
    description:'',
    status:'pending',
    priority:'medium',
    due_date:'',
    tags : [],
  });

  const [newTag, setNewTag] = useState('');
  useEffect(()=>{
    fetchTasks();
  },[]);
  const fetchTasks = async()=>{
    try{
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks`,{
        credentials: 'include',
      });
      if (response.ok){
        const data = await response.json();
        setTasks(data);
      }else{
        console.error('Failed to fetch tasks');
      }
    }
    catch(error){
      console.error('Error fetching tasks:', error);
    } finally{
      setLoading(false);
    }
  };
  

   const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const taskData = {
        ...formData,
        due_date: new Date(formData.due_date).toISOString(),
      };

      if (currentTask)
      {
        const response = await fetch(`${API_BASE_URL}/tasks/${currentTask._id}`,
      {
        credentials: 'include',
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
          throw new Error('Failed to update task');
      }
      }
      else{
        const response = await fetch(`${API_BASE_URL}/tasks`,{
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
        if (!response.ok) {
          throw new Error('Failed to create task');
        }
      }
      setIsModalOpen(false);
      setCurrentTask(null);
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
        tags: [],
      });
      fetchTasks();
    }catch(error){
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
    
  };

  const handleDelete = async (id) => {
    // if (!confirm('Are you sure you want to delete this task?')) {
    //   return;
    // }

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        credentials: 'include',
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: new Date(task.due_date).toISOString().split('T')[0],
      tags: task.tags,
    });
    setIsModalOpen(true);
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <div className="flex items-center space-x-4">
              <Link
              to="/dashboard"
              className='text-indigo-600 hover:text-blue-800 transition-colors'>
              <ArrowLeft className="h-6 w-6"/>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
              Task Management
              </h1>
            </div> 
              <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg
           hover:bg-blue-700 transition-colors flex items-center 
            shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ?(
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ):(
          <div className="grid grid-cols-1 gap-6">
            {tasks.length===0 ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl shadow-md p-8">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tasks yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Get Started by creating your first Task!!
                  </p>
                  <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Create Task
                  </button>
                </div>
              </div>
            ):(
              tasks.map((task) =>(
                <div
                key={task._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3  className="flex items-start justify-between mb-3">
                          {task.title}
                        </h3>
                        {isOverdue(task.due_date) && (
                          <span className='bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium'>
                            Overdue
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {task.description}
                      </p>
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full flex items-center border border-indigo-200"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2"/>
                          Due:{formatDate(task.due_date)}
                        </span>

                         <span className={`px-3 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                          <AlertCircle className="h-4 w-4 inline mr-1" />
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>

                        <span className={`px-3 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                          {task.status === 'in_progress' ? 'In Progress' : 
                           task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>

                      </div>
                      
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="Edit task"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {currentTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter task title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    rows={4}
                    placeholder="Describe your task..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setCurrentTask(null);
                      setFormData({
                        title: '',
                        description: '',
                        status: 'pending',
                        priority: 'medium',
                        due_date: '',
                        tags: [],
                      });
                    }}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    {currentTask ? 'Update Task' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

