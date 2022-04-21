import React, {useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import GalleryItem from "../components/GalleryItem";
import EditModal from '../components/EditModal';
import PreviewModal from "../components/PreviewModal";
import AddModal from "../components/AddModal";

import add from '../resources/add.png';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  function Quote({ quote, index, quotes }) {
    return (
        <Draggable draggableId={quote.id} index={index}>
          {provided => (
            <div className="gallery_item flex_between" 
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <GalleryItem quote={quote} quotes={quotes}/>
            </div>
          )}
        </Draggable>  
    );
  };
  
  const QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => (
      <Quote quote={quote} index={index} quotes={quotes} key={quote.id}/>
    ));
  });

export default function GalleryPage() {  // !!!!!!!!!
    const dispatch = useDispatch();
    const quotes = useSelector(state => state.images);
    const editModal = useSelector(state => state.edit);
    const previewModal = useSelector(state => state.preview);
    const addModal = useSelector(state => state.add);
    const state = useSelector(state => state);

    function onDragEnd(result) {
    if (!result.destination) {
      return;
    };

    if (result.destination.index === result.source.index) {
      return;
    };

    const items = reorder(
      quotes,
      result.source.index,
      result.destination.index
    );
    
    dispatch({type: 'CHANGE_IMG_ARAY', payload: items})
    };

    const onAdd = () => {
      dispatch({type: 'CHANGE_ADD_STATUS', payload: true});
    };

    useEffect(() => {
      localStorage.setItem('initial', JSON.stringify(state));
    }, [state]);

    return (
      <div className='gallery' id='gallery'>
        {editModal && <EditModal quotes={quotes}/>}
        {previewModal && <PreviewModal/>}
        {addModal && <AddModal quotes={quotes}/>}
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}
                    className="gallery_list">
                    <QuoteList quotes={quotes}/>
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext> 
        <img onClick={() => onAdd()} className='gallery_add' src={add} alt='AddImage'/>
      </div>            
    )
}