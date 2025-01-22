import React from "react";
import Product from "./Product";


const Home: React.FC = () => {
  return (
    // ...existing code...
    <div className="z-0 pt-28 w-full min-h-screen mx-auto px-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">
        Home
      </h1>
      <section className="py-8 px-4 h-[40vh] bg-blue-200 rounded-lg">
        <h5 className="text-2xl font-bold">Escolhas feitas para você</h5>
      </section>
    </div>
// ...existing code...
  );
}

export default Home