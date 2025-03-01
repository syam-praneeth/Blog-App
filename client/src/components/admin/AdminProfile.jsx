// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// function AdminProfile() {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // Fetch all users & authors
//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const res = await axios.get('http://localhost:3000/admin-api/users')
//         setUsers(res.data)
//         setLoading(false)
//       } catch (err) {
//         setError('Failed to load users.')
//         setLoading(false)
//       }
//     }
//     fetchUsers()
//   }, [])

//   // Toggle enable/disable user
//   async function toggleUserStatus(userId, isBlocked) {
//     try {
//       await axios.patch(`http://localhost:3000/admin-api/user/${userId}`, { isBlocked: !isBlocked })
//       setUsers(users.map(user => (user.id === userId ? { ...user, isBlocked: !isBlocked } : user)))
//     } catch (err) {
//       alert('Error updating user status')
//     }
//   }

//   if (loading) return <h3 className="text-center mt-5">Loading users...</h3>
//   if (error) return <h3 className="text-center text-danger">{error}</h3>

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4" style={{ color: 'goldenrod' }}>Admin Dashboard</h2>
//       <div className="table-responsive">
//         <table className="table table-bordered text-center">
//           <thead className="table-dark">
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id} className={user.isBlocked ? 'table-danger' : ''}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
//                 <td>
//                   <button 
//                     className={`btn ${user.isBlocked ? 'btn-success' : 'btn-danger'}`} 
//                     onClick={() => toggleUserStatus(user.id, user.isBlocked)}
//                   >
//                     {user.isBlocked ? 'Enable' : 'Disable'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default AdminProfile
