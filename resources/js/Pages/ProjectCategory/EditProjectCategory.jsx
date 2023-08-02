import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function EditProjectCategory({props, id}) {
	const [visible, setVisibility] = useState(true)
	const {data, setData, post, processing, errors} = useForm({
		project_category_title: '',
		project_category_description: '',
	})
	function submit(e) {
		e.preventDefault()
		post('/projectCategory/update/'+id, {
			onSuccess: () => setVisibility(!visible), 
		})
		
	}
	return <>
		{(visible || (errors.project_category_title != null || errors.project_category_description != null)) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<form className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Updating Category ID: {id}</h2>
					<div className="py-3">
						<div className="mb-3">
							<label htmlFor="project_category_title" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Title</label>
							<input 
								id="project_category_title" 
								type="text" 
								value={data.project_category_title} 
								onChange={e => setData('project_category_title', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Title" />
							{errors.project_category_title && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.project_category_title}</span>
							}
						</div>
						<div className="mb-3">
							<label htmlFor="project_category_description" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Description</label>
							<textarea 
								id="project_category_description" 
								type="text" 
								value={data.project_category_description} 
								onChange={e => setData('project_category_description', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Description"
								rows="5">
							</textarea>
							{errors.project_category_description && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.project_category_description}</span>
							}
						</div>
						<div className="relative mx-auto text-center pb-4">
							<Link onClick={() => setVisibility(!visible)} className="transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<Link onClick={(e) => submit(e)}  disabled={processing} className="transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Update</Link>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
	</>
}