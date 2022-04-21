import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function PreviewModal() {
    const dispatch = useDispatch();
    const quote = useSelector(state => state.preview)
    const preview = useRef();

    const closeModal = (id) => {
        if(id != 'preview_back') return;
        dispatch({type: 'CHANGE_PREVIEW_STATUS', payload: false});
    };
    
    useEffect(() => {
        const block = preview.current;
        block.style.left = `calc(50% - ${block.clientWidth/2}px)`
    }, []);

    return (
        <div onClick={(e) => closeModal(e.target.id)} id='preview_back' className='preview_back'>
            <div className='preview' ref={preview}>
                <img className='preview_img' src={quote.url} alt='image'/>
            </div>
        </div>
    )
}