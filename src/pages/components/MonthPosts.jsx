import { useState, useEffect } from "react";
import axiosInstance from "../../axios";

const MonthPosts = ({post, month, setPosts, year, settings, settlementMonth}) => {
    const currentMonth = new Date().getMonth();
    const month_string = new Date(0, month - 1).toLocaleString('pl', {month: 'long'})
    const [date, setDate] = useState(new Date(year, month).toISOString().slice(0,10))
    const initialForm = Object.freeze({
        date: date,
        user: 1,
        produced_all: '',
        produced: '',
        received_all: '',
        received: '',
        sent_all: '',
        sent: ''
    })
    const [form, setForm] = useState(typeof post == "undefined" ? initialForm : post);
    const [editable, setEditable] = useState(false);

    // Updating inputs value after post is saved
    useEffect(() => {
        if(typeof post !== 'undefined'){
            setForm(post);
        }
    }, [post])

    // Updating date when selected year is changed
    useEffect(() => {
        const newDate = new Date(year, month).toISOString().slice(0,10)
        setDate(newDate);
    }, [year, month]);
    
    //Setting updated date to form
    useEffect(() => {
        setForm(prev => ({
            ...prev,
            date: date
        }))
    }, [date]);
  
    //Inputs handler
    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const editPost = () => {
        const form_cleaned = Object.fromEntries(Object.entries(form).filter(([_, v]) => v !== ''))
        axiosInstance
        .patch('posts/' + post.id + '/', JSON.stringify(form_cleaned))
        .then(res => {
            if(res.status === 200){
                setPosts(res.data);
                setEditable(prev => !prev)
                setForm(initialForm);
            };
        });
    };

    const savePost = () => {
        const form_cleaned = Object.fromEntries(Object.entries(form).filter(([_, v]) => v !== ''))
        axiosInstance
        .post('posts/', JSON.stringify(form_cleaned))
        .then(res => {
            if(res.status === 200){
                setPosts(res.data);
                setEditable(prev => !prev)
                setForm(initialForm);
            };
        });
    };

    const deletePost = () => {
        axiosInstance
        .delete('posts/' + post.id + '/')
        .then(res => {
            if(res.status === 200){
                setPosts(prev => Object.fromEntries(Object.entries(prev).filter(([key, value]) => parseInt(key) !== month)));
                setEditable(prev => !prev)
                setForm(initialForm);
            };
        });
    };

  return (
    <>
        <tr className={editable ? "month-row-editing" : ""}>
            <td className='month-cell pointer' onClick={() => setEditable(prev => !prev)}>
                {month_string} {currentMonth === parseInt(month - 1) ? '(teraz)' : ''}
            </td>
            {
                editable
                ? <>
                    {
                        settings.produced_input === 'all'
                        ? <>
                            <td className="input-cell"><input type="number" name="produced_all" value={form.produced_all} onChange={(e) => handleChange(e)}/></td>
                            <td className="disabled-cell"></td>
                        </>
                        : <> 
                            <td className="disabled-cell"></td>
                            <td className="input-cell"><input type="number" name="produced" value={form.produced} onChange={(e) => handleChange(e)}/></td>
                        </>
                    }
                    {
                        settings.received_input === 'all'
                        ? <>
                            <td className="input-cell"><input type="number" name="received_all" value={form.received_all} onChange={(e) => handleChange(e)}/></td>
                            <td className="disabled-cell"></td>
                        </>
                        : <> 
                            <td className="disabled-cell"></td>
                            <td className="input-cell"><input type="number" name="received" value={form.received} onChange={(e) => handleChange(e)}/></td>
                        </>
                    }
                    {
                        settings.sent_input === 'all'
                        ? <> 
                            <td className="input-cell"><input type="number" name="sent_all" value={form.sent_all} onChange={(e) => handleChange(e)}/></td>
                            <td className="disabled-cell"></td>
                        </>
                        : <>
                            <td className="disabled-cell"></td>
                            <td className="input-cell"><input type="number" name="sent" value={form.sent} onChange={(e) => handleChange(e)}/></td>
                        </>
                    }
                    
                    
                    
                    
                   
                    <td className="options-cell pointer" onClick={ typeof post === 'undefined' ? savePost : editPost } colSpan={3}>Zapisz</td>
                    <td className="options-cell pointer" colSpan={2} onClick={() => setEditable(prev => !prev)}>Anuluj</td>
                    <td className="options-cell pointer" colSpan={2} onClick={deletePost}>Usuń</td>
                </>
                : typeof post === 'undefined'
                ? <>
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
                    <td>-</td>
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
                    <td>{post.saved_funds.toFixed(2)} zł</td>
                </>
            }
        </tr>
        {
            settlementMonth
            && 
            <>
                <tr>
                    <td colSpan={3} rowSpan={2}>Podsumowanie okresu:</td>
                    <td colSpan={4}></td>
                    <td>Średnia:</td>
                    <td></td>
                    <td>Łącznie:</td>
                    <td>Średnia:</td>
                    <td colSpan={2} rowSpan={2}>Nadmiar</td>
                    <td>Łącznie:</td>
                </tr>
                <tr className="sum-row-bottom">
                    <td colSpan={4}></td>
                    <td>-</td>
                    <td></td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </>
        }
    </>
  )
}

export default MonthPosts