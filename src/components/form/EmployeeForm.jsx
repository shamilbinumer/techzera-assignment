// EmployeeForm.jsx
import { useState, useEffect } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { TfiBag } from "react-icons/tfi";
import { IoMdClose } from 'react-icons/io';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { IoCallOutline } from 'react-icons/io5';

const EmployeeForm = ({ isOpen, onClose, onSubmit, isEditing, initialData }) => {
  // Use initialData or empty object for initial state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    phone: '',
    age:'',
  });

  // Reset form or populate with data when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        setFormData({
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          position: initialData.position || '',
          phone: initialData.phone || '',
          age: initialData.age || ''
        });
      } else {
        // Reset form if not editing
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          position: '',
          phone: '',
          age: '',
        });
      }
    }
  }, [isOpen, isEditing, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If editing, pass the ID along with form data
    if (isEditing && initialData) {
      onSubmit({
        ...formData,
        id: initialData.id
      });
    } else {
      onSubmit(formData);
    }
    
    onClose();
  };

  // Handle closing on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-4 sm:p-6 relative my-8">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <IoMdClose />
        </button>
        
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto shadow-md">
            <FaUser />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-3 sm:mt-4">
            {isEditing ? 'Edit Employee' : 'Add New Employee'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                  <FaCalendarAlt className="text-amber-500" />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                  <IoCallOutline className="text-amber-500" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                <MdOutlineEmail className="text-amber-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                <TfiBag className="text-amber-500" />
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors sm:order-1 w-full sm:w-1/3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-br from-blue-800 to-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:opacity-90 transition-all duration-300 sm:order-2 w-full sm:w-2/3"
            >
              {isEditing ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;