/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import CreatePostBox from "./components/CreatePostBox";
import postService from "./services/postService";
import Header from "./components/Header";
import PostsList from './components/PostsList'

export default function App() {
  const [posts, setPosts] = useState([]);

  const sortFields = [{ value: 'dateAdded', label: 'Date added' }, { value: 'lastUpdated', label: 'Last updated' }]
  const sortOrders = [{ value: 'desc', label: 'newest' }, { value: 'asc', label: 'oldest' }]
  const [sortBy, setSortBy] = useState(sortFields[0].value)
  const [sortOrder, setSortOrder] = useState(sortOrders[0].value)

  const getPosts = useCallback(async () => {
    try {
      const posts = await postService.getAll(sortBy, sortOrder)
      setPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filterFields = [{ label: 'Title', value: 'title' }, { label: 'Content', value: 'content' }]
  const [filterField, setFilterField] = useState(filterFields[0].value)
  const [filterTerms, setFilterTerms] = useState('')

  const filteredPosts = posts.filter(post => post[filterField].toLowerCase().includes(filterTerms.toLowerCase()))

  const displayedPosts = filterTerms ? filteredPosts : posts

  return (
    <div className="flex flex-col items-center">
      <Header />
      <CreatePostBox setPosts={getPosts} />
      <h1 className="p-8 text-center">My Posts</h1>
      <div className="flex gap-4 p-4">
        <Dropdown label={'Sort by'} options={sortFields} setOption={option => setSortBy(option)} />
        <Dropdown label={'Sort order'} options={sortOrders} setOption={option => setSortOrder(option)} />
      </div>
      <div className="flex gap-4 p-4">
        <Dropdown label={'Filter by'} options={filterFields} setOption={option => setFilterField(option)} />
        <Filterbar setFilterTerms={setFilterTerms} />
      </div>
      <PostsList posts={displayedPosts} setPosts={getPosts} />
    </div>
  );
}

function Filterbar({ setFilterTerms }) {
  const handleChange = event => {
    setFilterTerms(event.target.value)
  }
  return (
    <div>
      <input onChange={handleChange} className="rounded-xl p-2 shadow w-96"/>
    </div>
  )
}

function Dropdown({ label, options, setOption }) {
  const handleChange = event => {
    setOption(event.target.value)
  }
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="sortDropdown">{label}</label>
      <select onChange={handleChange} id="sortDropdown" className="capitalize rounded-xl p-2 shadow">
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}


