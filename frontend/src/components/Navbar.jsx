import { Link } from "react-router"

const Navbar = () => {
  return (
  <nav className=" p-4 shadow-md bg-base-100">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">
              <Link to="/">ThinkBoard</Link>
            </div>
            <div className="space-x-4">
              <button className="btn btn-success btn-md">
                <Link to="/create">Create</Link>
              </button>
            </div>
          </div>
        </nav>
  )
}

export default Navbar