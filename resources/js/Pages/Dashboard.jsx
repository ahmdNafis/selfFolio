import GeneralLayout from '@/Layouts/GeneralLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import EditUser from '@/Pages/User/EditUser';
import EditProfile from '@/Pages/Profile/EditProfile';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"


export default function Dashboard({props, auth, user, profile}) {
    const [role, setRole] = useState(null)
    const {flash} = usePage().props
    const [flashVisible, setFlashVisibility] = useState(true)
    const [editUser, setEditUser] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [orders, setOrders] = useState(null)
    const [detail, setDetail] = useState(props.panelVisible)

    useEffect(() => {
        axios.get(`/user/role/${auth.user.role_id}`).then((res) => {
            setRole(res.data.role.role_title)
        })

    }, [auth.user.role_id])
    
    useEffect(() => {
        axios.get(`/order/summary/${auth.user.id}/${true}`).then((res) => {
            setOrders(res.data.orders)
        })
    }, [auth.user.id]) 

    if(role=='Admin') {
        const data = {
            labels: props.dates,
            datasets: [
                {
                    name: "Earnings ($)",
                    values: props.prices,
                },
                {
                    name: "Projects Sold",
                    values: props.quantities,
                }
            ]
        }

        const chart = new Chart('#chart', {
            title: "Total Sales",
            data: data,
            type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
            height: 400,
            colors: ['#d1d8e0', '#45aaf2'],
        })
    }

    return (
        <GeneralLayout auth={auth}>
            <Head title={`Dashboard: ${user.first_name}`} />

            {editProfile &&
                <EditProfile auth={auth} visibility={editProfile} />
            }

            {editUser &&
                <EditUser auth={auth} visibility={editUser} />
            }
            <section className="min-h-screen bg-white drop-shadow-xl p-10 rounded-sm relative mx-auto space-y-4 justify-between">
                <div className="max-w-7xl mx-auto ">
                    <h2 className="text-left flex font-bold text-slate-700 border-b border-slate-300 pb-2 mb-4">
                        <p className="flex-1 text-2xl ">{auth.user.first_name+'\'s'+' Account' }</p>
                        {(role=='Admin') &&
                            <button preserveState type="button" onClick={() => setDetail(!detail)} className="transition delay-100 text-slate-100 bg-sky-600 hover:bg-sky-500 hover:text-slate-50 text-md font-semibold px-5 rounded-sm">Open Details</button>
                        }
                        
                    </h2>

                        {(flashVisible && flash.message) &&
                            <div className="relative mx-auto flex py-2 bg-green-600/90 text-slate-50 text-lg rounded-sm font-medium drop-shadow-md text-center">
                                <div className="text-center flex-1"><p className="px-3 py-2 h-full">{flash.message}</p></div>
                                <div className="py-1 flex-none text-right px-4">
                                    <button 
                                        onClick={() => setFlashVisibility(!flashVisible)}
                                        className="transition delay-50 hover:text-slate-300/60 h-full"
                                        type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        }
                        {(flashVisible && flash.deletion) &&
                            <div className="relative mx-auto flex py-2 bg-red-600/90 text-slate-50 text-lg rounded-sm font-medium drop-shadow-md text-center">
                                <div className="text-center flex-1"><p className="px-3 py-2 h-full">{flash.deletion}</p></div>
                                <div className="py-1 flex-none text-right px-4">
                                    <button 
                                        onClick={() => setFlashVisibility(!flashVisible)}
                                        className="transition delay-50 hover:text-slate-300/60 h-full"
                                        type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        }

                        {detail &&
                        <div className="flex bg-white overflow-hidden pt-4 space-x-2 w-full">
                            <div className="flex-1 shadow-xl bg-sky-200 text-slate-800 p-2">
                                <h3 className="border-b border-gray-300 flex mx-2 text-lg">
                                    <p className="flex-1">Profile</p>
                                    <button onClick={() => setEditProfile(!editProfile)} className="cursor-pointer font-semibold underline text-sky-600 hover:text-sky-400 transition delay-100">Edit</button>
                                </h3>
                                <div className="flex flex-wrap text-sm text-slate-700 text-center mx-2 py-2 w-full">
                                    <div className="flex mx-auto space-x-2 text-center">
                                        <p className="font-bold pt-5">Avatar:</p>
                                        {profile && profile.avatar_link ?
                                            <>
                                                <img src={window.location.origin+'/'+profile.avatar_link} className="rounded-full object-contain p-1 max-h-16 max-w-16" />
                                            </>
                                            :
                                            <span>
                                                <img src={window.location.origin+'/avatar.png'} className="rounded-full object-contain p-1 max-h-16 max-w-16" />
                                                <p className="text-xs italic">Please choose an image</p>
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-wrap text-sm text-slate-700 text-center mx-2 py-2 w-full">
                                    <div className="flex mx-auto space-x-2 text-center">
                                        <p className="font-bold">Description:</p>
                                        {profile && profile.profile_description ?
                                            <>
                                                <p>{profile.profile_description}</p>
                                            </>
                                            :
                                            <>
                                                <p>{'Write Something about Yourself'}</p>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 bg-sky-200 text-slate-800 p-2">
                                <h3 className="border-b border-gray-300 flex mx-2 text-lg">
                                    <p className="flex-1">Personal Details</p>
                                    <button onClick={() => setEditUser(!editUser)} className="font-semibold underline text-sky-600 hover:text-sky-400 transition delay-100">Edit</button>
                                </h3>
                                <div className="flex text-sm text-slate-700 space-x-4 py-2 text-left mx-2">
                                    <p className="flex-1"><span className="font-bold">First Name:</span> {user.first_name}</p>
                                    {user.last_name && 
                                        <p className="flex-1"><span className="font-bold">Last Name:</span> {user.last_name}</p>
                                    }
                                    <p className="flex-1"><span className="font-bold">Email:</span> {user.email}</p>
                                    {user.cellphone && 
                                        <p className="flex-1"><span className="font-bold">Cellphone:</span> {user.cellphone}</p>
                                    }
                                </div>
                                <div className="flex text-sm text-slate-700 space-x-4 py-2 text-left mx-2">
                                    {user.address && 
                                        <p className="flex-1"><span className="font-bold">Address:</span> {user.address}</p>
                                    }
                                </div>
                                <div className="flex text-sm text-slate-700 space-x-4 py-2 text-left mx-2">
                                    {user.city && 
                                        <p className="flex-1"><span className="font-bold">City:</span> {user.city}</p>
                                    }
                                    {user.city && 
                                        <p className="flex-1"><span className="font-bold">Country:</span> {user.country}</p>
                                    }
                                </div>
                            </div>

                        </div>
                        }

                    {(role == 'Customer') &&
                    <div className="py-4 my-2">
                        <h3 className="flex font-semibold text-lg pt-4">Recent Orders (Latest 5)</h3>
                        <div className="flex bg-white overflow-hidden shadow-sm space-x-2 w-full">
                            
                            <div className="flex-1 h-full">
                                <table className="table-auto border-separate border-spacing-y-4 text-center w-full h-full text-md">
                                    <thead>
                                        <tr className="bg-gray-700/90 text-white">
                                            <td>Tracking #</td>
                                            <td>Placed On</td>
                                            <td>Completed On</td>
                                            <td>Items</td>
                                            <td>Price($)</td>
                                            <td>Quantity</td>
                                            <td>Payment</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders &&
                                            orders.map((order, i)=>{
                                            let completion
                                            if(order.completion_date) completion = new Date(order.completion_date)
                                            let initiate = new Date(order.initiate_date)
                                            return <>
                                                <tr key={i} className="odd:bg-slate-200 odd:py-4 text-slate-700">
                                                    <td>{order.tracking_id}</td>
                                                    <td>{initiate.getDate()+'-'+(initiate.getMonth()+1)+'-'+initiate.getFullYear()}</td>
                                                    <td>{order.completion_date ? order.completion_date : 'Not Completed'}</td>
                                                    <td>{order.projects.length}</td>
                                                    <td>{order.total_price}</td>
                                                    <td>{order.total_quantity}</td>
                                                    <td>{order.paid ? 'Paid' : 'Payment Pending'}</td>
                                                </tr>
                                            </>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    }

                    {(role == 'Admin') &&<>
                        <div className="flex flex-row flex-wrap bg-white overflow-hidden pt-4 space-x-2 w-full">
                            <div className="flex-1 w-full h-auto drop-shadow-lg bg-red-700/90 text-white text-center p-3">
                                <h2 className="font-bold text-mg">Total Orders</h2>
                                <div className="border-b border-gray-200 text-4xl py-2 px-3">{props.orders.length}</div>
                                <div className="flex text-left text-md pt-3">
                                    <p className="flex-1">Incomplete: </p>
                                    <p className="flex-initial text-right px-2">{props.incompleteOrders.length}</p>
                                </div>
                            </div>
                            <div className="flex-1 w-full h-auto drop-shadow-lg bg-green-700/90 text-white text-center p-3">
                                <h2 className="font-bold text-md">Blog Posts</h2>
                                <div className="border-b border-gray-200 text-4xl py-2 px-3">{props.posts.length}</div>
                                <div className="flex text-left text-md pt-3">
                                    <p className="flex-1">Unpublished: </p>
                                    <p className="flex-initial text-right px-2">{props.unpublishedPosts.length}</p>
                                </div>
                            </div>
                            <div className="flex-1 w-full h-auto drop-shadow-lg bg-cyan-700/90 text-white text-center p-3">
                                <h2 className="font-bold text-md">Comments</h2>
                                <div className="border-b border-gray-200 text-4xl py-2 px-3">{props.comments.length}</div>
                                <div className="flex text-left text-md pt-3">
                                    <p className="flex-1">Unapproved: </p>
                                    <p className="flex-initial text-right px-2">{props.unapprovedComments.length}</p>
                                </div>
                            </div>
                            <div className="flex-1 w-full h-auto drop-shadow-lg bg-gray-700/90 text-white text-center p-3">
                                <h2 className="font-bold text-md">Customers</h2>
                                <div className="border-b border-gray-200 text-4xl py-2 px-3">{props.customers.length}</div>
                                <div className="flex text-left text-md pt-3">
                                    <p className="flex-1">Commentators: </p>
                                    <p className="flex-initial text-right px-2">{props.commentators.length}</p>
                                </div>
                            </div>
                        </div>

                            
                    </>}
                    
                    <div id="chart" className={`${role!='Admin' ? 'hidden': ''} flex py-2 mt-3`}></div>
                    
                    
                </div>
            </section>
        </GeneralLayout>
    );
}
