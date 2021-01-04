import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

interface Author {
    name: string;
    age?: string;
    books?: string;
    id: string;
}


const AddBook = () => {
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { loading, error, data } = useQuery(getAuthorsQuery);

    const displayAuthors = () => {
        if (loading) {
            return <option>Loading Authors...</option>;
        }
        else if (error) {
            return <option>Error :(</option>;
        } else {
            return data.authors.map((author: Author) => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>)
            })
        }
    }
    const [addBook] = useMutation(addBookMutation)
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(authorId)
        if (!name || !genre || authorId === "Select author" || !authorId) {
            if (!name) {
                setErrorMessage("Please input a book name.")
            } else if (!genre) {
                setErrorMessage("Please input a book genre.")
            } else if (!authorId) {
                setErrorMessage("Please select a book author.")
            }
        } else {
            setErrorMessage('')
            addBook(
                {
                    variables:
                    {
                        name: name,
                        genre: genre,
                        authorId: authorId
                    },
                    refetchQueries: [{
                        query: getBooksQuery
                    }]
                })
        }

    }

    return (
        <form id="add-book" onSubmit={(e) => { submitHandler(e) }}>
            <div className="field">
                <label>Book name:</label>
                <input type="text"
                    onChange={(e) => { setName(e.target.value) }} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input
                    type="text"
                    onChange={(e) => { setGenre(e.target.value) }} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => { setAuthorId(e.target.value) }} >
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <h4 className="error">{errorMessage}</h4>

            <button>+</button>
        </form>
    );
}

export default AddBook;
