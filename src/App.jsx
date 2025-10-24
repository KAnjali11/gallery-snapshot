import React, { useState } from 'react';
import './App.css';
// import './index.html'
const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
   

    fetch(`https://api.pexels.com/v1/search?query=${search}&per_page=300`, {
      headers: {
        Authorization: 'dACny865tWySMRoOmLC0n0IRFvldOUJzWdcdeinp2LvwqpMp7h5EHLGE'
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result.photos);
        setData(result.photos);
      })
      .catch(err => console.error("Error fetching data:", err));
  };

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <center>
        <form onSubmit={onSubmitHandler}>
          <h2 className='heading'>Gallery Snapshots</h2>
          <input
          className='textarea'
            type="text"
            placeholder="Search for images..."
            value={search}
            onChange={onChangeHandler}
          />
          <br /><br />
          <input type="submit" value="Search" className='searchbutton'/>
        </form>

        {/* Display fetched images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "10px",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          {Array.isArray(data) && data.map((img) => (
            <div key={img.id}>
              <img
                src={img.src.medium}
                alt={img.photographer}
                style={{
                  width: "90%",
                  height:"90%",
                  borderRadius: "0px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}
              />
              {/* <p style={{ fontSize: "14px" }}>{img.photographer}</p> */}
            </div>
          ))}
        </div>
      </center>
    </div>
  );
};

export default App;
