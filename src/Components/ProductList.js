import Header from "./Header"
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductList() {
    const [data, setData] = useState([])
    useEffect(() => {
        GetData()
    }, [])
    // console.log(data)
    const GetData = async () => {
        try {
            let response = await fetch("http://127.0.0.1:8000/api/product/list/");

            // Response empty kina check koro
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            // JSON response parse koro
            let result = await response.json();

            // console.log(result);
            setData(result)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    async function RemoveProduct(pk) {
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/product/remove/${pk}`, {
                method: "DELETE"
            });

            // Response status check koro
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            // 204 No Content response handle koro (empty response error fix)
            let result = response.status === 204 ? {} : await response.json();
            console.log(result);

            // Data reload koro
            GetData();
        } catch (error) {
            console.error("Error removing product:", error);
        }
    }
    return (
        <div>
            <Header />
            <h1 className="mt-3">Product List</h1>
            <div className="col-sm-8 mx-auto mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <td >{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price} , BDT</td>
                                    <td>
                                        <img style={{ width: '110px' }}
                                            src={`http://127.0.0.1:8000${item.img}`}
                                            alt={`Image of ${item.name}`}
                                        />
                                    </td>
                                    <td>
                                        <p>
                                            <Button className="btn btn-danger" onClick={() => { RemoveProduct(item.id) }}>Remove</Button>
                                        </p>

                                        <p>
                                            <Link to={"updateProduct/"+item.id}>
                                                <Button className="btn btn-success">Update</Button>
                                            </Link>
                                        </p>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default ProductList;