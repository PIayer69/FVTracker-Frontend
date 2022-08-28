import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { useState } from 'react';

import axiosInstance from '../../axios';

const Post = ({data, setPosts}) => {
  const initialForm = Object.freeze({
    date: data.date,
    sent: data.sent,
    received: data.received,
    produced: data.produced
  })
  const [form, setForm] = useState(initialForm)
  const [edit, setEdit] = useState(false);

  const deletePost = () => {
    axiosInstance
    .delete('posts/' + data.id + '/')
    .then(res => setPosts(res.data))
    .catch(err => console.log(err))
  }

  const toggleEdit = () => {
    setEdit((prev) => !prev)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const editPost = () => {
    axiosInstance
    .patch('posts/' + data.id + '/', JSON.stringify(form))
    .then(res => {
      setPosts(res.data);
      toggleEdit();
    })
    .catch(err => console.log(err))
  }

  return (
    <tr>
      {
        edit
        ? <>
          <td className='input-cell'><input name='date' value={form.date} onChange={(e) => handleChange(e)} type="date" /></td>
          <td className='input-cell'><input type="number" name='sent' value={form.sent} onChange={(e) => handleChange(e)}/></td>
          <td className='input-cell'><input type="number" name='received' value={form.received} onChange={(e) => handleChange(e)}/></td>
          <td className='input-cell'><input type="number" name='produced' value={form.produced} onChange={(e) => handleChange(e)}/></td>
          <td className='options-cell' onClick={editPost}>Save</td>
        </>
        : <>
        <td>{data.date}</td>
        <td>{data.sent}</td>
        <td>{data.received}</td>
        <td>{data.produced}</td>
        </>
      }
      
      <td className='options-cell'><FiEdit onClick={toggleEdit} /> <AiFillDelete onClick={() => deletePost(data.id)}/></td>
    </tr>
  )
}

export default Post