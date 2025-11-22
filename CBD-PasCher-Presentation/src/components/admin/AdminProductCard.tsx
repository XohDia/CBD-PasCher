import type { Product } from './ProductForm';

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  onEdit,
  onDelete
}) => {
  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      onDelete(product.id);
    }
  };

  return (
    <div className="admin-product-card">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name}
          className="admin-product-image"
        />
      )}
      <div className="admin-product-info">
        <h4>{product.name}</h4>
        {product.category && (
          <p className="admin-product-category">{product.category}</p>
        )}
        <p className="admin-product-description">{product.description}</p>
        <div className="admin-product-details">
          <span className="admin-product-price">{product.price}</span>
          {product.stock !== undefined && (
            <span className="admin-product-stock">Stock: {product.stock}</span>
          )}
        </div>
      </div>
      <div className="admin-product-actions">
        <button 
          className="edit-button"
          onClick={() => onEdit(product)}
        >
          Modifier
        </button>
        <button 
          className="delete-button"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;