import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries'


interface Book {
    name: string;
    genre?: string;
    author?: string;
    id: string;
}

interface IProps {
    bookId: string | null;
}

const BookDetails = (props: IProps) => {

    const { loading, data, error } = useQuery(getBookQuery, {
        variables: {
            id: props.bookId
        }
    })

    const bookDetails = () => {

        const book = data?.book
        if (loading) return <p>Loading books...</p>;
        if (error) return <p>Error :(</p>;

        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul>
                        {book.author.books.map((item: Book) => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return <div>No book selected...</div>
        }

    }
    return (
        <div id="book-details">
            <p>Output book details here</p>
            {bookDetails()}
        </div>
    );
}

export default BookDetails;
