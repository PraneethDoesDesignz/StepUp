import React from 'react'
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-navbox">Description</div>
        <div className="descriptionbox-navbox fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ullam quae iure nobis, aut, et quisquam, temporibus adipisci ea minus sunt atque saepe numquam magnam magni neque aperiam modi ducimus?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum ullam velit necessitatibus esse nesciunt itaque minus, repellendus possimus odit mollitia omnis officia aliquam explicabo pariatur distinctio assumenda. Id, amet iure.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
