import {Head, Link, usePage} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import axios from 'axios';
import {React, ReactDOM, useState, useEffect} from 'react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';
import Ratings from '@/Components/Ratings';

const buttons = [
	{
		name: 'Remove',
		link: '/role/delete/',
	}
]

export default function Index({props, auth, orders, columns}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const [role, setRole] = useState('')
	const [optionKey, setOptionKey] = useState(null)
	const stages = ['pending', 'accepted', 'under discussion', 'processing', 'delivered', 'declined']
	
	if(auth != null) {
		axios.get(`/role/search/${auth.user.role_id}`).then((res) => {
			setRole(res.data.role.role_title)
		})
	}

	function openOption(i) {
		setOptionKey(i)
		if(optionKey != null && i == optionKey) setOptionKey(null)
	}
	
	function changeStage(id, stage) {
		Inertia.get('/order/change/'+id+'/'+stage)
	}
	return (
		<GeneralLayout auth={auth}>
			<Head title="Orders" />
			<section className="bg-white drop-shadow-xl min-h-screen overflow-x-hidden overflow-y-scroll max-h-full p-10 rounded-sm  mx-auto space-y-4 justify-between">
			
				<h2 className="w-full flex text-left text-2xl text-zinc-500 border-b border-slate-300 mt-3 mb-10 font-bold">
					<div className="flex-none">
						<Link preserveState href={route('dashboard')} className="transition delay-100 text-slate-500 hover:text-slate-900 flex-none text-md font-bold">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className="w-7 h-7">
								  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
								</svg>
						</Link>	
					</div>
					
					<div className="flex-1 ml-5 pb-2">
						<p>My Orders</p>	
					</div>
					
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
						
						{(role == 'Admin') &&
						<div className="h-full">
							<table className="table-auto text-center">
							<thead>
							
								<tr className="text-lg capitalize">
								{
									columns.map(column => {
										return (
											<>
												<th className="px-2">{column.split('_').join(' ')}</th>	
											</>
											);
									})
								}
									<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody className="tracking-wide leading-loose text-slate-800 space-y-4">
								{orders.length > 0 ?
									orders.map((order, i) => {
										let payment = null
										if(order.payment_date) payment = new Date(order.payment_date)
										return (
											<>
												<tr key={i} className="text-md font-medium odd:bg-slate-200">
													<td>{order.id}</td>
													<td>{order.initiate_date}</td>
													<td>{!order.completion_date ? 
															<p className="text-white bg-orange-600/70 rounded-xs">{'Not Present'}</p>
															: order.completion_date
														}
														</td>
													<td>{order.tracking_id}</td>
													<td><p className={
														`bg-gray-400 text-white font-normal 
														 ${(order.tracking_stage == 'accepted' || order.tracking_stage == 'delivered') && 'bg-green-700/70 '} 
														 ${order.tracking_stage == 'declined' && 'bg-red-700/70 '}
														 ${order.tracking_stage == 'processing' && 'bg-orange-700/60 '}
														`
													}>{order.tracking_stage}</p></td>
													<td>{order.total_price}</td>
													<td>{order.total_quantity}</td>
													<td className={`${order.paid ? 'bg-green-700/80' : 'bg-red-700/80'} text-white px-3 border-b border-slate-300`}>{order.paid ? 'Paid' : 'Pending'}</td>
													<td>{order.payment_date ? 
														<>{payment.getDate()+'-'+(payment.getMonth()+1)+'-'+payment.getFullYear()}</>
														: <p className="text-white bg-orange-600/70 rounded-xs">{'Not Present'}</p>
													}</td>
													<td className="relative pl-4">
														<button className="relative flex z-10 bg-sky-300 px-4 space-x-2" key={i} onClick={() => openOption(i)}>
															<div className="flex-1">Options</div>
															<div className="flex-1 py-2">
															<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
															  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
															</svg>
															</div>
														</button>
													{(optionKey == i) && 
														<div className="absolute z-40 drop-shadow-md bg-sky-800 font-medium text-white w-40">
															<ul className="capitalize space-y-1 leading-loose"> 
																{
																	stages.map((stage, k) => {
																		return <>
																			{(order.tracking_stage != stage) && 
																				<li key={k} className="cursor-pointer transition delay-100 hover:bg-zinc-300 hover:text-black"><button className="capitalize" onClick={() => changeStage(order.id, stage)}>{stage}</button></li>
																			}
																		</>
																	})
																}
															</ul>
														</div>
													}
													</td>
												</tr>
											</>
											);
									})
								:
								<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Orders not present'}</p>	
								}
							</tbody>
						</table>
						</div>
						}
						{(role == 'Customer') &&
						<div className="relative grid grid-cols-2 p-1 w-full h-auto">
							{(orders.length > 0) ? 
								
								orders.map((order, id) => {
									let payment
									if(order.payment_date != null) payment = new Date(order.payment_date)
									return (
										<div className="m-2">
											<div key={id} className="h-auto w-full bg-slate-200/70 p-3">
												<div className="flex border-b border-gray-400 py-2">
													<span className="flex-1">
													<h2 className="text-sky-600 font-semibold text-left text-md ">Tracking ID: {order.tracking_id}</h2>
													<p className="text-slate-600 text-sm text-left tracking-tight">Placed on: <span className="font-semibold">{order.initiate_date}</span></p>
													</span>
													{!order.paid ?<> 
														<span className="flex-none py-2 underline">
															<Link href={route('order.pay', {orderId: order.id})} className="text-md font-semibold text-blue-800 hover:text-blue-500">Pay with Paypal</Link>
														</span>
														</>
														:<>
														<span className="flex-none py-2">
															<p className="text-sm font-semibold text-teal-600">Paid on: {'0'+payment.getDate() +'-0'+(payment.getMonth()+1)+'-'+payment.getFullYear()}</p>
														</span>
														</>
													}
												</div>
												<div className="flex py-2">
													<p className="flex-1 text-slate-600 text-sm">Total Quantity: {order.total_quantity}</p>
													<p className="flex-1 text-slate-600 text-sm text-right font-semibold">Total Price: ${order.total_price}</p>
												</div>
												<ul className="space-y-8">
													{
														order.projects.map((project, id) => {
															return <>
																<li key={id} className="my-2 text-justify">
																	<span className="flex text-slate-800 border-b border-slate-300 text-sm tracking-wide text-left capitalize">
																		<h3 className="w-2/3 font-semibold text-left">{project.project_title}</h3>
																		<p className="w-1/3">Quantity: {project.pivot.quantity}</p>
																		<p className="w-1/3 text-right">${(project.price*project.pivot.quantity).toFixed(2)}</p>
																	</span>
																	<span className="flex space-x-5 text-xs">
																		<img src={window.location.origin+'/'+project.image_url} className="flex-none transition delay-150 h-20 w-20 my-2 outline outline-1 outline-gray-400 object-scale-down" />
																		<span className="py-5 flex-auto"><span className={`px-3 rounded-sm p-1 font-semibold ${(order.tracking_stage == 'accepted' || order.tracking_stage == 'delivered') ? ' bg-green-700/80 text-white ' : ' text-gray-700 bg-gray-300 '} ${order.tracking_stage == 'declined' && ' bg-red-800/70 text-white '}
																		`}>{order.tracking_stage}</span></span>
																		<p className="text-justify p-4 flex-auto">Delivered on: <span className={`font-semibold ${order.completion_date != null && 'underline '}`}>{order.completion_date ? order.completion_date : 'Not Present'}</span></p>
																	</span>
																	<div className="pt-2 flex font-semibold">
																		<p>Rate Your Experience: </p>
																		<div className="flex flex-row flex-wrap px-1">
																			<Ratings auth={auth} project={project} orderId={order.id} limit={5}/>
																		</div>
																	</div>
																</li>
															</>
														})
													}
												</ul>
												<div>
													{order.notes}
												</div>
											</div>
										</div>
									);
								})
								
								:
								<p className="font-semibold text-lg text-center">You have no Orders</p>
							}
						</div>
						}
						
			</section>
		</GeneralLayout>
	);
}