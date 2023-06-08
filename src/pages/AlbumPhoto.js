import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const api = 'https://api.unsplash.com/photos';
const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS;

export default function AlbumPhoto() {
	const { id } = useParams();
	const [photo, setPhoto] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${api}/${id}?client_id=${accessKey}`);
			setPhoto(response.data);
		})();
	}, [id]);

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					navigate(-1);
				}}
			>
				回到上一頁
			</button>
			<h2 className="mt-3">這是單張圖片</h2>
			<br />
			<p>Description: {photo.description}</p>
			<img src={photo?.urls?.regular} className="img-fluid" alt="" />
		</div>
	);
}
