import Product from "./Product";

const ProductList = (props) => {
  return (
    <div className="card-product">
      <div className="row">
        <div className="col-sm table-primary">
          CATEGORY
        </div>
        <div className="col-sm table-primary">
          TITLE
        </div>
        <div className="col-sm table-primary">
          PRICE
        </div>
        <div className="col-sm table-primary">
          OWNER
        </div>
        <div className="col-sm table-primary"></div>
      </div>
      {props &&
        props.data.map((data) => (
          <Product
            category={data.category}
            title={data.title}
            price={data.price}
            keyIdx={data._id}
            eachProdSet={props.eachProdSet}
            userName={data.register_user}
            key={data._id}
          />
        ))}
    </div>
  );
};

export default ProductList;
