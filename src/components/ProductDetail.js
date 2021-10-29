import "../App.css";
import "../style.css";
import axios from "axios";
import { useState } from "react";
import { CATEGORY } from "../constants";
import { useHistory } from "react-router-dom";

function ProductDetail(props) {
  const history = useHistory();
  const [title, setTitle] = useState(props.data[0].title);
  const [desc, setDesc] = useState(props.data[0].desc);
  const [category, setCategory] = useState(props.data[0].category);
  const [price, setPrice] = useState(props.data[0].price);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "desc":
        setDesc(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      default:
    }

  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://jason-11.herokuapp.com/mongoProductUpdate", {
        id: props.data[0]._id,
        category: category,
        title: title,
        desc: desc,
        price: price,
      })
      .then((res) => {
        if (res.data.length <= 0) {
          alert("Product update fail");
        } else {
          alert(`Product update successful!`);
          props.getData({});
          history.push("/ProductList");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .post("https://jason-11.herokuapp.com/mongoDelete", {
        id: props.data[0]._id,
      })
      .then((res) => {
        alert(`Product delete successful!`);
        props.getData({});
        history.push("/ProductList");
      })
      .catch((err) => console.log(err));
  };


  let i = 0;
  const catSelect = CATEGORY.filter((data) => data !== "all").map((data) => (
    <option value={data} key={i++}>{data}</option>
  ));

  return (
    <div className="container" key={props._id}>
      <div className="d-flex justify-content-center h-100">
        <div className="card-product">
          <div className="card-header">
            <h3>Kijijo Product Detail</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdateSubmit}>
              <div className="input-group form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="form-select"
                  aria-label="select category"
                  onChange={handleChange}
                  value={category}
                  required
                  disabled={
                    props.userInfo.userName !== props.data[0].register_user
                  }
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
                  disabled={
                    props.userInfo.userName !== props.data[0].register_user
                  }
                />
              </div>

              <div className="input-group form-group">
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
                  disabled={
                    props.userInfo.userName !== props.data[0].register_user
                  }
                />
              </div>
              <div className="input-group form-group">
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
                  disabled={
                    props.userInfo.userName !== props.data[0].register_user
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update"
                  className="btn float-right btn-primary"
                  disabled={
                    props.userInfo.userName !== props.data[0].register_user
                  }
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  value="Delete"
                  className="btn float-right btn-primary"
                  onClick={handleDelete}
                  disabled={
                    props.userInfo.userName !== props.data[0].register_user
                  }
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
