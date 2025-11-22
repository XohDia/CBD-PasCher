import AdminProductCard from './AdminProductCard';
import type { Product } from './ProductForm';

interface ProductManagementProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onSwitchToAdd: () => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  onEdit,
  onDelete,
  onSwitchToAdd
}) => {
  if (products.length === 0) {
    return (
      <div className="products-management">
        <div className="empty-state">
          <p>Aucun produit dans le catalogue.</p>
          <button 
            className="admin-button"
            onClick={onSwitchToAdd}
          >
            Ajouter le premier produit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-management">
      <div className="products-grid-admin">
        {products.map(product => (
          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;