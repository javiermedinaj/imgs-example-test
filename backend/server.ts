import { serve } from "bun";

const products = [
  { id: 1, name: "product1", price: 100 },
  { id: 2, name: "product2", price: 912 },
];

const server = serve({
  port: 3001,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/products") {
      return new Response(JSON.stringify(products), {
        headers: { "Content-type": "application/json" },
      });
    }

    return new Response("Not found ", { status: 404 });
  },
});

console.log(`Server running at http://localhost:3000`);
