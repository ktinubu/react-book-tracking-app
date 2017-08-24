import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import shelfState from './constants'


const MyReads = ({ myBooks: {currentlyReading, wantToRead, read}, updateBook}) => (
	<div className="list-books">
		<div className="list-books-title">
			<h1>MyReads</h1>
		</div>
		<div className="list-books-content">
			<BookShelf title={'Currently Reading'} books={currentlyReading} updateBook={updateBook} shelfId={shelfState.CURRENTLY_READING}></BookShelf>
						<BookShelf title={'Want to Read'} books={wantToRead} updateBook={updateBook} shelfId={shelfState.WANT_TO_READ}> </BookShelf>
						<BookShelf title={'Read'} books={read} updateBook={updateBook} shelfId={shelfState.READ}></BookShelf>
		</div>
		<div className="open-search">
			<Link to='search'>Add a book</Link>
		</div>
	</div>
)
export default MyReads
