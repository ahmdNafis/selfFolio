import GeneralLayout from '@/Layouts/GeneralLayout';
import {Head, useForm, Link} from '@inertiajs/inertia-react';

export default function EditCategory({props, category}) {
	const {data, setData, post, processing, errors} = useForm({
		blog_category_title: category.blog_category_title,
		blog_category_description: category.blog_category_description,
		blog_category_activity: true,
	})

	function submit(e) {
		e.preventDefault()
		post('/blog_category/update/'+category.id)
	}

	return (
		<GeneralLayout>
			<Head title={`Editing Category ${category.id}`}/>
			<section className="relative flex h-screen overflow-hidden mx-auto p-5 items-center">
				<form onSubmit={submit} className="bg-white drop-shadow-xl w-96 rounded-sm px-10 py-4">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 mx-2 my-3 font-medium">Editing Category: <span className="block font-bold">{category.blog_category_title}</span></h2>
					<div className="py-3">
						<div className="mb-3">
							<label htmlFor="blog_category_title" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Edit Title</label>
							<input 
								id="blog_category_title" 
								type="text" 
								value={data.blog_category_title} 
								onChange={e => setData('blog_category_title', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-50 text-md placeholder-slate-50" 
								placeholder="Enter Title" />
							{errors.blog_category_title && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.blog_category_title}</span>
							}
						</div>
						<div className="mb-3">
							<label htmlFor="blog_category_description" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Edit Description</label>
							<textarea 
								id="blog_category_description" 
								type="text" 
								value={data.blog_category_description} 
								onChange={e => setData('blog_category_description', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-50 text-md placeholder-slate-50" 
								placeholder="Enter Description"
								rows="5">
							</textarea>
							{errors.blog_category_description && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.blog_category_description}</span>
							}
						</div>
						<div className="relative mx-auto text-center pb-4">
							<Link href="/blog_categories" className="transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Update</button>
						</div>
					</div>
				</form>
			</section>
		</GeneralLayout>
	);
} 