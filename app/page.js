"use client"
import { useEffect } from "react";
import Header from "../Components/Header"
export default function Home() {
  useEffect(()=>{
    const fetchApi = async()=>{
      const data = await fetch('http://localhost:8000/products')
      .then((res) => res.json())
      .then((data) => {
        console.log("products data", data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
    }
    fetchApi();
  })
  return (
    <>
    <Header/>
    </>
  );
}
