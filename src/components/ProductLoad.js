import "../App.css";
import "../style.css";
import axios from "axios";
import { useState } from "react";
import { CATEGORY } from "../constants";
import { useHistory } from "react-router-dom";

function ProductLoad(props) {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(CATEGORY.filter(data => data !== 'all')[0]);
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "desc") {
      setDesc(e.target.value);
    } else if (e.target.id === "category") {
      setCategory(e.target.value);
    }
   else if (e.target.id === "price") {
    setPrice(e.target.value);
   }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://jason-11.herokuapp.com/mongoProductLoad", {
        category: category,
        title: title,
        desc: desc,
        price: price,
        register_user: props.userInfo.userName
      })
      .then((res) => {
        if (res.data.length <= 0) {
          alert("Product registration fail");
        } else {
          if (res.data === "already exists") {
            alert(`Product load failed. Same title already exists!`);
          } else {
            alert(`Product load successful!`);
            props.getData({})
            history.push("/ProductList");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  //not including all when registering
  let i = 0;
  const catSelect = CATEGORY.filter(data => data !== 'all').map((data) => (
    <option value={data} key={i++}>{data}</option>
  ));

  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card-product">
          <div className="card-header">
            <h3>Kijijo Product Load</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="form-select"
                  aria-label="select category"
                  onChange={handleChange}
                  value={category}
                  required
                >
                  {catSelect}
                </select>
              </div>

              <div className="input-group form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  placeholder="title"
                  value={title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group form-group" >
                <label htmlFor="desc">Description</label>
                <textarea
                  id="desc"
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  rows={5}
                  value={desc}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group form-group" >
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  className="form-control"
                  placeholder="price"
                  min={0}
                  value={price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Save"
                  className="btn float-right btn-primary"
                />
              </div>
            </form>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductLoad;
