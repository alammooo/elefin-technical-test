import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function UserList() {
  const { userReducer } = useSelector((state) => state)
  const nav = useNavigate()

  function navHome() {
    nav("/")
  }

  useEffect(() => {}, [userReducer])

  return (
    <div className="container flex flex-col items-center mx-auto text-lg">
      <h1 className="font-medium text-xl cursor-pointer">User List</h1>
      <p>Here is a list of users</p>
      <h1
        onClick={navHome}
        className="bg-blue-500 text-white px-3 py-2 rounded-md">
        Back to Home
      </h1>

      <div className="relative overflow-x-auto shadow-md mt-5">
        <table className="w-full text-left text-gray-500 border">
          <thead className=" text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 border">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                Company
              </th>
              <th scope="col" className="px-6 py-3 border">
                Position Applied
              </th>
              <th scope="col" className="px-6 py-3 border">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {userReducer?.map((user, i) => (
              <tr
                className={`bg-white border-b-2 ${
                  i % 2 === 0 ? "bg-blue-50" : "bg-white"
                }`}
                key={i}>
                <td className="px-6 py-4">{user.fullName}</td>
                <td className="px-6 py-4">{user.company}</td>
                <td className="px-6 py-4">
                  {user.position.slice(1, user.position.length).map((data) => (
                    <p>{data}</p>
                  ))}
                </td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
