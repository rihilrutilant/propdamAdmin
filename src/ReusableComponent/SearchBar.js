import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <div className="bottom_div">
            <span id="filter">Filter by date Range:</span>
            <div className="right_div">
                <div className="from">
                <span>From</span>
                <input type="date" name="date" id="date" />
                </div>
                <div className="to">
                <span>To</span>
                <input type="date" name="date" id="date" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar