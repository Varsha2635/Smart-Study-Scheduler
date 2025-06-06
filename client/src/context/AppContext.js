import React, {createContext,useContext, useEffect, useState,} from 'react'

import {sampleCourses, sampleTasks, sampleSessions} from '../data/SampleData'

//create context
const AppContext = createContext();

//Custom hook
export const useApp = () =>{
      const context = useContext(AppContext);
      if(!context){
            throw new Error("useApp must be used within AppProvider");      
      }
      return context;
}

//AppContext Provider Component
export function AppProvider({children}){
      const [courses, setCourses] = useState([]);
      const [tasks, setTasks] = useState([]);
      const [studySessions, setStudySessions] = useState([]);

      useEffect(()=>{
            setCourses(sampleCourses);
            setTasks(sampleTasks);
            setStudySessions(sampleSessions);
      },[]);

      const addCourse = (course) => setCourses([...courses, course]);
      const addTask = (task) => setTasks([...tasks, task]);
      const updateTask = (id, updatedTask) =>
         setTasks(tasks.map(task=>task.id===id?{...task, ...updatedTask}: task));
      const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));  
      const completeTask = (id) =>
         setTasks(tasks.map(task =>
            task.id===id ?  {...task, completed:true, completedDate:new Date() } : task
      ));

      const addStudySession = (session) => setStudySessions([...studySessions, session]);
      const updateStudySession = (id, updatedSession) =>
            setStudySessions(studySessions.map(session =>
            session.id === id ? { ...session, ...updatedSession } : session
      ));
      const deleteStudySession = (id) =>
            setStudySessions(studySessions.filter(session => session.id !== id));

      const value ={
            courses,
            tasks,
            studySessions,
            addCourse,
            addTask,
            updateTask,
            deleteTask,
            addStudySession,
            deleteStudySession,
            completeTask
      };

      return (
            <AppContext.Provider value={value}>
                  {children}
            </AppContext.Provider>
      )

}




export default function AppContext() {
  return (
    <div>AppContext</div>
  )
}

