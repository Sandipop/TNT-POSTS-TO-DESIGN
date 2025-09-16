import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import UserApp from './UserApp';
import AdminPanel from './components/admin/AdminPanel';

type UserRole = 'user' | 'admin';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedRole = localStorage.getItem('userRole') as UserRole;
    if (storedEmail && storedRole) {
        setUserEmail(storedEmail);
        setUserRole(storedRole);
        setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email: string) => {
      const role: UserRole = email.endsWith('@tagntarget.com') ? 'admin' : 'user';
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', role);
      setUserEmail(email);
      setUserRole(role);
      setIsAuthenticated(true);
  };

  const handleLogout = () => {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      setUserEmail(null);
      setUserRole(null);
      setIsAuthenticated(false);
  };


  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    Make Use of AI and Create your <span className="text-blue-600">LinkedIn</span> and <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Instagram</span> Images for Free!
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Transform your text posts into stunning, shareable visuals in seconds.
                </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                <Login onLogin={handleLogin} />
            </div>
        </div>
    );
  }

  return (
    <>
      {userRole === 'admin' ? (
        <AdminPanel userEmail={userEmail} onLogout={handleLogout} />
      ) : (
        <UserApp userEmail={userEmail} onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;