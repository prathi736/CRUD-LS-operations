import React, { useEffect, useState } from 'react';
import './Update.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {

    const navigate = useNavigate();
    const { index } = useParams();
    console.log('statessss', index)

    const initialFormData = {
        name: '',
        rollNo: '',
        class: '',
    };


    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(initialFormData);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData'));
        if (storedData && index >= 0 && index < storedData.length) {
            const studentToUpdate = storedData[index];
            setFormData(studentToUpdate);
        }

    }, [index]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        for (const field in formData) {
            if (formData[field].trim() === '') {
                validationErrors[field] = "required";
            }
        };


        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        // const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        // if (index >= 0 && index < storedData.length) {
        //     storedData[index] = formData;
        //     localStorage.setItem('formData', JSON.stringify(storedData));
        // }

        const storedData = JSON.parse(localStorage.getItem('formData')) || [];

        const itemToUpdate = {...formData};

        if (index >= 0 && index < storedData.length) {
            storedData[index] = itemToUpdate;
        } else {
            console.error('Invalid index. Item not updated.');
        }

        localStorage.setItem('formData', JSON.stringify(storedData));

        setError(initialFormData);

        navigate('/list');

    };


    return (
        <>
            <div className="cardForm font-mono">
                <h1 className="text-3xl font-bold text-center pt-7 pb-4">Update Student Form</h1>
                <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>

                    {Object.keys(formData).map((field) => (
                        <div key={field} className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor={field} className="text-2xl font-semibold">{field}</label>
                                {error[field] && (
                                    <p className="text-red-500 font-semibold bg-red-100 rounded-md">
                                        {error[field]}
                                    </p>
                                )}
                            </div>
                            <input
                                type="text"
                                name={field}
                                className={`shadow border-blue-600 border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 
                                    ${error[field] ? 'border-red-500' : ''}`}
                                placeholder={field}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}



                    <div className="py-4">
                        <button className='bg-blue-600 hover:bg-blue-700 text-white  py-2 px-4 rounded' type="submit">
                            <FontAwesomeIcon icon={faFilePen} />
                            &nbsp;
                            Update Form
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update;