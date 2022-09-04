import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { useState } from 'react';

import axiosInstance from '../../axios';
import PostSaveEdit from './PostSaveEdit';

const Post = ({data, setPosts}) => {
  const [edit, setEdit] = useState(false);

  const initialForm = Object.freeze({
    date: data.date,
    sent: data.sent,
    received: data.received,
    produced: data.produced
  })

  const deletePost = () => {
    axiosInstance
    .delete('posts/' + data.id + '/')
    .then(res => {
      if(res.status === 200){
        setPosts((posts) => {
          let newPosts = {}
          Object.keys(posts).map((key, index) => {
            if(posts[key].filter(post => post.id !== data.id).length)
              return newPosts[key] = posts[key].filter(post => post.id !== data.id)
            return null
          })
          return newPosts
        })
      }
    })
    .catch(err => console.log(err))
  }

  const toggleEdit = () => {
    setEdit((prev) => !prev)
  }

  const editPost = (form) => {
    axiosInstance
    .patch('posts/' + data.id + '/', JSON.stringify(form))
    .then(res => {
      setPosts((posts) => {
        let newPosts = {}
        Object.keys(posts).map((key, index) => (
          newPosts[key] = posts[key].map(post => post.id === data.id ? res.data : post)
        ))
        return newPosts
      })
      toggleEdit();
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      {
        edit
        ? <PostSaveEdit onAccept={editPost} onCancel={toggleEdit} initialForm={initialForm}/>
        : <tr>
            <td>{data.date}</td>
            <td>{data.sent}</td>
            <td>{data.received}</td>
            <td>{data.produced}</td>
            <td className='options-cell'>
              <FiEdit className='pointer' onClick={toggleEdit} /> 
              <AiFillDelete className='pointer' onClick={() => deletePost(data.id)}/>
            </td>
        </tr>
      }
    </>
  )
}

export default Post