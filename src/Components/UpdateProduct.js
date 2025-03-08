import Header from "./Header";
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from "react";
import { Image } from 'react-bootstrap';

function UpdateProduct() {
    const params = useParams()
    const id = params.id
    const [data, setData] = useState([])
    const fetchCalled = useRef(false);

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        async function getProduct(params) {
            try {
                // console.log("fetch for id", id)
                let result = await fetch(`http://127.0.0.1:8000/api/product/${id}/`)
                result = await result.json()
                // console.log(result)
                setData(result)
                setName(result.name)
                setDescription(result.description)
                setPrice(result.price)
            }
            catch (error) {
                console.error("Error fetching product:", error);
            }
        }

        if (id && !fetchCalled.current) {
            // console.log("id", id)
            fetchCalled.current = true
            getProduct()
        }
    }, [id])
    async function UpdateData(event){
        event.preventDefault()
        // console.log("hello", id)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);

        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        
        try{
            let response = await fetch(`http://127.0.0.1:8000/api/product/${id}/`,{
                method:"PATCH",
                body:formData
            })
            let result = await response.json()

            if (response.ok){
                console.log("product update successfully")
            }
            else{
                console.log("failed to update product")
            }
        }
        catch (error) {
            console.error("Error updating product:", error);
        }
    }
    return (
        <div>
            <Header />
            <h1>Update Product Page</h1>
            <div className="row mx-auto col-6 mt-4">
                {/* img start */}
                <div className="col-5 p-0 my-auto">
                    <Image  src={`http://127.0.0.1:8000${data.img}`}
                        alt={`Image of ${data.name}`} fluid/>
                </div>
                {/* img end  */}
                <div className="col-7">
                    <form onSubmit={UpdateData}>
                        <label>Name</label>
                        <p className="mb-3">
                            <input type="text" 
                            onChange={(e)=>setName(e.target.value)}
                            className="form-control" defaultValue={data.name} />
                        </p>
                        <label>Descriptin</label>
                        <p className="mb-3">
                            <textarea 
                            onChange={(e)=>setDescription(e.target.value)}
                            type="text" rows="6" className="form-control" defaultValue={data.description} />
                        </p>
                        <label>Price</label>
                        <p className="mb-3">
                            <input
                             onChange={(e)=>setPrice(e.target.value)} 
                            type="number" className="form-control" defaultValue={data.price} />
                        </p>

                        <p>
                            <button className="form-control btn btn-primary">Update</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default UpdateProduct;