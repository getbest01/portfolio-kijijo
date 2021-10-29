import { useHistory } from "react-router-dom";

const Product = (props) => {
  const history = useHistory();

  const openDetail = (e) => {
    props.eachProdSet(e.target.id);
    history.push("/ProductDetail");
  };

  return (
    <div className="row" key={props.keyIdx} id={props.keyIdx}>
      <div className="col-sm table-secondary" key={"1"}>
        {props.category}
      </div>
      <div className="col-sm table-secondary" key={"2"}>
        {props.title}
      </div>
      <div className="col-sm table-secondary" key={"3"}>
        {props.price}
      </div>
      <div className="col-sm table-secondary" key={"4"}>
        {props.userName}
      </div>
      <div className="col-sm table-secondary" key={"5"}>
        <button
          id={props.keyIdx}
          onClick={openDetail}
          className="btn btn-primary table-secondary"
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default Product;
