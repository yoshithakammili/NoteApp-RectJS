import React, { useState } from 'react';
import noimageNote from './img_no_note.png'; 
import lock from './lock.png'
import './empty_note.css'
function EmptyNoteComponent(){

    return(
        <div className='no_img_container'>
             <img className="centered_img" src={noimageNote}/>
             <p className='pocket_notes'>Pocket Notes</p>
             <p className='para'>Send and receive messages without keeping your phone online.<br/> Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
             <div className='bottom_center'>
             <img  src={lock}/> &nbsp; &nbsp;<span>end-to-end encrypted</span>
             </div>
        </div>
    );

}
export default EmptyNoteComponent;
