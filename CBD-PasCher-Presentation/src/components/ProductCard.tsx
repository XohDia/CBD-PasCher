interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="product-card">
    {product.image && (
      <img src={product.image} alt={product.name} className="product-image" />
    )}
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <strong>{product.price}</strong>
  </div>
);
export default ProductCard;