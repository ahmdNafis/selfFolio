import {Head, Link, usePage} from '@inertiajs/inertia-react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';
import NewProject from '@/Pages/Project/NewProject';
import EditProject from '@/Pages/Project/EditProject';
import ShowProject from '@/Pages/Project/ShowProject';
import {Inertia} from '@inertiajs/inertia';
import {useState, useEffect} from 'react';

const buttons = [
	{
		name: 'Remove',
		link: '/project/delete/',
	}
]

export default function Index({props, auth, projects, columns, categories}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const [newVisible, setNewVisibility] = useState(false)
	const [projectId, setProjectId] = useState(false)
	const [projectView, setProjectView] = useState(null)
	const [showProject, setShowProject] = useState(false)

	function projectDisplay(project) {
		let proj = project 
		setProjectView(proj)
		setShowProject(!showProject)
	}

	function changeProject(id, type) {
		Inertia.get('/project/change/'+id+'/'+type)
	}
	return (
		<GeneralLayout auth={auth}>
			<Head title="Projects" />
			{newVisible && 
				<NewProject visibility={newVisible} categories={categories} />
			}
			{projectId &&
				<EditProject key={projectId} categories={categories} id={projectId}/>
			}		
			{(showProject && projectView) &&
				<ShowProject project={projectView} visibility={showProject} /> 
			}				
			<section className="z-10 relative z-10 bg-white drop-shadow-xl p-10 min-h-screen max-h-full overflow-y-scroll overflow-x-hidden rounded-sm mx-auto space-y-4 justify-between">

				<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Projects</h2>
				
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
								<p>New Project</p>
							</button>

						<div>
							<table className="table-auto text-center">
							<thead>
								<tr className="text-lg capitalize">
								{
									columns.map(column => {
										let exclude = ['project_description', 'image_url', 'price', 'project_link']
										return (
											<>
												{!exclude.includes(column) &&
												<th className="px-2">{column.split('_').join(' ')}</th>	
												}
											</>
											);
									})
								}
								<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody>
								{projects.length > 0 ?
									projects.map(project => {
										return (
											<>
												<tr className="text-md font-medium odd:bg-slate-200">
													<td>{project.id}</td>
													<td>{project.project_title}</td>
													<td><span className={`${!project.project_published ? 'bg-red-600/70 ' : 'bg-green-600 '} rounded-xs text-slate-50 px-2 py-1`}>{project.project_published ? 'Published' : 'Unpublished'}</span></td>
													
													<td className="flex justify-between">
														<Link className={`flex-1 transition delay-50 
																${project.project_published ? 
																	'bg-red-500/80 hover:bg-red-600' : 
																	'odd:bg-sky-500 bg-sky-500 hover:bg-sky-600 odd:hover:bg-sky-600'} 
																	text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100`} 
																onClick={() => changeProject(project.id, project.project_published)}
														 		as="button" 
														 		type="button">{project.project_published ? 'Unpublish' : 'Publish'}</Link>
														 <button className="flex-1 transition delay-50 bg-blue-700/70 hover:bg-blue-600
																text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100"
																onClick={() => projectDisplay(project)}
														 		type="button">Show</button>
														 <button className="flex-1 transition delay-50 bg-zinc-500 hover:bg-zinc-600
																text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100"
																onClick={() => setProjectId(project.id)}
														 		type="button">Edit</button>
														 	
														<Button model={project.project_category} attributes={buttons} id={project.id} /></td>
												</tr>
												
											</>
											);
									})
									:
									<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Projects not present'}</p>	
								}
							</tbody>
						</table>
						</div>
			</section>
		</GeneralLayout>
	);
}