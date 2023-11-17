import Layout from "@/components/Layout";
import { client, urlFor } from "../../lib/client";
import Image from "next/image";
import css from "../../styles/Pizza.module.css";
import rightArrow from "../../assets/arrowRight.png";
import leftArrow from "../../assets/arrowLeft.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";
export default function Pizza({ pizza }) {
  const src = urlFor(pizza.image).url();
  const [size, setSize] = useState(1);
  const [count, setCount] = useState(1);
  // Handle pizza Count
  const handleCount = (type) => {
    type === "inc"
      ? setCount((prev) => prev + 1)
      : count === 1
      ? null
      : setCount((prev) => prev - 1);
  };
  // Add To cart function
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({ ...pizza, price: pizza.price[size], count: count, size: size });
    toast.success("Added to Cart");
  };
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            loader={() => src}
            src={src}
            alt=""
            layout="fill"
            unoptimized
            objectFit="cover"
          />
        </div>
        {/* Right Side */}
        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>
          <span>
            <span style={{ color: "var(--themeRed)" }}>$</span>
            {pizza.price[size]}
          </span>
          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVaraints}>
              <div
                onClick={() => setSize(0)}
                className={size === 0 ? css.selected : ""}
              >
                Small
              </div>
              <div
                onClick={() => setSize(1)}
                className={size === 1 ? css.selected : ""}
              >
                Medium
              </div>
              <div
                onClick={() => setSize(2)}
                className={size === 2 ? css.selected : ""}
              >
                Large
              </div>
            </div>
          </div>
          {/* Quantity Counter */}
          <div className={css.quantity}>
            <span>Quantity</span>
            <div className={css.counter}>
              <Image
                onClick={() => handleCount("dec")}
                src={leftArrow}
                alt=""
                height={25}
                width={25}
                objectFit="contain"
                style={{ cursor: "pointer" }}
              />
              <span>{count}</span>
              <Image
                onClick={() => handleCount("inc")}
                src={rightArrow}
                alt=""
                height={25}
                width={25}
                objectFit="contain"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          {/* AddToCart Button */}
          <div className={`btn ${css.btn}`} onClick={addToCart}>
            Add To Cart{" "}
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=='pizza' && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type=='pizza' && slug.current == '${slug}'][0]`
  );
  return {
    props: {
      pizza,
    },
  };
}
