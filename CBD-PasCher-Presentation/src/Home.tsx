import Products from './components/Product';
import About from './components/About';
import Contact from './components/Contact';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  category?: string;
  stock?: number;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Products products={products} />
      <About />
      <Contact />
    </>
  );
}