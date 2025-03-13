import Header from "./Header";
import { useState, useEffect } from "react";


function SearchProduct() {
    const [searchKey, setSearchKey] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (suggestions.length > 0) {
            setShowSuggestions(true); // Show suggestions when data is available
        } else {
            setShowSuggestions(false); // Hide suggestions when there's no data
        }
    }, [suggestions]);


    async function SearchSuggestion(key) {
        if (key.length < 1) {  // 2 অক্ষরের কম হলে API call করবে না
            document.getElementById("suggestions").innerHTML = "";
            return;
        }

        let result = await fetch(`http://127.0.0.1:8000/api/products/?search=${key}`)
        // api response ke json e convert kora hocca
        result = await result.json()
        // console.log(result)
        setSuggestions(result); // Suggestions state এ response store করা হচ্ছে
    }
    return (
        <div>
            <Header />
            <div className="col-sm-4 mx-auto">
                <h1>Search Product</h1>
                <p className="mt-4 input-with-icon">
                    <i className="fa-solid fa-magnifying-glass "></i>
                    <input
                        type="text"
                        id="search"
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value); // Search key update হচ্ছে
                            SearchSuggestion(e.target.value); // SearchSuggestion call হচ্ছে
                        }}
                        className="form-control"
                        placeholder="Search product"
                    />
                </p>
                <div id="suggestions" className="suggestion-box">
                    {showSuggestions &&
                        suggestions.map((product) => (
                            <div
                                key={product.id}
                                className="suggestion-item"
                                onClick={() => {
                                    // Handle product selection
                                    setSearchKey(product.name); // Set product name to input
                                    setShowSuggestions(false); // Hide suggestions after selecting
                                }}
                            >
                                <div className="suggestion-name border" style={{textAlign:"left"}}>{product.name}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default SearchProduct;