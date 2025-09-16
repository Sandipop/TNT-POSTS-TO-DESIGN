import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminPanel from './components/admin/AdminPanel';

const AdminAppPreview: React.FC = () => {
    const mockUserEmail = 'admin-preview@tagntarget.com';

    const handleLogout = () => {
        alert('Logout clicked! This is a preview and does not affect your actual session.');
        console.log('Logout action triggered in admin preview.');
    };

    return <AdminPanel userEmail={mockUserEmail} onLogout={handleLogout} />;
};


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AdminAppPreview />
  </React.StrictMode>
);