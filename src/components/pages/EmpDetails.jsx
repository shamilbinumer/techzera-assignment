import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MdOutlineEmail, MdArrowBack, } from 'react-icons/md';
import { FaPhone, FaBirthdayCake, } from 'react-icons/fa';
import { TfiBag } from 'react-icons/tfi';

const EmpDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchEmployee = () => {
            try {
                setLoading(true);
                const storedEmployees = localStorage.getItem('employees');
                if (storedEmployees) {
                    const employees = JSON.parse(storedEmployees);
                    const foundEmployee = employees.find(emp => emp.id.toString() === id);
                    
                    if (foundEmployee) {
                        setEmployee(foundEmployee);
                    } else {
                        setError('Employee not found');
                    }
                } else {
                    setError('No employees data available');
                }
            } catch (err) {
                setError('Error loading employee data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);
    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
    };
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
                <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <MdArrowBack /> Back to Directory
                </Link>
            </div>
        );
    }
    if (!employee) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-gray-700 text-xl font-semibold mb-4">Employee not found</div>
                <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <MdArrowBack /> Back to Directory
                </Link>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mb-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                    <MdArrowBack className="text-xl" />
                    <span className="font-medium">Back to Directory</span>
                </Link>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg">
                            {getInitials(employee.firstName, employee.lastName)}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {employee.firstName} {employee.lastName}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                <TfiBag className="text-white opacity-90" />
                                <span className="opacity-90 font-medium">{employee.position}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Personal Information</h2>
                            <div className="space-y-4">
                                {/* Age */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <FaBirthdayCake className="text-xl text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Age</p>
                                        <p className="font-medium text-gray-700">{employee.age} years</p>
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <MdOutlineEmail className="text-xl text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <a 
                                            href={`mailto:${employee.email}`} 
                                            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            {employee.email}
                                        </a>
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <FaPhone className="text-xl text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <a 
                                            href={`tel:${employee.phone}`} 
                                            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            {employee.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpDetails;