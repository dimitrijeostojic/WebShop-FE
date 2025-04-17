import React from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface UserListProps {
  users: User[];
  onPromote: (userId: string) => void;
  onDelete: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onPromote, onDelete }) => {
  const filteredUsers = users.filter((user) => user.role !== "Admin");

  if (filteredUsers.length === 0) {
    return <p className="text-gray-500 text-sm">Nema korisnika za prikaz.</p>;
  }

  return (
    <div className="space-y-3">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="border p-4 rounded-lg bg-gray-50 shadow-sm flex justify-between items-start"
        >
          <div>
            <p className="font-semibold text-violet-700">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Uloga: {user.role}</p>
          </div>
          <div className="flex flex-col space-y-2">
            {user.role === "RegularUser" && (
              <button
                onClick={() => onPromote(user.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Promovisi u Managera
              </button>
            )}
            <button
              onClick={() => onDelete(user.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Obriši korisnika
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
