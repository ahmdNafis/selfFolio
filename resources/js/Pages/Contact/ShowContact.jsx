import {Head, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';
import {useAsync} from 'react-async';

const getContact = async ({id, signal}) => {
		const response = await fetch(`/contact/show/${id}`, {signal})
		if(!response.ok) throw new Error(response.statusText)
		//console.log(response.json())
		return response.json()
	}

export default function ShowContact({props, contactId}) {
	const [visible, setVisibility] = useState(true)
	const {data, error, isPending} = useAsync({promiseFn: getContact, id: contactId})
	if(isPending) return <>
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex py-10">
				<div className="bg-white w-3/5 mx-auto h-auto px-8 py-5 my-7 border-b border-slate-300 rounded-sm">
					{'Loading....'}
				</div>
			</div>
		</section>
	</>
	if(error) return `Error: ${error.message}`
	if(data) 
		return <>
			{visible && 
				<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
					<div className="relative flex py-10">
						<div className="bg-white w-3/5 mx-auto h-auto px-8 py-5 my-7 border-b border-slate-300 rounded-sm">
							<h1 className="flex font-bold text-2xl text-slate-800 border-b border-slate-300 text-center">
								<button 
									onClick={() => setVisibility(!visible)}
									className="rounded-md p-2 my-1 flex-none transition delay-50 hover:border hover:border-gray-200 hover:text-slate-400 h-full"
									type="button">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.0" stroke="currentColor" class="w-7 h-7">
										<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
								<p className="flex-1 py-2 my-1">{'(ID: '+data.contact.id+') '+data.contact.message_title}</p>
								
							</h1>
							<span className="flex font-semibold text-md py-2 text-slate-600/90 border-b">
								<p className="text-center flex-1">{'From: '+data.contact.name+' < '+data.contact.email+' > '+data.contact.cellphone}</p>
								<p className="text-right flex-none">{data.contact.submission_date}</p>
							</span>
							<p className="text-justify text-lg py-2">{data.contact.message_body}</p>
						</div>
					</div>
				</section>
			}
		</>
}