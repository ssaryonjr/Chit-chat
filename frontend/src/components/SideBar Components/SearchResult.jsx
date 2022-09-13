import React from 'react'

function SearchResult(props) {
  const loading = props.loading
  const data = props.data
  console.log(data)
  return (
    <>
      {loading
        ? <div className='loading-wrapper'><span className="loading__anim"></span></div>
        : <div className="user-list-wrapper">
          It works
        </div>
      }
    </>
  )
}

export default SearchResult