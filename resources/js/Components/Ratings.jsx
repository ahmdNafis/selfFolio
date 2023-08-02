import {useState, useEffect} from 'react';
import {Inertia} from '@inertiajs/inertia';
import axios from 'axios';

export default function Ratings({props, orderId, auth, project, limit}) {
	const [rating, setRating] = useState(null)
	const list = []
	if(project) {
		useEffect(() => {
			axios.get(`/feedback/searchRating/${auth.user.id}/${project.id}/${orderId}`).then((res) => {
				setRating(res.data.feedback)
			})
		})
	}

	if(!rating) {
		if(project) {
			
			for (let i = 1; i <= limit; i++) {
				list.push(<span onClick={() => Inertia.get('/feedback/rating/'+auth.user.id+'/'+project.id+'/'+i+'/'+orderId)} className="hover:text-orange-300/90 text-orange-500/90"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
					  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
					</svg></span>)
			}
			return list
		} else {
			for (let i = 1; i <= limit; i++) {
				list.push(<span className="hover:text-orange-300/90 text-orange-500/90"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
					  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
					</svg></span>)
			}
			return list
		}
	} else {
		if(rating.feedback_approved) {
			for (let i = 1; i <= rating.rating; i++) {
				list.push(<span className="text-gray-500/90"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
					  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
					</svg></span>)
			}
			return list
		} else {
			return <p className="font-medium text-sm px-2 bg-red-200 text-gray-600 pt-0.5">{'Approval Pending'}</p>
		}
	}
}