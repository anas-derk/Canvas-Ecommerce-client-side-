import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";

const Cart = () => {
    const [canvasEcommerceProductsList, setCanvasEcommerceProductsList] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let canvasEcommerceProducts = JSON.parse(localStorage.getItem("canvas-ecommerce-products"));
        if (canvasEcommerceProducts) {
            setCanvasEcommerceProductsList(canvasEcommerceProducts);
            let total = 0;
            canvasEcommerceProducts.forEach((product) => {
                total += product.price * product.count;
            });
            setTotal(total);
        }
    }, []);
    const deleteProduct = (id) => {
        let canvasEcommerceProducts = JSON.parse(localStorage.getItem("canvas-ecommerce-products"));
        canvasEcommerceProducts = canvasEcommerceProducts.filter((product) => product._id != id);
        localStorage.setItem("canvas-ecommerce-products", JSON.stringify(canvasEcommerceProducts));
        setCanvasEcommerceProductsList(canvasEcommerceProducts);
    }
    const deleteAllProductsFromCart = () => {
        localStorage.removeItem("canvas-ecommerce-products");
        setCanvasEcommerceProductsList([]);
    }
    const orderAllProductsFromCart = () => {
        console.log("b")
    }
    return (
        // Start Cart Page
        <div className="cart bg-info">
            <Head>
                <title>Tavlorify Store - Cart</title>
            </Head>
            <Header />
            {/* Start Container From Bootstrap */}
            <div className="container pt-4 pb-4">
                <h1 className="text-center mb-4">Hello To You In Cart Page</h1>
                {canvasEcommerceProductsList.length > 0 ? <table className="products-table mb-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>dimentions</th>
                            <th>price</th>
                            <th>Image</th>
                            <th>Count</th>
                            <th>Total Price</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canvasEcommerceProductsList.map((productInfo, index) => (
                            <tr key={index}>
                                <td className="product-name-cell">
                                    {productInfo.name}
                                </td>
                                <td>
                                    {productInfo.type}
                                </td>
                                <td>
                                    {productInfo.dimentions}
                                </td>
                                <td className="product-price-cell">
                                    {productInfo.price}
                                </td>
                                <td className="product-image-cell">
                                    <img src={`${process.env.BASE_API_URL}/${productInfo.imageSrc}`} alt={`${productInfo.name}`} width="100" height="100" />
                                </td>
                                <td className="product-count-cell">
                                    {productInfo.count}
                                </td>
                                <td className="total-price-cell">
                                    {productInfo.price * productInfo.count}
                                </td>
                                <td className="proceses-cell">
                                    <button
                                        className="btn btn-danger d-block mx-auto mb-3"
                                        onClick={() => deleteProduct(productInfo._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-success"
                                    >
                                        Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {canvasEcommerceProductsList.length >= 2 && <tr>
                            <td colSpan={7}>
                                total: { total }
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger d-block mx-auto mb-3"
                                    onClick={deleteAllProductsFromCart}
                                >
                                    Delete All
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={orderAllProductsFromCart}
                                >
                                    Order All
                                </button>
                            </td>
                        </tr>}
                    </tbody>
                </table> : <p className="alert alert-danger">Sorry, Not Found Any Products Added To Your Cart !!</p>}
            </div>
            {/* End Container From Bootstrap */}
        </div >
        // End Cart Page
    );
}

export default Cart;