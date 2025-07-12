const Book = require('../models/Book');
const mongoose = require('mongoose');

class BookController {
    /**
     * @route POST /books
     * @desc Create a new book
     * @access Public
     */
    async createBook(req, res, next) {
        try {
            const newBook = new Book({
                _id: new mongoose.Types.ObjectId(),
                ...req.body,
            });
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route GET /books
     * @desc Get all books with pagination
     * @access Public
     */
    async getAllBooks(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const books = await Book.find({}).skip(skip).limit(limit).lean();
            const totalBooks = await Book.countDocuments({});
            const totalPages = Math.ceil(totalBooks / limit);

            res.status(200).json({
                books,
                currentPage: page,
                totalPages,
                totalBooks,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route GET /books/:id
     * @desc Get a single book by its ID
     * @access Public
     */
    async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid book ID format' });
            }

            const book = await Book.findById(id).lean();

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route PUT /books/:id
     * @desc Update a book by its ID
     * @access Public
     */
    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid book ID format' });
            }

            const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).lean();

            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @route DELETE /books/:id
     * @desc Delete a book by its ID
     * @access Public
     */
    async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid book ID format' });
            }

            const deletedBook = await Book.findByIdAndDelete(id);

            if (!deletedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();