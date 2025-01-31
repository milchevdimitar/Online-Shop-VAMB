import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/list', {
        headers: { token },
      });
      if (response.data.success) {
        setUsers(response.data.users.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/user/ban',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <p className='mb-2'>СПИСЪК НА ПОТРЕБИТЕЛИ</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_2fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>ПОТРЕБИТЕЛ</b>
          <b>EMAIL</b>
          <b>РАНК</b>
          <b>ОБОРОТ</b>
          <b className='text-center'>ДЕЙСТВИЯ</b>
        </div>
        {users.map((user, index) => (
          <div
            className='grid grid-cols-[1fr_2fr_2fr_2fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
            key={index}
          >
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.rank}</p>
            <p>{user.moneyspent.toFixed(2)}</p>
            <p
              onClick={() => removeUser(user._id)}
              className='text-right md:text-center cursor-pointer text-lg text-red-600'
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
