import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState();
    const [email, setEmal] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setFirstName(e.target.value);
    }

    const lastNameO = (e) => {
        setLastName(e.target.value);
    }

    const setBarcode = (e) => {
        setEmal(value);
    };


    const {id} = useParams("");

    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await fetch(`http://localhost:3001/user/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
      
            const data = await res.json();
      
            if (res.status === 201) {
                alert("Data Inserted");
                setFirstName("");
                setLastName("");
                setEmal("");
            } else {
              console.log("Something went wrong. Please try again.");
            }
          } catch (err) {
            console.log(err);
          }
        };
      
        getProduct();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "firstName": firstName, "lastName": lastName, "email": email })
            });

            await response.json();

            if (response.status === 201) {
                alert("Data Updated");
                navigate('/products');
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
            <h1 className=''>Enter User Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_name" className="form-label fs-4 fw-bold">First Name</label>
                <input type="text" onChange={setName} value={productName} className="form-control fs-5" id="product_name" placeholder="Enter Product Name" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_price" className="form-label fs-4 fw-bold">Last Name</label>
                <input type="number" onChange={lastNameO} value={productPrice} className="form-control fs-5" id="product_price" placeholder="Enter Product Price" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_barcode" className="form-label fs-4 fw-bold">Email</label>
                <input type="number" onChange={setBarcode} value={productBarcode} maxLength={12} className="form-control fs-5" id="product_barcode" placeholder="Enter Product Barcode" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/products" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={updateProduct} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
            </div>
            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
