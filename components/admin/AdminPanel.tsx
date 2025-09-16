import React from 'react';
import AdminHeader from './AdminHeader';
import UserTable from './UserTable';
import { User } from '../../types';

interface AdminPanelProps {
    userEmail: string | null;
    onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ userEmail, onLogout }) => {
    // Dummy data for demonstration
    // FIX: Add User[] type to the users array to ensure type compatibility with the UserTable component.
    const users: User[] = [
        { id: 1, email: 'john.doe@email.com', signUpDate: '2024-05-20', status: 'Active' },
        { id: 2, email: 'jane.smith@email.com', signUpDate: '2024-05-19', status: 'Active' },
        { id: 3, email: 'sam.wilson@email.com', signUpDate: '2024-05-18', status: 'Banned' },
        { id: 4, email: 'chris.green@email.com', signUpDate: '2024-05-17', status: 'Active' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader userEmail={userEmail} onLogout={onLogout} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome, {userEmail}. Manage your application here.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                   <UserTable users={users} />
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
