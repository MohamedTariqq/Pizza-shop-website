import Layout from "@/components/Layout";
import css from "../styles/cart.module.css";
import { useStore } from "../store/store";
import Image from "next/image";
import { urlFor } from "../lib/client";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  const CartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);

  const handleRemover = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };
  const total = () =>
    CartData.pizzas.reduce((a, b) => a + b.count * b.price, 0);

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Name </th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={css.tbody}>
              {CartData.pizzas.length > 0 &&
                CartData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image
                          loader={() => src}
                          src={src}
                          alt=""
                          objectFit="cover"
                          width={85}
                          height={85}
                        />
                      </td>
                      <td>{pizza.name}</td>
                      <td>
                        {pizza.size === 0
                          ? "small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Large"}
                      </td>
                      <td>{pizza.price}</td>
                      <td>{pizza.count}</td>
                      <td>{pizza.price * pizza.count}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemover(i)}
                      >
                        ❌
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{CartData.pizzas.length}</span>
            </div>

            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>
          <div className={css.buttons}>
            <button className="btn">Pay on Delivery</button>
            <button className="btn">Pay Now</button>
          </div>
        </div>
      </div>
      <Toaster />
      {/* Modal */}
    </Layout>
  );
}
