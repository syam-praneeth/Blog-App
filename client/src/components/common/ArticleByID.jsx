import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { FaEdit, FaComment, FaCalendarAlt, FaUser } from 'react-icons/fa'
import { MdDelete, MdRestore, MdSave } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'
import { BsCheckCircleFill } from 'react-icons/bs'
import { AiOutlineClockCircle, AiOutlineTag } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

function ArticleByID() {
  const { state } = useLocation()
  const { currentUser } = useContext(userAuthorContextObj)
  const [editArticleStatus, setEditArticleStatus] = useState(false)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const [currentArticle, setCurrentArticle] = useState(state)
  const [commentStatus, setCommentStatus] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [commentText, setCommentText] = useState('')

  //to enable edit of article
  function enableEdit() {
    setEditArticleStatus(true)
  }

  //to save modified article
  async function onSave(modifiedArticle) {
    const articleAfterChanges = { ...state, ...modifiedArticle }
    const token = await getToken()
    const currentDate = new Date();
    //add date of modification
    articleAfterChanges.dateOfModification = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear()

    //make http post req
    let res = await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    if (res.data.message === 'article modified') {
      //change edit article status to false
      setEditArticleStatus(false);
      navigate(`/author-profile/articles/${state.articleId}`, { state: res.data.payload })
    }
  }

  //add comment by user
  async function addComment(commentObj) {
    //add name of user to comment obj
    commentObj.nameOfUser = currentUser.firstName;
    console.log(commentObj)
    //http put
    let res = await axios.put(`http://localhost:3000/user-api/comment/${currentArticle.articleId}`, commentObj);
    if (res.data.message === 'comment added') {
      setCommentStatus(res.data.message)
      setCommentText('')
      // Clear status after 3 seconds
      setTimeout(() => {
        setCommentStatus('')
      }, 3000)
    }
  }

  //delete article
  async function deleteArticle() {
    state.isArticleActive = false;
    let res = await axios.put(`http://localhost:3000/author-api/articles/${state.articleId}`, state)
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload)
    }
  }
  //restore article
  async function restoreArticle() {
    state.isArticleActive = true;
    let res = await axios.put(`http://localhost:3000/author-api/articles/${state.articleId}`, state)
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload)
    }
  }

  return (
    <div className='max-w-5xl mx-auto px-4 py-6 bg-gray-50'>
      {
        editArticleStatus === false ? <>
          {/* print full article */}
          <div className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col md:flex-row justify-between p-4 border-b border-gray-100">
              <div className="mb-2 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-all duration-300 hover:text-blue-500">{state.title}</h1>
                {/* doc & dom */}
                <div className="flex items-center text-sm space-x-4">
                  <div className="flex items-center text-gray-500">
                    <FaCalendarAlt className="mr-1 text-blue-500" />
                    <span>Created: {state.dateOfCreation}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <AiOutlineClockCircle className="mr-1 text-blue-500" />
                    <span>Modified: {state.dateOfModification}</span>
                  </div>
                </div>
              </div>
              {/* author details */}
              <div className="flex items-center">
                <img 
                  src={state.authorData.profileImageUrl} 
                  className='w-10 h-10 rounded-full object-cover border-2 border-blue-400 transition-all duration-300 hover:border-blue-600' 
                  alt="Author"
                />
                <div className="ml-2">
                  <div className="flex items-center">
                    <FaUser className="text-blue-500 mr-1" />
                    <p className="text-gray-700 font-medium">{state.authorData.nameOfAuthor}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            {
              currentUser.role === 'author' && (
                <div className="flex justify-end px-4 py-2 bg-gray-50">
                  {/* edit button */}
                  <button 
                    className="mr-2 p-2 rounded-md bg-blue-50 text-blue-600 border border-blue-100 transition-all duration-200 transform hover:scale-105 hover:bg-blue-100" 
                    onClick={enableEdit}
                    aria-label="Edit article"
                  >
                    <FaEdit />
                  </button>
                  {/* if article is active,display delete icon, otherwise display restore icon */}
                  {
                    state.isArticleActive === true ? (
                      <button 
                        className="p-2 rounded-md bg-red-50 text-red-500 border border-red-100 transition-all duration-200 transform hover:scale-105 hover:bg-red-100" 
                        onClick={deleteArticle}
                        aria-label="Delete article"
                      >
                        <MdDelete />
                      </button>
                    ) : (
                      <button 
                        className="p-2 rounded-md bg-green-50 text-green-600 border border-green-100 transition-all duration-200 transform hover:scale-105 hover:bg-green-100" 
                        onClick={restoreArticle}
                        aria-label="Restore article"
                      >
                        <MdRestore />
                      </button>
                    )
                  }
                </div>
              )
            }

            {/* content*/}
            <div className="p-4">
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {state.content}
              </p>
            </div>
          </div>

          {/* user comments */}
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <FaComment className="text-blue-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Comments</h2>
            </div>
            <div className="space-y-3">
              {
                state.comments.length === 0 ? 
                <p className='text-gray-500 italic flex items-center'>
                  <span className="bg-gray-100 p-2 rounded-full mr-2">
                    <FaComment className="text-gray-400" />
                  </span>
                  No comments yet...
                </p> :
                state.comments.map(commentObj => {
                  return (
                    <div 
                      key={commentObj._id} 
                      className="bg-white p-3 rounded-md border-l-3 border-blue-400 transition-all duration-200 hover:border-blue-500 hover:shadow-sm"
                      onMouseEnter={() => setIsHovering(commentObj._id)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-2">
                          {commentObj?.nameOfUser?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <p className="font-medium text-gray-800">
                          {commentObj?.nameOfUser}
                        </p>
                      </div>
                      <p className={`text-gray-700 mt-1 pl-10 ${isHovering === commentObj._id ? 'text-gray-900' : ''}`}>
                        {commentObj?.comment}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* comment status */}
          {commentStatus && (
            <div className="mt-3 p-2 bg-green-50 text-green-700 rounded-md flex items-center justify-center animate-pulse">
              <BsCheckCircleFill className="mr-2" />
              {commentStatus}
            </div>
          )}

          {/* comment form */}
          {
            currentUser.role === 'user' && (
              <form onSubmit={handleSubmit(addComment)} className="mt-4">
                <div className="flex items-center">
                  <div className="flex-grow relative">
                    <input 
                      type="text" 
                      {...register("comment")} 
                      className="w-full p-2 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200" 
                      placeholder="Add your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                  <button 
                    className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 flex items-center"
                    type="submit"
                  >
                    <IoMdSend className="mr-1" />
                    Send
                  </button>
                </div>
              </form>
            )
          }
        </> :
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <form onSubmit={handleSubmit(onSave)}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                  id="title"
                  defaultValue={state.title}
                  {...register("title")}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="flex items-center text-gray-700 font-medium mb-1">
                  <AiOutlineTag className="mr-1 text-blue-500" />
                  Select a category
                </label>
                <select
                  {...register("category")}
                  id="category"
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                  defaultValue={state.category}
                >
                  <option value="programming">Programming</option>
                  <option value="AI&ML">AI&ML</option>
                  <option value="database">Database</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 font-medium mb-1">
                  Content
                </label>
                <textarea
                  {...register("content")}
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                  id="content"
                  rows="8"
                  defaultValue={state.content}
                ></textarea>
              </div>

              <div className="text-right">
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 flex items-center ml-auto"
                >
                  <MdSave className="mr-1" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
      }
    </div>
  )
}

export default ArticleByID