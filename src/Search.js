import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends React.Component {

	state = {
		books: [],
		searchTerm: '',
	}

	fetchbooks = () => {
		BooksAPI.getAll().then(b => this.setState({books: b}))
		return this.state.books
	}

	query = (queryString) =>  {
		this.setState({ searchTerm: queryString })
		BooksAPI.search(queryString, 20).then(newBooks => this.setState({ books: newBooks}))
	}

	booksAreValid = (books) => {
		if (books == null || books.constructor !== Array) {
			return []
		}
		else { 
			return books
		}
	}
	render = () => (
		<div className="search-books">
			<div className="search-books-bar">
				<Link 
					className="close-search"
					to='/'
				></Link>
				<div className="search-books-input-wrapper">
				<input type="text"
					placeholder="Search by title or author"
					value={this.state.searchTerm}
					onChange={(event) => this.query(event.target.value)}/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">

				{
					this.booksAreValid(this.state.books).map((book, index) => (
					<li key={index}>
						<Book details={{ book }} updateBook={this.props.updateBook}/>
					</li>
					))
				}

				</ol>
			</div>
		</div>
	)
}

export default Search