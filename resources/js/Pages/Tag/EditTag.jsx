import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function EditTag({props, tagId}) {
	const [visible, setVisibility] = useState(true)
	const {data, setData, post, processing, errors} = useForm({
		tag_name: '',
	})
	
	function submit(e) {
		e.preventDefault()
		post('/tag/update/'+tagId)
		setVisibility(!visible)
	}

	return <>
		{(visible || errors.tag_name != null) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<form onSubmit={submit} className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Editing Tag ID:{tagId}</h2>
					<div className="py-3">
						<div className="mb-3">
							<label htmlFor="tag_name" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Name</label>
							<input 
								id="tag_name" 
								type="text" 
								value={data.tag_name} 
								onChange={e => setData('tag_name', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Name" />
							{errors.tag_name && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.tag_name}</span>
							}
						</div>
						<div className="relative mx-auto text-center pb-4">
							<Link onClick={() => setVisibility(!visible)} className="transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Update</button>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
	</>
}