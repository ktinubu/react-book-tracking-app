import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search'
import MyReads from './MyReads'

class BooksApp extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
		showSearchPage: false,
		myBooks: {
			read: [],
			currentlyReading: [],
			wantToRead: []
			}
		}
	}

	booksToBuckets(books) {
		books.forEach(book => 
			this.setState(prevState => {
				return {
					...prevState, 
					myBooks: {
						...prevState.myBooks,
						[book.shelf]: prevState.myBooks[book.shelf].concat(book)
					},
				}
			}))
	}
	// make sure that the the options that are selected are the corect ones for each wan 

	componentDidMount() {
		BooksAPI.getAll().then(books => this.booksToBuckets(books))
	}

	updateBook(book, shelfPosition){
		// find out where it is supposed to be in the thing
		const filterOutBook = (bookFromShelf) => book.id !== bookFromShelf.id
		const myBooksNew =  this.state.myBooks
		const shelfKeyList = Object.keys(myBooksNew)
		//console.log(myBooksNew[shelfKeyList[0]])

		shelfKeyList.forEach(shelfKey => {
			myBooksNew[shelfKey] = myBooksNew[shelfKey].filter(filterOutBook)
		})
		if (shelfPosition !== 'none') {
			myBooksNew[shelfPosition] = myBooksNew[shelfPosition].concat(book)
			this.setState({myBooks: myBooksNew})
		}
	}

	render() {
		return (
			<div className="app">
				<Route path='/Search' render={() => 
					<Search updateBook={this.updateBook.bind(this)}/>
					}
				/>
				<Route exact path='/' render={() => 
					<MyReads myBooks={ this.state.myBooks } updateBook={this.updateBook.bind(this)}/>
					}
				/>
			</div>
		)
	}
}

export default BooksApp
