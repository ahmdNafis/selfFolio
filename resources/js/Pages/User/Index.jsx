import {Head, usePage, Link} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import {useState} from 'react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';
import {useAsync} from 'react-async';
import ChangeRole from '@/Pages/Role/ChangeRole';

const buttons = [
	{
		name: 'Remove',
		link: '/user/delete/',
	}
]

export default function Index({auth, props, users, roles, columns}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const [role, setRole] = useState(null)
	const [currentRole, setCurrentRole] = useState(null)
	const [roleVisible, setRoleVisibility] = useState(false)
	function changeUser(id, type) {
		Inertia.get('/user/change/'+id+'/'+type)
	}

	function changeRole(userId, currentRole) {
		setCurrentRole(currentRole)
		setRole(userId)
		setRoleVisibility(!roleVisible)
	}

	return (
		<GeneralLayout auth={auth}>
			<Head title="Users" />
			{(role && roleVisible) &&
				<ChangeRole auth={auth} existingRole={currentRole} roles={roles} userId={role} visibility={roleVisible} />
			}
			<section className="min-h-screen bg-white drop-shadow-xl p-10 min-h-screen max-h-full overflow-y-scroll overflow-x-hidden rounded-sm relative mx-auto space-y-4 justify-between">
				<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Users</h2>
				
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
						
						<div>
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
									<th className="px-2">Comments</th>
									<th className="px-2">Posts</th>
									<th className="px-2">Orders</th>
									<th className="px-2">Role</th>
									<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody>
								{users.length > 0 ?
									users.map(user => {
										
										return (
											<>
												<tr className="text-md font-medium odd:bg-slate-200 capitalize">
													<td>{user.id}</td>
													<td>{user.first_name}</td>
													<td>{user.last_name}</td>
													<td>{user.email}</td>
													<td><span className={`${!user.user_enabled ? 'bg-red-600/70 rounded-xs text-slate-50 px-2 py-1' : 'bg-green-600 rounded-xs text-slate-50 px-2 py-1'}`}>{user.user_enabled ? 'Active' : 'Inactive'}</span></td>
													<td><span className={`${user.comments != null && user.comments.length == 0 ? 'bg-yellow-400 p-2' : 'bg-green-600 text-slate-50 p-2'}`}>{user.comments.length}</span></td>
													<td><span className={`${user.posts != null && user.posts.length == 0 ? 'bg-yellow-400 p-2' : 'bg-green-600 text-slate-50 p-2'}`}>{user.posts.length}</span></td>
													<td><span className={`${user.orders != null && user.orders.length == 0 ? 'bg-yellow-400 p-2' : 'bg-green-600 text-slate-50 p-2'}`}>{user.orders != null ? user.orders.length : '0'}</span></td>
													<td>{(user.role != null) &&user.role.role_title+((!user.role.role_activity)? ' (Inactive)' : '')}</td>
													<td className="flex justify-between">
														<Link className={`flex-1 transition delay-50 
																${user.user_enabled ? 
																	'bg-red-500/80 hover:bg-red-600' : 
																	'odd:bg-sky-500 bg-sky-500 hover:bg-sky-600 odd:hover:bg-sky-600'} 
																	text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100`} 
																onClick={() => changeUser(user.id, user.user_enabled)}
														 		as="button" 
														 		type="button">{user.user_enabled ? 'Disable' : 'Enable'}</Link>
														 <button className="flex-1 transition delay-50 bg-stone-500 hover:bg-zinc-600
																text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100"
																onClick={() => changeRole(user.id, user.role.role_title)}
														 		type="button">Change</button>
														<Button model={user.comments} attributes={buttons} id={user.id} />
													</td>
												</tr>
											</>
											);
									})
									:
									<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Users not present'}</p>	
								}
							</tbody>
						</table>
						</div>
			</section>
		</GeneralLayout>
	);
}