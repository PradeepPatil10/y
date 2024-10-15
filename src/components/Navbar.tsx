import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, Settings } from 'lucide-react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-pink-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Yuyiii</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-pink-200"><Home className="inline-block mr-1" size={20} />Home</Link>
          <Link to="/search" className="hover:text-pink-200"><Search className="inline-block mr-1" size={20} />Search</Link>
          <Link to="/admin" className="hover:text-pink-200"><Settings className="inline-block mr-1" size={20} />Admin</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar