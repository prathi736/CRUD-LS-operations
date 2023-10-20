import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function List() {


    const navigate = useNavigate();

    const[data, setData] = useState([]);


    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        console.log(storedData);

        try {
            const parsedData = JSON.parse(storedData);
                setData(parsedData);
            } catch (error) {
                console.error('Error parsing data from local storage:', error);
            }
    }, []);

    // Used to delete an item
    const handleDelete = (index) => {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        setData(updatedData);
        localStorage.setItem('formData', JSON.stringify(updatedData));
    };

    // Navigate to view page
    const navigateView = (student) => {
        navigate('/view', {state: {student}});
    };

    // Navigate to update page
    const navigateUpdate = (index) => {
        console.log('index', index)
        navigate(`/update/${index}`);
    };

    return (
        <>
            <div className="bg-blue-300 flex justify-center items-center w-fit relative overflow-x-auto shadow-md">
                <table className='table-auto w-full text-base text-left text-blackn border-collapse border border-black'>
                    <thead className='text-lg text-white uppercase bg-black'>
                        <tr>
                            <th className='px-6 py-3'>Name</th>
                            <th className='px-6 py-3'>Roll No.</th>
                            <th className='px-6 py-3'>Class</th>
                            <th className='px-6 py-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className='bg-white'>
                                        <td className='px-6 py-4 font-medium whitespace-nowrap text-black'>{item.name}</td>
                                        <td className='px-6 py-4 font-medium whitespace-nowrap text-black text-center'>{item.rollNo}</td>
                                        <td className='px-6 py-4 font-medium whitespace-nowrap text-black text-center'>{item.class}</td>
                                        <td>
                                            <button 
                                            type="button" 
                                            onClick={() => navigateUpdate(index)}
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">UPDATE</button>
                                            <button 
                                            type="button" 
                                            onClick={() => handleDelete(index)}
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">DELETE</button>
                                            <button 
                                            type="button" 
                                            onClick={() => navigateView(item)}
                                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">VIEW</button>
                                        </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default List;