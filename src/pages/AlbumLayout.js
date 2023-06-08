import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const api = 'https://api.unsplash.com/search/photos';
const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS;

export default function AlbumLayout() {
	const [list, setList] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${api}?client_id=${accessKey}&query=animal`
			);
			const { results } = response.data;
			setList(results);
		})();
	});

	return (
		<div className="row">
			<div className="col-4">
				左側選單列表
				{list.map((item) => {
					return (
						<li key={item.id}>
							<Link to={item.id}>{item.id}</Link>
						</li>
					);
				})}
			</div>
			<div className="col-8">
				<Outlet context={list} />
			</div>
		</div>
	);
}
