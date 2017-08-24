import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import shelfState from './constants'

function changeShelf(value, id, updateBook) {
	BooksAPI.get(id).then(book => BooksAPI.update(book, value)
		.then(newBooks => {
			updateBook(book, value)
		}))

}

const Book = ({ details: { book: {title='[no title]', authors=['[no author]'], imageLinks, id}}, updateBook, shelfId=shelfState.NONE}) => {
	const { CURRENTLY_READING, WANT_TO_READ, READ, NONE } = shelfState

	return (
	<div className="book">
		<div className="book-top">
			<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${imageLinks && imageLinks.smallThumbnail})` }}></div>
			<div className="book-shelf-changer">
				<select onChange={({target: {value}}) => changeShelf(value, id, updateBook) }>
					<option value="None" disabled >Move to...</option>
					<option value="currentlyReading" selected={shelfId === CURRENTLY_READING}>Currently Reading</option>
					<option value="wantToRead" selected={shelfId=== WANT_TO_READ}>Want to Read</option>
					<option value="read" selected={shelfId === READ}>Read</option>
					<option value="none" selected={shelfId === NONE}>None</option>
				</select>
			</div>
		</div>
		<div className="book-title">{title}</div>
		{authors && (authors.map((name, index) => {
					return <div key={index} className="book-authors">{name}</div>
				}))}
	</div>	
)}

export default Book;