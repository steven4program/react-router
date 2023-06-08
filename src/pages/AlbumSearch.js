import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import List from '../components/List';

const api = 'https://api.unsplash.com/photos';
const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS;

export default function AlbumSearch() {
	const [search, setSearch] = useState('');
	const [list, setList] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();

	// useEffect(() => {
	// 	// console.log(searchParams.get('query'));
	// 	setSearchParams({ query: 'building' });
	// }, []);

	useEffect(() => {
		if (search !== '') {
			(async () => {
				const response = await axios.get(
					`${api}?client_id=${accessKey}&query=${search}`
				);
				const { data } = response;
				setList(data);
			})();
		}
	}, [search]);

	useEffect(() => {
		setSearch(searchParams.get('query'));
	}, [searchParams]);

	return (
		<>
			這是搜尋頁面 {search}
			<input
				type="text"
				className="form-control"
				defaultValue={search}
				onKeyUp={(e) => {
					if (e.code === 'Enter') {
						// setSearch(e.target.value);
						setSearchParams({ query: e.target.value });
					}
				}}
			/>
			<List list={list} />
		</>
	);
}
