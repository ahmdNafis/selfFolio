import VisitorLayout from '@/Layouts/VisitorLayout';
import {Head, useForm, Link, usePage} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function NewContact({props, auth}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        message_title: '',
        name: '',
        cellphone: '',
        message_body: '',
    });
	function submit(e) {
		e.preventDefault()
		post(route('contact.store'))
	}
	return <>
		<VisitorLayout auth={auth}>
		<Head>
			<title>{'Contact Me'}</title>
			<meta name="description" content="A visitor to this portfolio website can send a message to the developer or write about their proposal in the given input fields." />
		</Head>
		<section className="bg-slate-50 px-3 mx-3 h-auto sm:px-4 md:px-7 leading-10">
			<div className="relative px-4 py-2 my-2">
				<form onSubmit={submit}>
					<h2 className="text-center text-2xl text-zinc-500 mt-6 font-bold">Drop Your Proposal</h2>
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
					<div className="py-3">
						<div className="flex mb-3 space-x-3">
							<div className="flex-1 flex space-x-3">
								<div className="flex-1">
									<label htmlFor="message_title" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Subject <span className="text-red-500">*</span></label>
									<input 
										id="message_title" 
										type="text" 
										value={data.message_title} 
										onChange={e => setData('message_title', e.target.value)} 
										className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-900 text-md placeholder-slate-300" 
										placeholder="Enter Specific Subject" />
									{errors.message_title && 
										<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.message_title}</span>
									}
								</div>
								<div className="flex-1">
									<label htmlFor="email" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Email <span className="text-red-500">*</span></label>
									<input 
										id="email" 
										type="email" 
										value={data.email} 
										onChange={e => setData('email', e.target.value)} 
										className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-900 text-md placeholder-slate-300" 
										placeholder="Please Provide Valid Email Address" />
									{errors.email && 
										<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.email}</span>
									}
								</div>
								<div className="flex-1">
									<label htmlFor="name" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Name <span className="text-red-500">*</span></label>
									<input 
										id="name" 
										type="text" 
										value={data.name} 
										onChange={e => setData('name', e.target.value)} 
										className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-900 text-md placeholder-slate-300" 
										placeholder="Enter Full Name" />
									{errors.name && 
										<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.name}</span>
									}
								</div>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="message_body" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Message Body <span className="text-red-500">*</span></label>
							<textarea 
								id="message_body" 
								type="text" 
								value={data.message_body} 
								onChange={e => setData('message_body', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-900 text-md placeholder-slate-300" 
								placeholder="Write About Your Proposal"
								rows="15">
							</textarea>
							{errors.message_body && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.message_body}</span>
							}
						</div>
						<div className="flex relative mx-auto text-center pb-2">
							<Link href="/" className="flex-1 transition delay-50 px-4 py-2 text-lg font-semibold bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back to Home</Link>
							<button disabled={processing} className="flex-1 transition delay-50 px-4 py-2 text-lg font-semibold bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Submit Proposal</button>
						</div>
					</div>
				</form>
			</div>
		</section>	
		</VisitorLayout>	
	</>
}