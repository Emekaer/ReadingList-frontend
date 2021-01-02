import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries'

import BookDetails from "./BookDetails"

interface Book {
    name: string;
    genre?: string;
    author?: string;
    id: string;
}

const BookList = () => {
    const [selected, setSelected] = useState<string | null>(null)
    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error :(</p>;


    return (
        <div id="main">
            <ul id="book-list">
                {data.books.map((book: Book) =>
                (<li key={book.id}
                    onClick={() => { setSelected(book.id) }}>
                    {book.name}
                </li>))}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    );
}

export default BookList;
