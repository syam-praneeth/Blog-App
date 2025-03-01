

import { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSelectRole(e) {
    setError("");
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === "author") {
        res = await axios.post("http://localhost:3000/author-api/author", currentUser);
      } else if (selectedRole === "user") {
        res = await axios.post("http://localhost:3000/user-api/user", currentUser);
      } else {
        res = await axios.post("http://localhost:3000/admin-api/admin", currentUser);
      }
      let { message, payload } = res.data;
      if (message === selectedRole) {
        setCurrentUser({ ...currentUser, ...payload });
        localStorage.setItem("currentuser", JSON.stringify(payload));
      } else {
        setError(message);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-dashboard`);
    }
  }, [currentUser]);

  return (
    <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <motion.h1
        style={{ fontSize: '5rem', fontWeight: 'bold', color: '#0070C9', cursor: 'pointer' }}
        className="transition-all duration-500 ease-in-out hover:scale-110"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Blog App
      </motion.h1>

      {isSignedIn === false && (
        <motion.p
          style={{ fontSize: '1.5rem', color: '#333333', cursor: 'pointer' }}
          className="mt-4 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Share your thoughts and ideas with the world. Join now!
        </motion.p>
      )}

      {isSignedIn === true && (
        <motion.div
          style={{ padding: '1.5rem', marginTop: '1.5rem', backgroundColor: '#FFFFFF', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '1rem', width: '24rem' }}
          className="transition-all duration-500 ease-in-out"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={user.imageUrl}
            style={{ width: '4rem', height: '4rem', borderRadius: '50%', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}
            alt="User"
          />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000000', marginTop: '0.75rem' }}>{user.firstName}</h3>
          <p style={{ color: '#333333' }}>{user.emailAddresses[0].emailAddress}</p>
          <p style={{ fontSize: '1.5rem', color: '#333333', marginTop: '1rem' }}>Select your role:</p>
          {error.length !== 0 && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '10px' }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="role"
                value="author"
                style={{ display: 'none' }}
                onChange={onSelectRole}
              />
              ✍️ Author
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="role"
                value="user"
                style={{ display: 'none' }}
                onChange={onSelectRole}
              />
              👤 User
            </label>
            <label style={{ cursor: 'pointer', fontWeight: 'bold', color: 'red' }}>
              <input
                type="radio"
                name="role"
                value="admin"
                style={{ display: 'none' }}
                onChange={onSelectRole}
              />
              🔑 Admin
            </label>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Home;






// import { useContext, useEffect, useState } from "react";
// import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// function Home() {
//   const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
//   const { isSignedIn, user, isLoaded } = useUser();
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   async function onSelectRole(e) {
//     setError("");
//     const selectedRole = e.target.value;
//     currentUser.role = selectedRole;
//     let res = null;
//     try {
//       if (selectedRole === "author") {
//         res = await axios.post("http://localhost:3000/author-api/author", currentUser);
//       } else {
//         res = await axios.post("http://localhost:3000/user-api/user", currentUser);
//       }
//       let { message, payload } = res.data;
//       if (message === selectedRole) {
//         setCurrentUser({ ...currentUser, ...payload });
//         localStorage.setItem("currentuser", JSON.stringify(payload));
//       } else {
//         setError(message);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   useEffect(() => {
//     if (isSignedIn === true) {
//       setCurrentUser({
//         ...currentUser,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.emailAddresses[0].emailAddress,
//         profileImageUrl: user.imageUrl,
//       });
//     }
//   }, [isLoaded]);

//   useEffect(() => {
//     if (currentUser?.role === "user" && error.length === 0) {
//       navigate(`/user-profile/${currentUser.email}`);
//     }
//     if (currentUser?.role === "author" && error.length === 0) {
//       navigate(`/author-profile/${currentUser.email}`);
//     }
//   }, [currentUser]);

//   return (
//     <div style={{ backgroundColor: '#F7F7F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//       {/* Stunning Header */}
//       <motion.h1
//         style={{ fontSize: '5rem', fontWeight: 'bold', color: '#0070C9', cursor: 'pointer' }}
//         className="transition-all duration-500 ease-in-out hover:scale-110"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Blog App
//       </motion.h1>

//       {isSignedIn === false && (
//         <motion.p
//           style={{ fontSize: '1.5rem', color: '#333333', cursor: 'pointer' }}
//           className="mt-4 transition-all duration-300"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           Share your thoughts and ideas with the world. Join now!
//         </motion.p>
//       )}

//       {isSignedIn === true && (
//         <motion.div
//           style={{ padding: '1.5rem', marginTop: '1.5rem', backgroundColor: '#FFFFFF', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '1rem', width: '24rem' }}
//           className="transition-all duration-500 ease-in-out"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <img
//             src={user.imageUrl}
//             style={{ width: '4rem', height: '4rem', borderRadius: '50%', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}
//             alt="User"
//           />
//           <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000000', marginTop: '0.75rem' }}>{user.firstName}</h3>
//           <p style={{ color: '#333333' }}>{user.emailAddresses[0].emailAddress}</p>
//           <p style={{ fontSize: '1.5rem', color: '#333333', marginTop: '1rem' }}>Select your role:</p>
//           {error.length !== 0 && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
//           <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
//             <label style={{ cursor: 'pointer' }}>
//               <input
//                 type="radio"
//                 name="role"
//                 value="author"
//                 style={{ display: 'none' }}
//                 onChange={onSelectRole}
//               />
//               ✍️ Author
//             </label>
//             <label style={{ cursor: 'pointer' }}>
//               <input
//                 type="radio"
//                 name="role"
//                 value="user"
//                 style={{ display: 'none' }}
//                 onChange={onSelectRole}
//               />
//               👤 User
//             </label>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// export default Home;
