class Storage {
    constructor() {
        this.storage = [];
    }

    setBook(book) {
        this.storage.push(book);
    }

    updateBook(id, book) {
        const index = this.storage.findIndex((b) => b.id === id);

        if (index === -1) {
            this.storage.push(book)
        } else {
            this.storage[index] = book;
        }
    }

    deleteBook(id) {
        const index = this.storage.findIndex((b) => b.id === id);
        if (index === -1) return;

        this.storage.splice(index, 1);
    }
}

module.exports = {
    Storage
};
