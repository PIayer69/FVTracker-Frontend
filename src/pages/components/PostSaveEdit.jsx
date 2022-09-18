import { ImCheckmark, ImCross } from 'react-icons/im';
import { useState } from 'react';

const PostSaveEdit = ({onAccept, onCancel, initialForm}) => {
    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
  return (
    <tr>
        <td className='input-cell'><input name='date' value={form.date} onChange={(e) => handleChange(e)} type="date" /></td>
        <td className='input-cell'><input type="number" name='sent_all' value={form.sent} onChange={(e) => handleChange(e)}/></td>
        <td className='input-cell'><input type="number" name='sent' value={form.sent} onChange={(e) => handleChange(e)}/></td>
        <td className='input-cell'><input type="number" name='received_all' value={form.received} onChange={(e) => handleChange(e)}/></td>
        <td className='input-cell'><input type="number" name='received' value={form.received} onChange={(e) => handleChange(e)}/></td>
        <td className='input-cell'><input type="number" name='produced_all' value={form.produced} onChange={(e) => handleChange(e)}/></td>
        <td className='input-cell'><input type="number" name='produced' value={form.produced} onChange={(e) => handleChange(e)}/></td>
        <td className='options-cell' colSpan={7}>
            <ImCheckmark size={18} color='green' onClick={() => onAccept(form)} className='pointer' />
            <ImCross color='darkred' className='pointer' onClick={onCancel} />
        </td>
    </tr>
  )
}

export default PostSaveEdit