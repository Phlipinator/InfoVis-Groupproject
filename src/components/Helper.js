import React, { useState } from "react";
import "./../styles/Helper.css";
import helper_img_overview from "../OverviewHelperSmall.png"
import helper_img_comparison from "../CompareHelperSmall.png"

/**
* Creates Helper Button with Overlay text and image. 
*
* @returns {JSX.Element}
*/
export default function Helper(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function showImage() {
    if (props.overview) {
      return <img src={helper_img_overview}/>
    } else return <img src={helper_img_comparison}/>
  }

  return (
    <>
    <p  align="right">
      <button onClick={toggleModal} className="btn-modal" >
        Help
      </button>
    </p>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"/>
          <div className="modal-content">
            <p>
              <b>Welcome!</b> <br/>
              Please feel free to checkout this webpage about the top five European
              Patent Applicators: United Kingdom, Germany, Italy, Swiss and France.
              This webpage contains two views to analyize patent data about those five countries.
              Further, the data is classified into eight categories, which are given in the bottom left corner.
              For more information check out the given picture. <br/>
              Have fun exploring!
            </p>
            {showImage()}
            <button className="close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      )}

    </>
  );
}