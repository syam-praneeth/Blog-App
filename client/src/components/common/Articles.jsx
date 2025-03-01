import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { FaBook, FaFilter, FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { AiOutlineTag } from 'react-icons/ai';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Get all articles
  async function getArticles() {
    setIsLoading(true);
    try {
      const token = await getToken();
      let res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message === 'articles') {
        setArticles(res.data.payload);
        setCategories(['All', ...new Set(res.data.payload.map(article => article.category))]);
        setError('');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setIsLoading(false);
    }
  }

  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {error.length !== 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 p-3 mb-6 rounded-md text-red-600 text-center font-medium border border-red-100"
        >
          {error}
        </motion.div>
      )}
      
      <div className="mb-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <FaBook className="text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
        </motion.div>
        
        <motion.div 
          className="relative flex items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FaFilter className="text-blue-500 mr-2" />
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-md py-2 pl-3 pr-8 text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-md shadow-sm p-4 h-48">
              <div className="animate-pulse flex flex-col h-full">
                <div className="flex justify-end">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                <div className="h-20 bg-gray-100 rounded mt-3"></div>
                <div className="mt-auto">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredArticles.map((articleObj) => (
            <motion.div
              key={articleObj.articleId}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">
                    <AiOutlineTag className="mr-1" />
                    {articleObj.category}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={articleObj.authorData.profileImageUrl}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      alt={articleObj.authorData.nameOfAuthor}
                    />
                    <p className="ml-2 text-sm text-gray-600 leading-none flex items-center">
                      {articleObj.authorData.nameOfAuthor}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{articleObj.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {articleObj.content.substring(0, 120) + '...'}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    <span>{articleObj.dateOfModification}</span>
                  </div>
                  
                  <button
                    onClick={() => gotoArticleById(articleObj)}
                    className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
                  >
                    Read more
                    <FaArrowRight className="ml-1 text-xs" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredArticles.length === 0 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <FaBook className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">No articles found</h3>
              <p className="text-gray-500 mt-1">Try selecting a different category</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Articles;