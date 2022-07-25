import AdminLayout from '@/layout/AdminLayout/AdminLayout';
import React, { useEffect, useState } from 'react'
import TableUsers from './TableUser';
import { DesktopFilter, MobileFilter } from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '@/redux/feature/admin/users';

const AdminUserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  console.log("USER", users)
  const [filterOptions, setFilterOptions] = useState({
    search: "",
  });
  useEffect(() => {
    const sortOptions = `limit=10&page=1&search=${filterOptions.search}`;
    console.log("SORT:", sortOptions);
    const fetchUserData = async () => {
      dispatch(fetchUsers(sortOptions));
    };
    fetchUserData();
  },[filterOptions])
  return (
    // <div>AdminUserPage</div>
    <div className='w-full'>
      <div className="flex items-center justify-between w-full px-4 py-6 bg-white">
        <div className="text-3xl font-bold">Manage User</div>
      </div>
      <div span={24}>
        <div
          className="flex flex-col m-1 overflow-auto rounded-lg"
          style={{
            backgroundColor: "#fff",
            boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
          }}
        >
          <DesktopFilter
            onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
            className="hidden lg:flex"
          />
          <MobileFilter
            onSubmit={(filterOptions) => setFilterOptions(filterOptions)}
            className="lg:hidden"
          />
         <TableUsers/>
        </div>
      </div>
    </div>
    
  )
}



AdminUserPage.layout = AdminLayout;
export default AdminUserPage;
