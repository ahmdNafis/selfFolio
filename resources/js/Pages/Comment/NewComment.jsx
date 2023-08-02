import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function NewComment({props, auth, visibility, blog}) {
	const [visible, setVisibility] = useState({visibility})
	const {data, setData, post, processing, errors} = useForm({
		first_name: '',
		email: '',
		subject: '',
		comment_body: '',
		post_id: blog.id,
	})
	
	function submit(e) {
		if(auth.user != null) {
			data.first_name = auth.user.first_name
			data.email = auth.user.email
		}
		e.preventDefault()
		post(route('comment.store'))
		setVisibility(!visible)
	}
	console.log(auth.user)
	return (<>
		{(visible || (errors.subject != null || errors.comment_body != null)) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-auto overflow-x-hidden overflow-y-scroll w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<form onSubmit={submit} className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">New Comment</h2>
					<div className="py-3">
					{!auth.user && 
						<div className="mb-3 flex space-x-2">
							<div className="flex-1">
								<label htmlFor="first_name" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">First Name <span className="text-red-500">*</span></label>
								<input 
									id="first_name" 
									type="text" 
									value={data.first_name} 
									onChange={e => setData('first_name', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
									placeholder="Enter First Name" />
								{errors.first_name && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.first_name}</span>
								}
							</div>
							<div className="flex-1">
								<label htmlFor="email" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Email <span className="text-red-500">*</span></label>
								<input 
									id="email" 
									type="text" 
									value={data.email} 
									onChange={e => setData('email', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
									placeholder="Enter Last Name" />
								{errors.email && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.email}</span>
								}
							</div>
						</div>
					}
						<div className="mb-3">
							<label htmlFor="subject" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Subject <span className="text-red-500">*</span></label>
							<input 
								id="subject" 
								type="text" 
								value={data.subject} 
								onChange={e => setData('subject', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Title" />
							{errors.subject && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.subject}</span>
							}
						</div>
						<div className="mb-3">
							<label htmlFor="comment_body" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Body <span className="text-red-500">*</span></label>
							<textarea 
								id="comment_body" 
								type="text" 
								value={data.comment_body} 
								onChange={e => setData('comment_body', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Description"
								rows="5">
							</textarea>
							{errors.comment_body && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.comment_body}</span>
							}
						</div>
						<div className="flex relative mx-auto text-center">
							<Link onClick={() => setVisibility(!visible)} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Create</button>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
	</>);
}