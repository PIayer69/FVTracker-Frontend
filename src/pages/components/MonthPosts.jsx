import { useState } from "react";
import { BiDownArrow } from 'react-icons/bi';

import Post from "./Post";

const MonthPosts = ({posts, month, setPosts}) => {
    const [ showPosts, setShowPosts ] = useState(false);
    const monthString = new Date(2000, month, 1).toLocaleString('default', {month: 'long'})
  return (
    <>
        <tr>
            <td colSpan={5} onClick={() => setShowPosts((prev) => !prev)} className='month-row pointer'>
                {monthString.toLocaleUpperCase()} <BiDownArrow />
            </td>
        </tr>
        {
            showPosts
            && posts.map((post) => <Post key={post.id} data={post} setPosts={setPosts} />)
        }
    </>
  )
}

export default MonthPosts