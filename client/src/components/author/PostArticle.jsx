import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useNavigate } from 'react-router-dom';

function PostArticle() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();

  async function postArticle(articleObj) {
    console.log(articleObj);

    // Create article object as per article schema
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl
    };
    articleObj.authorData = authorData;

    // Article ID (timestamp)
    articleObj.articleId = Date.now();

    // Add date of creation & modification
    let currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString("en-US", { hour12: true })}`;

    articleObj.dateOfCreation = formattedDate;
    articleObj.dateOfModification = formattedDate;

    // Add comments array & active state
    articleObj.comments = [];
    articleObj.isArticleActive = true;

    // Make HTTP POST request
    let res = await axios.post('http://localhost:3000/author-api/article', articleObj);
    if (res.status === 201) {
      navigate(`/author-profile/${currentUser.email}/articles`);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Write an Article</h2>
        <form onSubmit={handleSubmit(postArticle)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              id="title"
              {...register("title")}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Select a category</label>
            <select
              {...register("category")}
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              defaultValue=""
            >
              <option value="" disabled>-- Select Category --</option>
              <option value="programming">Programming</option>
              <option value="AI&ML">AI & ML</option>
              <option value="database">Database</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-1">Content</label>
            <textarea
              {...register("content")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              id="content"
              rows="6"
            ></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostArticle;
