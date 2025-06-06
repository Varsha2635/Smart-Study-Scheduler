import React,{useState,useEffect} from 'react'
import { Plus, Edit2,Trash2, Tag, Calendar, AlertCircle } from 'lucide-react';
import {createTaskUser} from '../services/api'

export default function TaskManagement() {
      const[tasks,setTasks] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentTask, setIsCurrentTask] = useState(null);

      const [formData,setFormData] = useState({
            title:'',
            description:'',
            status:'pending',
            priority:'medium',
            due_date:'',
            tags:[],
      });
      const [newTag, setNewTag] = useState('');

      useEffect(()=>{
            fetchTasks();
      },[]);

      const fetchTasks = async () =>{
            try{
                  const response = await createTaskUser('http://localhost:3000/api/v1/tasks');
                  const data = await response.json();
                  setTasks(data);
            }
            catch(error){
                  console.error('Error fetching tasks:', error);
            }
      };

      const handleSubmit = async(e) =>{
            e.preventDefault();
            const payload={
                  ...formData,
                  due_date:new Date(formData.due_date).toISOString(),
            };

            try{
                  if(currentTask){
                        await fetch(`http://localhost:3000/api/v1/tasks/${currentTask.id}`,{
                              method:'PUT',
                              headers:{'Content-Type':'application/json'},
                              body:JSON.stringify(payload),
                        });
                  }else{
                        await fetch('http://localhost:3000/api/v1/tasks',{
                              method:'POST',
                              headers:{'Content-Type':'application/json'},
                              body: JSON.stringify(payload),
                        })
                  }

                  resetForm();
                  fetchTasks();

            }
            catch(error){
                  console.error('Error saving task:', error);
                  
            }
      };

      const handleDelete  = async (task) =>{
           try {
                  await fetch(`http://localhost:3000/api/v1/tasks/${task._id}`, { method: 'DELETE' });
                  fetchTasks();
            } catch (error) {
            console.error('Error deleting task:', error);
      }
      };

      const handleEdit = (task) =>{
           setIsCurrentTask(task);
           setFormData({
            title:task.title,
            description:task.description,
            status:task.status,
            priority:task.priority,
            due_date:new Date(task.due_date).toISOString().split('T')[0],
            tags:task.tags,
           });
           setIsModalOpen(true);
      };

      const addTag = () => {
         if (newTag && !formData.tags.includes(newTag)){
            setFormData({ ...formData, tags: [...formData.tags, newTag] });
            setNewTag('');
         }   
      };

      const removeTag = (tagToRemove) =>{
           setFormData({
            ...formData,
            tags:formData.tags.filter((tag)=> tag!==tagToRemove),
           });
      };

      const resetForm = () =>{
            setIsModalOpen(false);
            setIsCurrentTask(null);
            setFormData({
            title:'',
            description:'',
            status:'pending',
            priority:'medium',
            due_date:'',
            tags:[], 
            });
            setNewTag('');
      };

      const getPriorityColor = (priority) =>{
            switch(priority.toLowerCase()){
                  case 'high':
                        return 'text-red-600 bg-red-100';
                  case 'medium':
                        return 'text-yellow-600 bg-yellow-100';
                  case 'low':
                        return 'text-green-600 bg-green-100';
                  default:
                        return 'text-gray-600 bg-gray-100';
            }
      };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">
                      Task Management
                  </h1>
                      <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                        <Plus className="h-5 w-5 mr-2"/> Add Task
                      </button>
            </div>
            <div className='grid grid-cols-1 gap-4'>
                  {tasks.map((task) => (
                        <div
                        key={task.id}
                        className='bg-white rounded-lg shadow p-6 hover:shadow-md'>
                              <div className='flex justify-between items-start'>
                                    <div>
                                          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                                {task.title}
                                          </h3>
                                          <p className='text-gray-600 mb-4'>{task.description}</p>
                                          <div className='flex flex-wrap gap-2 mb-4'>
                                                {task.tags.map((tag, index) =>(
                                                      <span
                                                      key={index}
                                                      className='bg-indigo-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center'>
                                                            <Tag className='h-4 w-4 mr-1'/>{tag}
                                                      </span>
                                                ))}
                                          </div>
                                          <div className='flex items-center gap-4 text-sm'>
                                                <span className='flex items-center'>
                                                      <Calendar className='h-4 w-4 mr-1 text-gray-500'/>
                                                      <span className='text-gray-600'>
                                                            {new Date(task.due_date).toLocaleDateString()}
                                                      </span>
                                                </span>
                                                <span className={`px-3 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                                                      <AlertCircle className='h-4 w-4 inline mr-1'/>{' '}
                                                      {task.priority}
                                                </span>
                                                <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full'>
                                                      {task.status}
                                                </span>
                                          </div>
                                    </div>
                                    <div className='flex space-x-2'>
                                          <button
                                          onClick={()=> handleEdit(task)}
                                          className='text-blue-600 hover:text-blue-800 p-2'>
                                                <Edit2 className='h-5 w-5'/>
                                          </button>
                                          <button
                                          onClick={()=>handleDelete(task.id)}
                                          className='text-red-600 hover:text-red-800 p-2'>
                                                <Trash2 className='h-5 w-5'/>
                                          </button>
                                    </div>
                              </div>
                        </div>

                  ))}
            </div>
            {isModalOpen&&(
                 <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
                  <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl'>
                        <h2 className='text-xl font-bold mb-4'>
                              {currentTask?'Edit Task': 'Add New Task'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <input
                              type='text'
                              placeholder='Title'
                              required value={formData.title}
                              onChange={(e)=>
                                    setFormData({...formData,title:e.target.value})
                              }
                              className='w-full rounded-lg border px-3 py-2'/>
                              <textarea
                              placeholder='Description'
                              required value={formData.description}
                              onChange={(e) => setFormData({
                                    ...formData,description:e.target.value
                              })}
                              className='w-full rounded-lg border px-3 py-2' rows={3}/>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <select 
                                    value={formData.status}
                                    onChange={(e)=>setFormData({
                                          ...formData, status: e.target.value
                                    })}
                                    className='w-full rounded-lg border px-3 py-2'>
                                          <option value='pending'>
                                                Pending
                                          </option >
                                          <option value="in_progress">
                                                In Progress
                                          </option>
                                          <option value="completed">
                                                Completed
                                          </option>
                                    </select>
                                    <select 
                                    value={formData.priority}
                                    onChange={(e)=>setFormData({
                                          ...formData, priority: e.target.value
                                    })}
                                    className='w-full rounded-lg border px-3 py-2'>
                                          <option value='low'>
                                                Low
                                          </option >
                                          <option value="medium">
                                                Medium
                                          </option>
                                          <option value="high">
                                                High
                                          </option>
                                    </select>
                                    <input
                                    type='date'
                                    required value={formData.due_date}
                                    onChange={(e)=> setFormData({
                                          ...formData, due_date: e.target.value 
                                    })}
                                    className="w-full rounded-lg border px-3 py-2"/>
                              </div>
                              <div>
                                    <div className='flex gap-2 mb-2'>
                                          <input
                                          type='text'
                                          value={newTag}
                                          onChange={(e)=> setNewTag(e.target.value)}
                                          className="flex-1 rounded-lg border px-3 py-2" placeholder="Add tag"/>
                                          <button
                                          type='button'
                                          onClick={addTag}
                                          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
                                                Add
                                          </button>
                                    </div>
                                    <div className='flex flex-wrap gap-2'>
                                          {formData.tags.map((tag,index)=>(
                                                <span
                                                key={index} className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
                                                      {tag}
                                                      <button
                                                      type="button" onClick={() => removeTag(tag)}
                                                      className='ml-2'>
                                                            x
                                                      </button>
                                                </span>
                                          ))}
                                    </div>
                              </div>
                              <div className="flex justify-end gap-4 mt-4">
                                    <button type="button" onClick={resetForm}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                          Cancel
                                    </button>
                                    <button type="submit"
                                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                                          Save
                                    </button>
                              </div>
                        </form>
                  </div>
                 </div> 
            )}
      </div>
    </div>
  )
}
