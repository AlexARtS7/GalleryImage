import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function AddModal({quotes}) {
    const [nameError, setNameError] = useState('');
    const [urlError, setUrlError] = useState('');

    const dispatch = useDispatch();
    const quote = useSelector(state => state.preview)

    const gallery = document.getElementById('gallery');
    if(gallery) gallery.style.overflow = 'hidden';

    const closeModal = (id) => {
        if(id != 'add_back' && id != 'cancel') return;
        if(gallery) gallery.style.overflow = 'auto';
        dispatch({type: 'CHANGE_ADD_STATUS', payload: false});
    };    

    const onSubmit = (e) => {
        e.preventDefault();
        const nam = e.target.nam.value;
        const url = e.target.url.value;
        if(nam === ''){
            setNameError('[ ! ] поле должно быть заполнено.');
        } else {
            setNameError('');
        }
        if(url === ''){
            setUrlError('[ ! ] поле должно быть заполнено.');
        } else {
            setUrlError('');
        }
        
        if(nam != '' && url != ''){
            const arr = [...quotes];
            let res = 0;

            for(let i = 1 ; i < arr.length+2; i ++){
                res = i;
                arr.forEach(item => +item.id.match(/\d+/) === i ? res = 0 : null);                
                if(res != 0) break;
            }
            
            arr.push({
                id: `id-${res}`,
                name: nam,
                url: url,
                description: e.target.text.value
            });
            dispatch({type: 'CHANGE_IMG_ARAY', payload: arr});
            closeModal('add_back');
        }
    }

    return (
        <div onClick={(e) => closeModal(e.target.id)} id='add_back' className='add_back'>
            <div className='add'>
                <form onSubmit={(e) => onSubmit(e)}>
                    <p>Добавьте изображение заполнив поля:</p><br/>
                        <label className='add_url_label' htmlFor='nam'>Название: {nameError && 
                            <span className='add_errors'>{nameError}</span>}</label><br/>
                        <input 
                            maxLength={50}
                            className='add_input' 
                            name='nam'></input>
                        <label className='add_url_label' htmlFor='url'>URL - адрес: {urlError && 
                            <span className='add_errors'>{urlError}</span>}</label><br/>
                        <input className='add_input' name='url'></input>
                        <label className='add_url_label' htmlFor='text'>Описание:</label><br/>
                        <textarea className='add_textarea' maxLength={500} placeholder='максимум 500 символов' name='text'></textarea>
                        <div className='edit_buttons flex'>
                        <button 
                            onClick={(e) => closeModal(e.target.id)} 
                            id='cancel' 
                            className='edit_buttons_cancel'>Отмена</button>
                        <button 
                            type='submit'
                            // onClick={() => save()} 
                            className='edit_buttons_save'>Сохранить</button>
                    </div>
                </form>
               
            </div>
        </div>
    )
}