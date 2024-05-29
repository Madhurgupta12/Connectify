import React, { useState, useEffect,useContext} from "react";
import "../index";
import {UserContext} from "../App"
const Home = () => {
  const [data, setData] = useState([]);
  const {state,dispatch}=useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:5001/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);
  const likePost = (id) => {
    fetch("http://localhost:5001/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const dislikePost = (id) => {
    fetch("http://localhost:5001/dislike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
       body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }
const makeComment=(text,postId)=>{
  fetch("http://localhost:5001/comment",{
    method:"PUT",
    headers:{
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ localStorage.getItem("jwt")
    },
    body: JSON.stringify({
    postId,
    text
    })
  }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
    })
    setData(newData);

  }).catch(err => {
    console.log(err);
  })


}

const deletedPost=(postid)=>{

fetch(`http://localhost:5001/deletepost/${postid}`,{
  method:"delete",
  headers:{
    "content-type": "application/json",
    Authorization:"Bearer "+localStorage.getItem("jwt")
  }

}).then(res=>res.json())
.then(result=>{
  console.log(result);
  const newData=data.filter(item=>{
    return item.id_==result.id
  })
  setData(newData)
})

}
















  return (
    <div className="home bg-gradient-to-r from-red-400 via-yellow-400 to-red-400">
      {data.map((item) => {
        return (
          <>
            <div key={item._id} className="card home-card">

              <h5>{item.postedBy.name}</h5>
              {item.postedBy._id==state.id?<i
                onClick={()=>{deletedPost(item._id)}}
                className="material-icons cursor-pointer"
              >
                delete
              </i>:"No deleted Option"}

              <div className="card-image">
                <img className="ii" src={item.photo} alt="No photo present" />
              </div>
              <div className="card-content">
                <h6>{item.title}</h6>
                <br />

                <i className="material-icons" style={{ color: "red" }}>
                  favorite
                </i>
                <i
                  onClick={() => likePost(item._id)}
                  className="material-icons cursor-pointer"
                >
                  thumb_up
                </i>
                <i
                  onClick={() => dislikePost(item._id)}
                  className="material-icons cursor-pointer"
                >
                  thumb_down
                </i>
                <h6>{item.likes.length} Likes</h6>
                {/* <h6>{item.likes.length} UnLikes</h6> */}
                <p>{item.body}</p>
                {
                  item.comments.map(record=>{
                    return (
                      <h6 className="">{record.postedBy.name+ " "}<span className="font-extrabold">{record.text}</span></h6>
                    )
                  })
                }
                <form  onSubmit={(e)=>{
                  e.preventDefault();
                  makeComment(e.target[0].value,item._id)

                }}>
                <input type="text" placeholder="Type your comment" />
                </form>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};


export default Home;
