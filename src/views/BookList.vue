<template>
  <div>
    <h1>Books with ISBN > 1000</h1>

    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm ms-2">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { db } from '../firebase/init.js'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  limit,
} from 'firebase/firestore'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(10),
    )
    const queryResultSnapshot = await getDocs(q)
    const booksArray = []
    queryResultSnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.log('error getting books', error)
  }
}

onMounted(() => {
  fetchBooks()
})

const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, 'books', bookId))
    books.value = books.value.filter((book) => book.id != bookId)
    console.log('book deleted')
  } catch (error) {
    console.log('error deleting book', error)
  }
}
</script>
