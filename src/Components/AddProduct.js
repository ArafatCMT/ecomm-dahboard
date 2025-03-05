import Header from "./Header";
import {useState} from 'react'


function AddProduct(){
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const submit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("img", img); // Image file

        
    
        try {
            const response = await fetch("http://127.0.0.1:8000/api/product/", {
                method: "POST",
                body: formData, // FormData directly pathhachi
            });
    
            if (!response.ok) {
                throw new Error("Failed to upload product");
            }
    
            const data = await response.json();
            // alert("Product Added Successfully!");
            console.log("Product Added Successfully!",data);
        } catch (error) {
            console.error("Error uploading product:", error);
        }
    };
    
    return(
        <div>
            <Header />
            <div className="col-sm-4 mx-auto">
            <form className="mt-4" onSubmit={submit}>
                    <input type="text"  onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Product Name" />
                    <br />
                    <input type="file"  onChange={(e)=>setImg(e.target.files[0])} className="form-control" placeholder="Image" />
                    <br />
                    <input type="text" onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Price" />
                    <br />
                    <input type="text" onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Description" />
                    <br />
                    <button className="form-control btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    )
}
export default AddProduct;