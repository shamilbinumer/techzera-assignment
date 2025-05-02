import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { TfiBag } from "react-icons/tfi";
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const TableLayout = ({ employees, openEditModal, initiateDelete, getInitials }) => {
    return (
        <div className="p-10">
            <div className="w-full overflow-x-auto shadow-md border rounded-xl bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(employee => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white font-bold">
                                            {getInitials(employee.firstName, employee.lastName)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {employee.firstName} {employee.lastName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700 flex items-center gap-2">
                                        <TfiBag className="text-amber-500" />
                                        {employee.position}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700 flex items-center gap-2">
                                        <FaBirthdayCake className="text-amber-500" />
                                        {employee.age}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700 flex items-center gap-2">
                                        <FaPhone className="text-amber-500" />
                                        <a href={`tel:${employee.phone}`} className="hover:text-amber-600 transition-colors">
                                            {employee.phone}
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700 flex items-center gap-2">
                                        <MdOutlineEmail className="text-amber-500" />
                                        <a href={`mailto:${employee.email}`} className="hover:text-amber-600 transition-colors">
                                            {employee.email}
                                        </a>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex gap-3 justify-end">
                                        <button onClick={() => openEditModal(employee)} className="text-blue-600 hover:text-blue-900">
                                            <FaEdit className="text-2xl" />
                                        </button>
                                        <Link to={`/employee-details/${employee.id}`} className="text-blue-600 hover:text-blue-900">
                                            <button onClick={() => openEditModal(employee)} className="text-green-400 hover:text-blue-900">
                                                <IoEyeSharp className="text-2xl" />
                                            </button>
                                        </Link>
                                        <button onClick={() => initiateDelete(employee)} className="text-red-600 hover:text-red-900">
                                            <RiDeleteBinLine className="text-2xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableLayout;