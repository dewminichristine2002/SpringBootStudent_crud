import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const HomePage = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);

    const fetchStudents = async () => {
        const response = await axios.get(BASE_URL);
        setStudents(response.data);
    };

    const handleCreateOrUpdate = async (data) => {
        if (editingStudent) {
            await axios.put(`${BASE_URL}/${editingStudent.id}`, data);
            setEditingStudent(null);
        } else {
            await axios.post(BASE_URL, data);
        }
        fetchStudents();
    };

    const handleDelete = async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        fetchStudents();
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="container">
            <h1>Student Management</h1>
            <StudentForm onSubmit={handleCreateOrUpdate} initialData={editingStudent} />
            <StudentList students={students} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );
};

export default HomePage;
