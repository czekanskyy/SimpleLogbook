import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getUsers, toggleUserApproval, changeUserRole, deleteUser } from "@/app/lib/actions"
import { Check, X, Shield, ShieldAlert, Trash2, UserCog } from "lucide-react"

export default async function AdminPage() {
  const session = await auth()
  
  if (session?.user?.role !== 'ADMIN') {
    redirect("/")
  }

  const users = await getUsers()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">User Management</p>
          </div>
          <a href="/" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
            Back to Logbook
          </a>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                          user.avatarColor === 'blue' ? 'bg-blue-500' :
                          user.avatarColor === 'red' ? 'bg-red-500' :
                          user.avatarColor === 'green' ? 'bg-green-500' :
                          user.avatarColor === 'yellow' ? 'bg-yellow-500' :
                          user.avatarColor === 'purple' ? 'bg-purple-500' :
                          user.avatarColor === 'pink' ? 'bg-pink-500' :
                          user.avatarColor === 'indigo' ? 'bg-indigo-500' :
                          user.avatarColor === 'cyan' ? 'bg-cyan-500' :
                          user.avatarColor === 'orange' ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name || 'No Name'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      {user.role === 'ADMIN' ? (
                        <ShieldAlert className="w-4 h-4 mr-1 text-red-500" />
                      ) : (
                        <Shield className="w-4 h-4 mr-1 text-gray-400" />
                      )}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isApproved 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {user.isApproved ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {user.id === session?.user?.id ? (
                      <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                        Current User
                      </span>
                    ) : (
                      <div className="flex justify-end items-center gap-2">
                        {/* Approval Toggle */}
                        <form action={toggleUserApproval}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="currentStatus" value={String(user.isApproved)} />
                          <button 
                            type="submit"
                            title={user.isApproved ? 'Revoke Access' : 'Approve User'}
                            className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded shadow-sm text-white transition-colors min-w-[90px] ${
                              user.isApproved
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {user.isApproved ? (
                              <><X className="w-3.5 h-3.5 mr-1.5" /> Revoke</>
                            ) : (
                              <><Check className="w-3.5 h-3.5 mr-1.5" /> Approve</>
                            )}
                          </button>
                        </form>

                        {/* Change Role */}
                        <form action={changeUserRole}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="role" value={user.role === 'ADMIN' ? 'USER' : 'ADMIN'} />
                          <button
                            type="submit"
                            title={user.role === 'ADMIN' ? 'Demote to USER' : 'Promote to ADMIN'}
                            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors min-w-[90px]"
                          >
                            <UserCog className="w-3.5 h-3.5 mr-1" />
                            {user.role === 'ADMIN' ? 'USER' : 'ADMIN'}
                          </button>
                        </form>

                        {/* Delete User */}
                        <form action={deleteUser}>
                          <input type="hidden" name="userId" value={user.id} />
                          <button
                            type="submit"
                            title="Delete User"
                            className="inline-flex items-center justify-center w-9 h-[30px] text-xs font-medium rounded shadow-sm text-white bg-gray-600 hover:bg-gray-700 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
