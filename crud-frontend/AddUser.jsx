import React, { useState } from 'react'
import FormUI from './src/FormUI'
import Link from 'antd/es/typography/Link';
import { NavLink, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await fetch('http://localhost:8080/users/post', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        })
        setLoading(false)
        navigate("/");
    }

    console.log("usd : ", user)
    const formChangeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        // console.log(e.target.name," : ",e.target.value);   
    }
    return (
        <div>
            <NavLink to="/">Go to Home</NavLink>
            <FormUI title="Add User">
                <div className="mb-2">
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Name:
                    </label>
                    <input
                        required
                        type="text"
                        onChange={formChangeHandler}
                        name='name'
                        className="border-blue-400 block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Email:
                    </label>
                    <input
                        required
                        type="email"
                        onChange={formChangeHandler}
                        name='email'
                        className="border-blue-400 block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mb-2">
                    <label
                        htmlFor="contact"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Contact:
                    </label>
                    <input
                        required
                        type="number"
                        onChange={formChangeHandler}
                        name='contact'
                        className="border-blue-400 block w-full px-4 py-2 mt-2 text-blue-400 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <button
                    type="submit"
                    onClick={formSubmitHandler}
                    style={{ backgroundColor: "blue" }}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </FormUI>
        </div>
    )
}

export default AddUser