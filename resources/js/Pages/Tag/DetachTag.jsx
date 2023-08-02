import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function DetachTag({props, postId, tags}) {
	const [visible, setVisibility] = useState(true)
	const [tag, setTag] = useState([])
	const {data, setData, post, processing, errors} = useForm({
		tags: [],
	})

	function pushVals(val) {
		if(!tag.includes(val)) setTag([...tag, val])
		
	}

	function submit(e) {
		e.preventDefault()
		
		data.tags = tag
		post('/tag/detach/'+postId, {
			onSuccess: () => setVisibility(!visible), 
		})
		
	}
	return <>
		{(visible) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">

				<div className="flex w-auto h-auto mx-auto p-10">
					<form className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Detach Tags for Post ID: {postId}</h2>
					<p className="text-md text-slate-600 font-medium">{'Tags Chosen: '+tag+' '}</p>
					<div className="py-3">
						<div className="mb-3">
							<label htmlFor="tagId" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Tag Names<span className="text-red-500">*</span></label>
								<select
									multiple
									id="tagId"
									onChange={e => pushVals(e.target.value)} 
									name="tags[]"
									className="space-y-1 h-48 py-2 my-5 transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-lg font-semibold text-left placeholder-slate-50">
									
									{
										tags.map(tag => {

											return <>
												<option value={tag.id}>{tag.tag_name}</option>
											</>
										})
									}
								</select>
								{errors.tagId && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.tagId}</span>
								}
						</div>
						<div className="relative mx-auto text-center pb-4">
							<Link onClick={() => setVisibility(!visible)} className="transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<Link onClick={(e) => submit(e)}  disabled={processing} className="transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Remove</Link>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
	</>
}