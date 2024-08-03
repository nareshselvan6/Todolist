import React, { useEffect, useState } from "react";
import "../Components/Todo.css";
import axios from "axios";

const Todo = () => {

    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[response,setResponse]=useState("")  
    const[render,setRender]=useState(false)
    const[fetchdata,setFetchdata]=useState("")
    const[createbtn,setCreatebnt]=useState(false)

    // For edit purpose

    const[edittitle,setEdittitle]=useState("")
    const[editdescription,setEditdescription]=useState("")
    const[editmodal,setEditmodal]=useState(false)
    const[editid,setEditid]=useState("")

    


      // Get Todos

  const gettodo=async()=>{
    try {
        await axios.get("https://todobackend-samv.onrender.com/api/gettodo")
        .then(res=>setFetchdata(res.data))
        
    } catch (error) {
        console.log(error);
        
        
    }
  }

  // New Todo
  const newtodo =async ()=>{
    setCreatebnt(true)
  }

    // Create Todos

  const createtodo = async (e) => {
      
      e.preventDefault();
      
    const payload = {title,description}

    try {
         await axios.post("https://todobackend-samv.onrender.com/api/createtodo", payload)
        .then(res=>setResponse(res.data),
        setTitle(""),
        setDescription(""),  
        setCreatebnt(false)
    )
   setRender(true)
        
    } catch (error) {
        console.log(error);
        
    }
  };

  // Update Todo

  const update=async(id)=>{
    console.log(id);

    const payload={edittitle,editdescription}
    console.log(payload);
    
    
    try {
        await axios.put(`https://todobackend-samv.onrender.com/api/puttodo/${id}`,payload)
        .then(
            setEditmodal(false),
            setRender(true)
        )


    } catch (error) {
        console.log(error);
        
    }
  }




  // Edit Todo

  const edittodo=async(todo)=>{
    try {
      console.log(todo);
      setEdittitle(todo.title);
      setEditdescription(todo.description);
      setEditid(todo._id);
      setEditmodal(true)
        
    } catch (error) {
        console.log(error);
        
        
    }
  }

  // Delete Todos
  const deletetodo=async(id)=>{
    
    try {        
        await axios.delete(`https://todobackend-samv.onrender.com/api/deletetodo/${id}`)
        .then(setRender(true))
        
    } catch (error) {
        console.log(error);
        
        
    }
  }



  useEffect(()=>{
    gettodo()
    setRender(false)

  },[render])

  return (
    <div>
      <div className="total_content">
        <div className="todolist">
          <div className="titleholder">
            <h1 className="title">Todo List</h1>
          </div>

         {createbtn? (<div className=" form_holder d-flex justify-content-center">
            <form className="form" onSubmit={createtodo}>
              <input type="text" className="inputbx" placeholder=" Title" value={title}  onChange={(e)=>setTitle(e.target.value)}/>
              <input type="text" className="inputbx" placeholder=' Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
              <button type="submit" className="btn btn-primary">
                Create 
              </button>
              <i class="fa fa-times-circle btn" aria-hidden="true" onClick={()=>setCreatebnt(false)}/>
            </form>
          </div>):(<div className="d-flex justify-content-center m-3">
            <button className=" btn btn-primary " onClick={newtodo} >Create ToDo</button>
          </div>
          )}

          <div className="mytodoholder">
            <div className="mytodos_title">
              <h1>My ToDo's</h1>
            </div>

            <div className="alltodos">
                {fetchdata?.gettodo?.map((ele,index)=>{
                    return(
                           <div className="todos" key={index}>
                    <div>
                        <h1><b>Title:</b><p>{ele.title}</p></h1>
                        <hr />
                    </div>
                    <div>
                        <p><b>Description:</b><p>{ele.description}</p></p>
                    </div>
                    <div>
                        <p><b>Created Date:</b>{ele.createdate}</p>
                    </div>

                    <div className="Ed-Dt_btn">
                        <button className="edit_btn ed_dt" onClick={()=>edittodo(ele)}><i class="fa fa-pencil-square" aria-hidden="true"/> Edit</button>
                        <button className="delete_btn ed_dt" onClick={()=>deletetodo(ele._id)}><i class="fa fa-trash" aria-hidden="true"/> Delete</button>
                    </div>

                </div>
                )
                    
                })}
             

            </div>

          </div>
        </div>
      </div>
   
      {editmodal && (
  <div
    className="modal fade show"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Update Todo</h1>
          <button
            type="button"
            className="btn-close btn btn-danger"
            onClick={() => setEditmodal(false)}
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                value={edittitle}
                onChange={(e) => setEdittitle(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">Description:</label>
              <textarea
                className="form-control"
                id="message-text"
                value={editdescription} 
                onChange={(e) => setEditdescription(e.target.value)} 
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setEditmodal(false)}
          >
            Close
          </button>
          <button type="submit" className="btn btn-success" onClick={()=>update(editid)}>
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
)


   } 
    </div>
  );
};

export default Todo;
