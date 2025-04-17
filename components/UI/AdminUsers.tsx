// components/AdminUsers.tsx
import React from "react";
import UserList from "./UserList";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AdminUsersProps {
  users: User[];
  onDelete: (userId: string) => void;
  onPromote: (userId: string) => void;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ users, onDelete, onPromote }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Lista korisnika</h3>
      <UserList users={users} onDelete={onDelete} onPromote={onPromote} />
    </div>
  );
};

export default AdminUsers;
