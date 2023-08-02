import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function EditProfile({props, auth, visibility}) {
	const [visible, setVisibility] = useState({visibility})
	const {data, setData, post, processing, progress, errors} = useForm({
		avatar_link: null,
		profile_description: '',
		user_id: auth.user.id
	})
	
	function submit(e) {
		e.preventDefault()
		post(route('profile.exist.update'))
		setVisibility(!visible)
	}
	return <>
		{(visible || errors.profile_description != null) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<form onSubmit={submit} className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Editing {auth.user.first_name}'s Profile</h2>
					<div className="py-3">
						<div className="mb-3">
							<label htmlFor="profile_description" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Self Description</label>
							<textarea 
								id="profile_description" 
								type="text" 
								value={data.profile_description} 
								onChange={e => setData('profile_description', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300" 
								placeholder="Enter Description"
								rows="5">
							</textarea>
							{errors.profile_description && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.profile_description}</span>
							}
						</div>
						<div className="mb-3">
							<label htmlFor="avatar_link" className="block border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Upload Avatar</label>
							<input 
								id="avatar_link" 
								type="file"
								name="avatar_link" 
								onChange={e => setData('avatar_link', e.target.files[0])} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md py-1 placeholder-slate-200 block" 
								placeholder="Upload Avatar" />
							{progress && (
						      <progress value={progress.percentage} max="100">
						        {progress.percentage}%
						      </progress>
						    )}
							{errors.avatar_link && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.avatar_link}</span>
							}
						</div>
						<div className="relative flex mx-auto text-center pb-4">
							<Link onClick={() => setVisibility(!visible)} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Update</button>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
	</>
}