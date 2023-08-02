import {Head, Link, usePage} from '@inertiajs/inertia-react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';
import NewProjectCategory from '@/Pages/ProjectCategory/NewProjectCategory'
import EditProjectCategory from '@/Pages/ProjectCategory/EditProjectCategory'
import {Inertia} from '@inertiajs/inertia';
import {useState, useEffect} from 'react';

const buttons = [
	{
		name: 'Remove',
		link: '/projectCategory/delete/',
	}
]

export default function Index({props, auth, categories, columns}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const [newVisible, setNewVisibility] = useState(false)
	const [categoryId, setCategoryId] = useState(false)
	function changeProjCategory(id, type) {
		Inertia.get('/projectCategory/change/'+id+'/'+type)
	}
	return (
		<GeneralLayout auth={auth}>
			<Head title="Project Categories" />
			{newVisible && 
				<NewProjectCategory visibility={newVisible} />
			}
			{categoryId &&
				<EditProjectCategory key={categoryId} id={categoryId}/>
			}						
			<section className="min-h-screen max-h-full overflow-y-scroll overflow-x-hidden relative z-10 bg-white drop-shadow-xl p-10 rounded-sm mx-auto space-y-4 justify-between">

				<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Project Categories</h2>
				
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
						
							<button onClick={() => setNewVisibility(!newVisible)} type="button" className="transition delay-50 rounded-r-sm bg-slate-700 hover:bg-slate-500 text-slate-100  hover:text-slate-200 text-xl font-medium px-4 py-2">
								<p>New Category</p>
							</button>

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
									<th className="px-2">Projects</th>
									<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody>
								{categories.length > 0 ?
									categories.map(category => {
										return (
											<>
												<tr className="text-md font-medium odd:bg-slate-200">
													<td>{category.id}</td>
													<td>{category.project_category_title}</td>
													<td>{category.project_category_description}</td>
													<td><span className={`${!category.project_category_enabled ? 'bg-red-600/70 rounded-xs text-slate-50 px-2 py-1' : 'bg-green-600 rounded-xs text-slate-50 px-2 py-1'}`}>{category.project_category_enabled ? 'Enabled' : 'Disabled'}</span></td>
													<td><span className={`${category.projects != null && category.projects.length == 0 ? 'bg-yellow-400 p-2' : 'bg-green-600 text-slate-50 p-2'}`}>{category.projects != null ? category.projects.length : '0'}</span></td>
													<td className="flex">
														<Link className={`w-full transition delay-50 
																${category.project_category_enabled ? 
																	'bg-red-500/80 hover:bg-red-600' : 
																	'odd:bg-sky-500 bg-sky-500 hover:bg-sky-600 odd:hover:bg-sky-600'} 
																	text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100`} 
																onClick={() => changeProjCategory(category.id, category.project_category_enabled)}
														 		as="button" 
														 		type="button">{category.project_category_enabled ? 'Disable' : 'Enable'}</Link>
														 <button className="w-full transition delay-50 bg-zinc-500 hover:bg-zinc-600
																text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100"
																onClick={() => setCategoryId(category.id)}
														 		type="button">Edit</button>
														 	
														<Button model={category.projects} attributes={buttons} id={category.id} /></td>
												</tr>
												
											</>
											);
									})
									:
									<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Project Categories not present'}</p>	
								}
							</tbody>
						</table>
						</div>
			</section>
		</GeneralLayout>
	);
}