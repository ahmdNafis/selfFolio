import {Head, usePage, Link} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import {useState} from 'react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';
import Ratings from '@/Components/Ratings';
import {useAsync} from 'react-async';

const buttons = [
	{
		name: 'Remove',
		link: '/feedback/delete/',
	}
]

export default function Index({auth, props, feedbacks, columns}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	function changeFeedback(id, type) {
		Inertia.get('/feedback/change/'+id+'/'+type)
	}

	return (
		<GeneralLayout auth={auth}>
			<Head title="Feedbacks" />
			<section className="min-h-screen bg-white drop-shadow-xl p-10 rounded-sm relative mx-auto space-y-4 justify-between">
				<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Feedbacks</h2>
				
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
									<th className="px-2">Project</th>
									<th className="px-2">Order</th>
									<th className="px-2">User</th>
									<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody>
								{feedbacks.length > 0 ?
									feedbacks.map((feedback,i) => {
										let submission = new Date(feedback.submission_date)
										return (
											<>
												<tr key={i} className="text-md font-medium odd:bg-slate-200 space-x-5">
													<td>{feedback.id}</td>
													<td>{submission.getDate()+'-'+(submission.getMonth()+1)+'-'+submission.getFullYear()}</td>
													<td className="flex flex-row flex-wrap">
														<Ratings auth={auth} project={null} limit={feedback.rating} />
													</td>
													<td><span className={`${!feedback.feedback_approved ? 'bg-red-600/70 rounded-xs text-slate-50 px-2 py-1' : 'bg-green-600 rounded-xs text-slate-50 px-2 py-1'}`}>{feedback.feedback_approved ? 'Approved' : 'Pending'}</span></td>
													<td className="capitalize">{feedback.project.project_title}</td>
													<td className="text-blue-800">{feedback.order.tracking_id}</td>
													<td className="font-semibold">{feedback.user.email}</td>
													<td className="flex justify-between">
														<Link className={`flex-1 transition delay-50 
																${feedback.feedback_approved ? 
																	'bg-red-500/80 hover:bg-red-600' : 
																	'odd:bg-sky-500 bg-sky-500 hover:bg-sky-600 odd:hover:bg-sky-600'} 
																	text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100`} 
																onClick={() => changeFeedback(feedback.id, feedback.feedback_approved)}
														 		as="button" 
														 		type="button">{feedback.feedback_approved ? 'Reject' : 'Approve'}</Link>
														<Button attributes={buttons} id={feedback.id} />
													</td>
												</tr>
											</>
											);
									})
								
								:
								<>
									<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Feedbacks not present'}</p>	
								</>
								}
							</tbody>
						</table>
						</div>
			</section>
		</GeneralLayout>
	);
}