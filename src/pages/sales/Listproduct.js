import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link, useNavigate } from "react-router-dom";

export default function Product() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                "/product-list",
                {
                    params: {
                        page,
                        limit: rowsPerPage,
                    },
                }
            );

            const { data, currentPage, lastPage } = response.data;

            const formattedProducts = data.map((item, index) => ({
                srno: (currentPage - 1) * rowsPerPage + index + 1,
                name: item.name || "-",
                description: item.description || "-",
                Price: `Rs.${item.price}/-` || "-",
                productimg: item.image || "",
            }));

            setProducts(formattedProducts);
            setTotalPages(lastPage);
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error?.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, rowsPerPage]);

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const columns = [
        { title: "#", dataIndex: "srno", key: "srno" },
        { title: "Product Name", dataIndex: "name", key: "name" },
        {
            title: "Product Image",
            dataIndex: "productimg",
            key: "productimg",
            render: (src) => (
                <div className="m-auto flex justify-center">
                    <img
                        src={src || "/assets/image/shirt.webp"}
                        alt="productimg"
                        width="50"
                        height="50"
                        className="rounded"
                    />
                </div>
            ),
        },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Price", dataIndex: "Price", key: "Price" },
    ];

    return (
        <Layout>
            <div className="bg-white p-4 mb-2 rounded-lg mt-14">
                <h3 className="text-defaulttextcolor text-[1.125rem] font-semibold">
                    Product List
                </h3>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg">
                    <div className="flex justify-end mb-3 p-2">
                        <Link
                            to="/Add-product"
                            className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                        >
                            Add Product
                        </Link>
                    </div>
                    <Table
                        cols={columns}
                        data={products}
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                        isTableLoading={isLoading}
                    />
                </div>
            </div>
        </Layout>
    );
}
