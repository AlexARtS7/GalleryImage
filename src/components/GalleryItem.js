import { useState } from 'react';
import { useDispatch } from 'react-redux';

import del from '../resources/delete.png';
import edit from '../resources/edit.png';

import noImage from '../resources/noimage.jpg';

export default function GalleryItem({quote, quotes}) {
    const dispatch = useDispatch();
    const [vis, setVis] = useState('hidden');

    const onDelete = () => {
        const arr = [...quotes];
        arr.forEach((item, i) => item.id === quote.id ? arr.splice(i,1) : null );
        dispatch({type: 'CHANGE_IMG_ARAY', payload: arr});
    };

    const onEdit = () => {
        dispatch({type: 'CHANGE_EDIT_STATUS', payload: quote});
    };

    const onPreview = () => {
        dispatch({type: 'CHANGE_PREVIEW_STATUS', payload: quote});
    };

    return (
        <>
            <div className='gallery_img_block'>
                {vis == 'hidden' && 
                    <img className='gallery_img_placeholder' src={noImage} alt='NoImage'/>}
                <img 
                    style={{'visibility': vis}}
                    onLoad={() => setVis('visible')}
                    className='gallery_img' 
                    onClick={() => onPreview()} 
                    src={quote.url} alt='image'/>
            </div>   
            <div className='gallery_description_block'>
                {quote.name && <p className='gallery_img_title'>{quote.name}</p>}
                {quote.description && 
                    <>
                        <br/><p>Описание:</p><br/>
                        {quote.description.length > 400 ?
                        <p>{quote.description.slice(0, 400) + '...'}</p> :
                        <p>{quote.description}</p>}
                    </>}
            </div> 
                <img onClick={() => onEdit()} src={edit} className='gallery_buttons_edit'></img> 
                <img onClick={() => onDelete()} src={del} className='gallery_buttons_delete'></img> 
                <p className='gallery_id'>{quote.id}</p> 
            
        </>
    )
}
