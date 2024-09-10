import axios from 'axios'
import React, { useState, useEffect } from 'react'
import SideNav from '../../component/SideNav'
export default function Authentication() {
    const [activeMethods, setActiveMethods] = useState([])
    const [newMethodName, setNewMethodName] = useState('')
    const [newMethodImage, setNewMethodImage] = useState(null)
    const [newMethodactive, setNewMethodactive] = useState(false)

    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)

    // Fetch active login methods
    const fetchActiveMethods = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/v1/admin/get_all_methods'
            )
            console.log(response.data)
            setActiveMethods(response.data) // Assume this returns an array of login methods
        } catch (error) {
            console.error('Error fetching methods:', error)
            setError('Failed to load active methods.')
        }
    }

    // Add a new login method
    const handleAddMethod = async () => {
        if (!newMethodName || !newMethodImage) {
            setError('Please provide both method name and image.')
            return
        }

        const formData = new FormData()
        formData.append('name', newMethodName)
        formData.append('image', newMethodImage)
        formData.append('is_active', newMethodactive)

        try {
            await axios.post(
                'http://127.0.0.1:8000/v1/admin/create_method',
                formData
            )
            fetchActiveMethods() // Refresh the list after adding a method
            setNewMethodName('') // Reset form fields
            setNewMethodImage(null)
            setError(null)
            setShow(false)
        } catch (error) {
            console.error('Error adding new method:', error)
            setError('Failed to add the new method.')
        }
    }

    // Toggle method activation status
    const handleToggleMethod = async (methodId) => {
        try {
            await axios
                .put(`http://127.0.0.1:8000/v1/admin/toggle-method/${methodId}`)
                .then((res) => {
                    console.log(res.data)
                })

            // Refresh the list after toggling
            fetchActiveMethods()
        } catch (error) {
            console.error('Error toggling method status:', error)
            setError('Failed to update method status.')
        }
    }

    // Load active methods on component mount
    useEffect(() => {
        fetchActiveMethods()
    }, [])

    return (
        <div className="font-SUSE">
            {show ? (
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-SUSE">
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                        <div className="flex items-center pb-3 border-b border-gray-300">
                            <h3 className="text-gray-800 text-xl font-bold flex-1">
                                Add New Authentication Method
                            </h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                                viewBox="0 0 320.591 320.591"
                            >
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"
                                ></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>

                        <div className="my-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Method Name
                                </label>
                                <input
                                    type="text"
                                    value={newMethodName}
                                    onChange={(e) =>
                                        setNewMethodName(e.target.value)
                                    }
                                    className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-500"
                                    placeholder="Enter method name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Active Status
                                </label>
                                <select
                                    type="text"
                                    value={newMethodactive}
                                    onChange={(e) =>
                                        setNewMethodactive(e.target.value)
                                    }
                                    className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-500"
                                    placeholder="Enter method name"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Method Icon
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setNewMethodImage(e.target.files[0])
                                    }
                                    className="mt-1 block w-full"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShow(false)
                                }}
                                type="button"
                                className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    handleAddMethod()
                                }}
                                type="button"
                                className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="w-[100vw] flex justify-between h-[100vh]">
                <SideNav />
                <div className="w-[80vw] h-[100vh] p-4">
                    <div className="flex justify-between items-center">
                        <h1 className=" text-3xl"> Authentication </h1>
                        <button
                            onClick={() => {
                                setShow(true)
                            }}
                            className="w-[150px] bg-blue-500 py-1 text-white"
                        >
                            Add Method
                        </button>
                    </div>

                    <div className="font-SUSE overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="whitespace-nowrap">
                                <tr>
                                    <th className="p-4 text-left text-sm font-semibold text-black">
                                        Available Methods
                                    </th>

                                    <th className="p-4 text-left text-sm font-semibold text-black">
                                        Active
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3 h-3 fill-gray-400 inline cursor-pointer ml-2"
                                            viewBox="0 0 401.998 401.998"
                                        >
                                            <path
                                                d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-black">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeMethods?.map((method, index) => (
                                    <tr className="odd:bg-blue-50">
                                        <td className="p-4 text-sm">
                                            <div className="flex items-center cursor-pointer w-max">
                                                <img
                                                    src={method?.image}
                                                    className="w-9 h-9  shrink-0"
                                                />
                                                <div className="ml-4">
                                                    <p className="text-sm text-black">
                                                        {method?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm">
                                            <label className="relative cursor-pointer">
                                                <input
                                                    checked={method?.is_active}
                                                    onChange={() => {
                                                        handleToggleMethod(
                                                            method?.id
                                                        )
                                                    }}
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
                                            </label>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                className="mr-4"
                                                title="Edit"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 fill-blue-500 hover:fill-blue-700"
                                                    viewBox="0 0 348.882 348.882"
                                                >
                                                    <path
                                                        d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                        data-original="#000000"
                                                    />
                                                    <path
                                                        d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                        data-original="#000000"
                                                    />
                                                </svg>
                                            </button>
                                            <button title="Delete">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 fill-red-500 hover:fill-red-700"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                        data-original="#000000"
                                                    />
                                                    <path
                                                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                                        data-original="#000000"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
