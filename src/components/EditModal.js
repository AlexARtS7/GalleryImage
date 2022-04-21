import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function EditModal({quotes}) {
    const dispatch = useDispatch();
    const quote = useSelector(state => state.edit)
    const textarea = useRef();

    const gallery = document.getElementById('gallery');
    if(gallery) gallery.style.overflow = 'hidden';

    const closeModal = (id) => {
        if(id != 'back' && id != 'cancel') return;
        if(gallery) gallery.style.overflow = 'auto';
        dispatch({type: 'CHANGE_EDIT_STATUS', payload: false});
    };

    const saveDescription = () => {
        const arr = [...quotes];
        arr.forEach((item, i) => item.id === quote.id ? arr[i].description = textarea.current.value : null );
        dispatch({type: 'CHANGE_IMG_ARAY', payload: arr});
        closeModal('back');
    }

    return (
        <div onClick={(e) => closeModal(e.target.id)} id='back' className='edit_back'>
            <div className='edit'>
                <p>Добавьте или измените описание к изображению:</p><br/>
                {quote.name && <p className='gallery_img_title'>{quote.name}</p>}<br/>
                <textarea className='edit_textarea' maxLength={500} ref={textarea} defaultValue={quote.description}></textarea>
                <div className='edit_buttons flex'>
                    <button onClick={(e) => closeModal(e.target.id)} id='cancel' className='edit_buttons_cancel'>Отмена</button>
                    <button onClick={() => saveDescription()} className='edit_buttons_save'>Сохранить</button>
                </div>
            </div>
        </div>
    )
}