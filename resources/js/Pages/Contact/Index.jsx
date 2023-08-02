import {Head, usePage, Link} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import {useState} from 'react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';
import ShowContact from '@/Pages/Contact/ShowContact';

const buttons = [
	{
		name: 'Edit',
		link: '/contact/edit/'
	},
	{
		name: 'Remove',
		link: '/contact/delete/',
	}
]

export default function Index({props, auth, contacts, columns}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const [contact, setContactVisibility] = useState(false)
	return (
		<GeneralLayout auth={auth}>
			<Head title="Contacts" />
			{contact && 
				<ShowContact key={contact} contactId={contact} />
			}
			<section className="bg-white drop-shadow-xl p-10 rounded-sm relative mx-auto space-y-4 justify-between">
				<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Messages</h2>
				
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
									<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody>
								{contacts.length > 0 ?
									contacts.map(contact => {
										let date = new Date(contact.submission_date)
										return (
											<>
												<tr className="text-md font-medium odd:bg-slate-200">
													<td>{contact.id}</td>
													<td>{date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()}</td>
													<td>{contact.message_title}</td>
													<td>{contact.email}</td>
													<td className="flex justify-between">
														<button className="transition delay-50 bg-sky-500 hover:bg-sky-600
																text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100"
																onClick={() => setContactVisibility(contact.id)}
														 		type="button">Show</button>
														<Button attributes={buttons} id={contact.id} />
													</td>
												</tr>
											</>
											);
									})
								:
									<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Messages not present'}</p>	
								}
							</tbody>
						</table>
						</div>
			</section>
		</GeneralLayout>
	);
}