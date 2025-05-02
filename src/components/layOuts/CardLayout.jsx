import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { TfiBag } from "react-icons/tfi";
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CardLayout = ({ employees, openEditModal, initiateDelete, getInitials }) => {
    return (
        <div className="flex justify-center gap-4 p-4 md:p-6 lg:p-10 flex-wrap">
            {employees.map(employee => (
                <div
                    key={employee.id || employee._id}
                    className="border w-full sm:w-[45%] md:w-[45%] lg:w-[30%] shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white relative mb-4"
                >
                        <div className="flex gap-2 items-center absolute top-3 right-3 text-gray-500 cursor-pointer text-base md:text-lg">
                            <RiDeleteBinLine
                                onClick={() => initiateDelete(employee)}
                                className="text-red-500 transition-colors hover:text-red-700"
                            />
                            <FaEdit
                                onClick={() => openEditModal(employee)}
                                className="text-blue-500 transition-colors hover:text-blue-700"
                            />
                        </div>
                    <Link to={`/employee-details/${employee.id || employee._id}`} className="block h-full">

                        <div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-3 items-center border-b pb-5 border-gray-200 px-3">
                                <div className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-md">
                                    {getInitials(employee.firstName, employee.lastName)}
                                </div>
                                <div className="text-center sm:text-left">
                                    <h1 className='employee-name font-bold text-lg sm:text-xl text-gray-800'>
                                        {employee.firstName} {employee.lastName}
                                    </h1>
                                    <p className='text-xs sm:text-sm text-gray-600 employee-position flex gap-1 sm:gap-2 items-center mt-1 sm:mt-2 justify-center sm:justify-start'>
                                        <TfiBag className="text-amber-500" />
                                        <span>{employee.position}</span>
                                    </p>
                                    <p className='text-xs sm:text-sm text-gray-600 flex gap-1 sm:gap-2 items-center mt-1 justify-center sm:justify-start'>
                                        <FaBirthdayCake className="text-amber-500" />
                                        <span>{employee.age} years</span>
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 px-3 sm:px-4 py-3'>
                                <div className='flex gap-2 items-center rounded-lg transition-colors duration-200 justify-center sm:justify-start'>
                                    <MdOutlineEmail className='text-base sm:text-lg text-amber-500' />
                                    <a
                                        href={`mailto:${employee.email}`}
                                        className='email-text text-sm sm:text-base text-gray-700 hover:text-amber-600 transition-colors truncate'
                                    >
                                        {employee.email}
                                    </a>
                                </div>

                                <div className='flex gap-2 items-center rounded-lg transition-colors duration-200 justify-center sm:justify-start'>
                                    <FaPhone className='text-base sm:text-lg text-amber-500' />
                                    <a
                                        href={`tel:${employee.phone}`}
                                        className='text-sm sm:text-base text-gray-700 hover:text-amber-600 transition-colors truncate'
                                    >
                                        {employee.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CardLayout;