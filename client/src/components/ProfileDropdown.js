import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:4000/api/v1';



export default function ProfileDropdown({ userImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Clear any local storage or session data if needed
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login page or home
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <img
          className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
          // src={userImage || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"}
          src={userImage || "https://cdn-icons-png.flaticon.com/512/8345/8345328.png"}
          alt="User profile"
        />
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Account</p>
            <p className="text-xs text-gray-500">Manage your profile and settings</p>
          </div>
          
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-3 text-gray-400" />
              View Profile
            </Link>
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="h-4 w-4 mr-3" />
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



// import React, { useState, useRef, useEffect } from 'react';
// import { User, LogOut, ChevronDown } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function ProfileDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const storedUser = localStorage.getItem('user');
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   useEffect(()=>{
//       const handleClickOutside = (event) =>{
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }           
//       };

//       document.addEventListener('mousedown',handleClickOutside);
//       return ()=> document.removeEventListener('mousedown',handleClickOutside);
//   },[]);

//   const handleProfileClick = () => {
//     navigate('/profile');
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.setItem('isLoggedIn', 'false');
//     setIsOpen(false);
//     navigate('/login');
//     // Optional: reload to force state update
//     // window.location.reload();
//   };

//   if (!user) return null;

//   return (
//     <div className='relative' ref={dropdownRef}>
//       <button
//       onClick={()=> setIsOpen(!isOpen)}
//       className='flex items-center space-x-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all 
//       duration-200 border border-gray-100'>
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center 
//             justify-center text-white font-semibold text-sm">
//                   {user.name.charAt(0).toUpperCase()}
//             </div>
//             <span className="hidden md:block text-gray-700 font-medium">
//                   {user.name}
//             </span>
//             <ChevronDown
//             className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
//             isOpen ? 'rotate-180' : ''
//             }`}/>
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
//           <div className="px-4 py-3 border-b border-gray-100">
//             <p className="text-sm font-medium text-gray-900">{user.name}</p>
//             <p className="text-sm text-gray-500 truncate">{user.email}</p>
//           </div>
          
//           <button
//             onClick={handleProfileClick}
//             className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
//           >
//             <User className="w-4 h-4 mr-3 text-gray-500" />
//             Profile Settings
//           </button>
          
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
//           >
//             <LogOut className="w-4 h-4 mr-3" />
//             Sign Out
//           </button>
//         </div>
//       )}      
//     </div>
//   )
// }
