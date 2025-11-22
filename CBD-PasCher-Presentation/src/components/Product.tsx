import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => (
  <section id="products" className="products-section">
    <h2>Nos produits</h2>
    <div className="products-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  </section>
);

export default Products;