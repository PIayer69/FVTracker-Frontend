import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';

const MonthPosts = ({post, month, setPosts}) => {
    const currentMonth = new Date().getMonth();
    const month_string = new Date(0, month).toLocaleString('pl', {month: 'long'})

    const initialForm = Object.freeze({
        
    })
    const [form, setForm] = useState(initialForm);

    const [editable, setEditable] = useState(false);

    
    

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

  return (
    <>
        <tr>
            <td className='month-row pointer' onClick={() => setEditable(prev => !prev)}>
                {month_string} {currentMonth === parseInt(month) ? '(teraz)' : ''}
            </td>
            {
                typeof post === 'undefined'
                ? <>
                    {
                    editable
                    ? <>
                        <input type="text" />
                    </>
                    :<>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    </>
                    }
                </>
                : <>
                    {
                        editable
                        ? <>
                            <td><input type="text" value={form.sent_all} onChange={(e) => handleChange(e)}/></td>
                        </>
                        : <>
                            <td>{post.produced_all}</td>
                            <td>{post.produced}</td>
                            <td>{post.received_all}</td>
                            <td>{post.received}</td>
                            <td>{post.sent_all}</td>
                            <td>{post.sent}</td>
                            <td>{post.autoconsumption}</td>
                            <td>{Math.round(post.autoconsumption_percentage * 100)}%</td>
                            <td>{post.consumption}</td>
                            <td>{post.consumption_average}</td>
                            <td>{post.energy_surplus}</td>
                            <td>{post.balance.toFixed(2)} zł</td>
                        </>
                    }
                </>
            }
        </tr>
    </>
  )
}

export default MonthPosts