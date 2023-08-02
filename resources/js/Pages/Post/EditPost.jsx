import {Image, useState} from 'react';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import GeneralLayout from '@/Layouts/GeneralLayout';


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function EditPost({posts, auth, categories}) {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
	const {data, setData, post, progress, processing, errors} = useForm({
		published_date: posts.published_date,
		heading: posts.heading,
		description: posts.description,
		body: posts.body,
		image_url: posts.image_url,
		blog_category_id: posts.category.id,
		caption: posts.caption,
	})
	function submit(e) {
		if(data.body != null) data.body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
		e.preventDefault()
		post('/post/update/'+posts.id)
	}

	let date=new Date(data.published_date)
	return (
		<GeneralLayout auth={auth}>
			<Head title={"Editing Post: " + posts.id}/>
			<section className="relative grid grid-cols-2 items-center justify-center h-full">
				<div className="">
				<form onSubmit={submit} className="bg-white drop-shadow-xl w-full h-auto rounded-sm px-10 py-5">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold capitalize">Edit Post {'('+posts.id+')'}: {posts.heading}</h2>
					<div className="py-3">
						<div className="flex mb-3 space-x-3">
							<div className="flex-1">
								<label htmlFor="heading" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Heading</label>
								<input 
									id="heading" 
									type="text" 
									value={data.heading} 
									onChange={e => setData('heading', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
									placeholder="Enter Heading" />
								{errors.heading && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.heading}</span>
								}
							</div>
							<div className="flex-none">
							<label htmlFor="published_date" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Publishing Date</label>
							<input 
								id="published_date" 
								type="date" 
								value={data.published_date} 
								onChange={e => setData('published_date', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Date" />
							{errors.published_date && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.published_date}</span>
							}
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Description</label>
							<textarea 
								id="description" 
								type="text" 
								value={data.description} 
								onChange={e => setData('description', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Description"
								rows="3">
							</textarea>
							{errors.description && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.description}</span>
							}
						</div>
						<div className="mb-3">
							<label htmlFor="body" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Body</label>
							<Editor 
								wrapperClassName={'h-96 overflow-y-scroll'}
								editorClassName={`transition delay-50 w-full px-3 appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-100 focus:border-gray-700 ring-none bg-slate-200 text-slate-800 text-md placeholder-slate-500`}
								editorState={editorState} 
								spellcheck={true}
								onEditorStateChange={setEditorState}
								placeholder={'Write something'}
								 />
							{errors.body && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.body}</span>
							}
						</div>
						<div className="flex mb-3 space-x-3">
							<div className="flex-1">
								<label htmlFor="blog_category_id" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Change Category</label>
								<select
									id="blog_category_id"
									onChange={e => setData('blog_category_id', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md text-center placeholder-slate-50">
									<option value={posts.category.id}>{posts.category.blog_category_title}</option>
									{
										categories.map((category, i) => {
											return <>
												<option key={i} value={category.id}>{category.blog_category_title}</option>
											</>
										})
									}
								</select>
								{errors.blog_category_id && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.blog_category_id}</span>
								}
							</div>
							<div className="flex-1">
							<label htmlFor="image_url" className="block border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Re-Upload Image</label>
							<input 
								id="image_url" 
								type="file"
								name="image_url" 
								onChange={e => setData('image_url', e.target.files[0])} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md py-1 placeholder-slate-50 block" 
								placeholder="Upload Image" />
							{progress && (
						      <progress value={progress.percentage} max="100">
						        {progress.percentage}%
						      </progress>
						    )}
							{errors.image_url && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.image_url}</span>
							}
							</div>
							<div className="flex-1">
								<label htmlFor="caption" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Image Caption <span className="text-red-500">*</span></label>
									<input 
										id="caption" 
										type="text" 
										value={data.caption} 
										onChange={e => setData('caption', e.target.value)} 
										className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-200 text-md placeholder-slate-300" 
										placeholder="Enter Image Caption" />
									{errors.caption && 
										<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.caption}</span>
									}
							</div>
						</div>
						<div className="flex relative mx-auto text-center pb-2 pt-3">
							<Link href="/posts" className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Update</button>
						</div>
					</div>
				</form>
				</div>
				<div className="bg-white ml-2 drop-shadow-xl w-auto px-10 text-justify py-5 leading-normal">
					<h1 className="text-center font-bold text-2xl text-slate-600 border-b border-slate-300 mb-3">{data.heading}</h1>
					<span className="capitalize font-semibold italic text-right text-slate-600 border-b border-slate-300">{date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()+' | '+data.blog_category_id}</span>
					{posts.image_url &&
						<img
						src={window.location.origin+'/'+data.image_url}
						className="object-cover rounded-sm my-2 p-2 w-auto h-auto bg-gray-200"
					 	/>
					}
					<p className="font-normal text-md text-slate-600 border-t border-b border-slate-300 mb-5 py-2">{data.description}</p>
					<p className="text-ellipsis overflow-x-scroll font-normal text-lg text-slate-600 leading-8 mb-3" dangerouslySetInnerHTML={{ __html: data.body}}></p>
				</div>
			</section>
		</GeneralLayout>
	);
}