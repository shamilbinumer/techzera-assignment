import { useState, useEffect } from 'react';
import '../../App.css';
import { FaUserPlus } from 'react-icons/fa';
import { BsCardList, BsTable } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { MdFilterList, MdClose } from 'react-icons/md';
import EmployeeForm from '../form/EmployeeForm';
import ConfirmationAlert from '../alert/ConformationAlert';
import CardLayout from '../layOuts/CardLayout';
import TableLayout from '../layOuts/TableLayout';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [viewMode, setViewMode] = useState('card'); 
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterAge, setFilterAge] = useState({ min: '', max: '' });

    const [employees, setEmployees] = useState(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
            return JSON.parse(storedEmployees);
        } else {
            return [];
        }
    });

    const [filteredEmployees, setFilteredEmployees] = useState(employees);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, filterAge, employees]);

    const applyFilters = () => {
        let result = [...employees];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            const phoneSearch = term.replace(/\D/g, '');

            result = result.filter(emp =>
                emp.firstName.toLowerCase().includes(term) ||
                emp.lastName.toLowerCase().includes(term) ||
                (emp.position && emp.position.toLowerCase().includes(term)) ||
                (phoneSearch.length > 0 && emp.phone && emp.phone.replace(/\D/g, '').includes(phoneSearch))
            );
        }

        if (filterAge.min !== '') {
            result = result.filter(emp => emp.age >= parseInt(filterAge.min));
        }
        if (filterAge.max !== '') {
            result = result.filter(emp => emp.age <= parseInt(filterAge.max));
        }

        setFilteredEmployees(result);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setFilterAge({ min: '', max: '' });
        setIsFilterOpen(false);
    };

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentEmployee(null);
        setIsModalOpen(true);
    };

    const openEditModal = (employee) => {
        setIsEditing(true);
        setCurrentEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentEmployee(null);
    };

    const handleSubmit = (formData) => {
        let updatedEmployees;

        if (isEditing) {
            updatedEmployees = employees.map(emp =>
                emp.id === formData.id ? { ...formData } : emp
            );
        } else {
            const newEmployee = {
                id: Date.now(),
                ...formData
            };
            updatedEmployees = [...employees, newEmployee];
        }

        setEmployees(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    const initiateDelete = (employee) => {
        setEmployeeToDelete(employee);
        setIsConfirmationOpen(true);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            const updatedEmployees = employees.filter(employee => employee.id !== employeeToDelete.id);

            setEmployees(updatedEmployees);
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
            setEmployeeToDelete(null);
        }
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const toggleViewMode = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className='max-w-full overflow-x-hidden'>
            <div className='flex flex-col sm:flex-row justify-between items-center px-3 sm:px-5 pt-3 sm:pt-5 gap-3 sm:gap-0'>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Employee Directory</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center sm:justify-end">
                    <div className="flex items-center bg-gray-100 p-1 rounded-lg shadow-sm">
                        <button
                            className={`p-1.5 sm:p-2 rounded-md flex items-center gap-1 ${viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => toggleViewMode('card')}
                            aria-label="Card view"
                        >
                            <BsCardList className="text-base sm:text-lg" />
                        </button>
                        <button
                            className={`p-1.5 sm:p-2 rounded-md flex items-center gap-1 ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => toggleViewMode('table')}
                            aria-label="Table view"
                        >
                            <BsTable className="text-base sm:text-lg" />
                        </button>
                    </div>

                    <button
                        className='bg-gradient-to-br from-blue-800 to-blue-600 text-white p-1.5 sm:p-2 px-3 sm:px-5 text-sm sm:text-base font-bold rounded-xl flex items-center gap-1 sm:gap-2'
                        onClick={openAddModal}
                    >
                        <FaUserPlus /> <span>Add Employee</span>
                    </button>
                </div>
            </div>

          
       {employees.length > 0 && (
                <div className="px-3 sm:px-5 py-3 sm:py-4">
                    {/* Centered search and filter section */}
                    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center">
                            <div className="relative w-full sm:w-1/2">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by name, position, or phone..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <div className="flex gap-2 justify-center sm:justify-start">
                                <button
                                    className={`px-3 py-2 rounded-lg border flex items-center gap-2 ${isFilterOpen ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-white hover:bg-gray-50'}`}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    <MdFilterList />
                                    <span>Age Filter</span>
                                    {(filterAge.min || filterAge.max) && (
                                        <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                                            1
                                        </span>
                                    )}
                                </button>

                                {(searchTerm || filterAge.min || filterAge.max) && (
                                    <button
                                        className="px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-red-500 flex items-center gap-2"
                                        onClick={resetFilters}
                                    >
                                        <MdClose />
                                        <span>Clear</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Age Filter Panel - Centered */}
                        {isFilterOpen && (
                            <div className="mt-3 p-4 border rounded-lg bg-white shadow-md w-full sm:w-2/3 mx-auto">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Age Range</label>
                                    <div className="flex gap-2 items-center justify-center">
                                        <input
                                            type="number"
                                            value={filterAge.min}
                                            onChange={(e) => setFilterAge({ ...filterAge, min: e.target.value })}
                                            placeholder="Min"
                                            className="w-full max-w-xs p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            value={filterAge.max}
                                            onChange={(e) => setFilterAge({ ...filterAge, max: e.target.value })}
                                            placeholder="Max"
                                            className="w-full max-w-xs p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min={filterAge.min || "0"}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results count - Centered */}
                        <div className="mt-3 text-sm text-gray-600 text-center w-full">
                            Showing {filteredEmployees.length} of {employees.length} employees
                        </div>
                    </div>
                </div>
            )}

            <div className="container-fluid">
                {employees.length > 0 ? (
                    filteredEmployees.length > 0 ? (
                        viewMode === 'card' ? (
                            <CardLayout
                                employees={filteredEmployees}
                                openEditModal={openEditModal}
                                initiateDelete={initiateDelete}
                                getInitials={getInitials}
                            />
                        ) : (
                            <div className="overflow-x-auto">
                                <TableLayout
                                    employees={filteredEmployees}
                                    openEditModal={openEditModal}
                                    initiateDelete={initiateDelete}
                                    getInitials={getInitials}
                                />
                            </div>
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center p-4 sm:p-10 text-center h-[40vh]">
                            <h2 className="text-xl font-bold text-gray-700 mb-2">No matching employees</h2>
                            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                            <button
                                className="bg-blue-100 text-blue-700 p-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                                onClick={resetFilters}
                            >
                                Clear all filters
                            </button>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center p-4 sm:p-10 text-center h-[60vh] sm:h-[70vh]">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">No employees available</h2>
                        <p className="text-gray-500 mb-4 sm:mb-6 px-4">Please add new employees to get started</p>
                        <button
                            className="bg-gradient-to-br from-blue-800 to-blue-600 text-white p-2 sm:p-3 px-4 sm:px-6 text-sm sm:text-base font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-all"
                            onClick={openAddModal}
                        >
                            <FaUserPlus /> Add Employee
                        </button>
                    </div>
                )}
            </div>

            <EmployeeForm
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                isEditing={isEditing}
                initialData={currentEmployee}
            />

            <ConfirmationAlert
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Employee"
                message={employeeToDelete ? `Are you sure you want to delete ${employeeToDelete.firstName} ${employeeToDelete.lastName}?` : "Are you sure you want to delete this employee?"}
                confirmText="Delete"
                cancelText="Cancel"
                type="error"
            />
        </div>
    );
};

export default Home;