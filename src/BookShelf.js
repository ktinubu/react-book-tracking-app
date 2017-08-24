import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Book'

const Bookshelf = ({ title, books, updateBook, shelfId}) => (
		<div>
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((book, index) => (
						<li key={index}>
							<Book details={{ book }} updateBook={updateBook} shelfId={shelfId}/>
						</li>
						))}
					</ol>
				</div>
			</div>
			<div className="open-search">
				<Link to='search'>Add a book</Link>
			</div>
		</div>
)
export default Bookshelf
