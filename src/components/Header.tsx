import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
          <Mail className="mr-2" />
          Newsletter Digest
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mr-4 text-gray-600 hover:text-blue-600">Dashboard</Link>
              <button onClick={logout} className="text-gray-600 hover:text-blue-600">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;