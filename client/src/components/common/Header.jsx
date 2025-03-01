import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../assets/logo4.avif";

const Header = () => {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [isHovering, setIsHovering] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Apple-inspired animation variants
  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] // Apple-like cubic bezier
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" 
    }
  };

  const avatarContainerVariants = {
    hover: {
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const avatarVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -4, 0],
      transition: { 
        repeat: Infinity, 
        duration: 2,
        ease: "easeInOut" 
      } 
    }
  };

  const logoVariants = {
    hover: { 
      scale: 1.15,
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-black text-[#f5f5f7] p-4 rounded-xl shadow-xl flex justify-between items-center backdrop-blur-sm bg-opacity-90"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <Link to="/">
        <motion.div
          variants={logoVariants}
          whileHover="hover"
          className="relative overflow-hidden rounded-full"
        >
          <motion.img
            src={logo}
            alt="Logo"
            width="50"
            className="rounded-full cursor-pointer border-2 border-[#0066cc]"
          />
          <motion.div 
            className="absolute inset-0 bg-[#0066cc] opacity-0"
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
      
      <ul className="flex space-x-6 items-center">
        {!isSignedIn ? (
          <>
            <motion.li 
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="signin" className="hover:text-[#0066cc] transition-colors duration-300 font-medium">Sign In</Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="signup" className="hover:text-[#0066cc] transition-colors duration-300 font-medium">Sign Up</Link>
            </motion.li>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <motion.div
              className="relative cursor-pointer"
              variants={avatarContainerVariants}
              whileHover="hover"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.div className="relative">
                <motion.img
                  src={user.imageUrl}
                  width="44"
                  className="rounded-full border-2 border-[#0066cc] shadow-lg"
                  alt="User Avatar"
                  variants={avatarVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.span 
                  className="absolute -top-1 -right-1 bg-[#0066cc] text-white text-xs px-2 py-1 rounded-full shadow-md z-10"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {currentUser.role}
                </motion.span>
              </motion.div>
              
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 bg-black bg-opacity-90 backdrop-blur-md text-[#f5f5f7] p-3 rounded-xl shadow-xl text-sm"
                    style={{ minWidth: "130px", backdropFilter: "blur(10px)" }}
                  >
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-xs text-[#86868b] mt-1">{user.emailAddresses[0].emailAddress}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-[#ff2d55] to-[#ff3b30] px-4 py-2 rounded-lg text-white font-medium shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Sign Out
            </motion.button>
          </div>
        )}
      </ul>
    </motion.nav>
  );
};

export default Header;