import { useState } from 'react';
import { 
  ProductForm, 
  ProductManagement, 
  AdminTabs,
  type Product 
} from '../components/admin';

interface AdminProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: number) => void;
  onUpdateProduct: (product: Product) => void;
}

const Admin: React.FC<AdminProps> = ({ 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateProduct 
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');

  const handleProductSubmit = async (productData: Omit<Product, 'id'>) => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (editingProduct) {
        // Update existing product
        onUpdateProduct({ ...productData, id: editingProduct.id });
        setEditingProduct(null);
      } else {
        // Add new product
        onAddProduct(productData);
      }

      setIsLoading(false);
      setActiveTab('manage'); // Switch to manage tab to see the new product
    }, 1000);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveTab('add');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleTabChange = (tab: 'add' | 'manage') => {
    if (tab === 'add' && editingProduct) {
      // If switching to add tab while editing, cancel the edit
      setEditingProduct(null);
    }
    setActiveTab(tab);
  };

  return (
    <section className="admin-section">
      <div className="admin-container">
        <h2 className="admin-title">Administration des Produits</h2>
        <p className="admin-subtitle">Gérez votre catalogue de produits CBD</p>

        <AdminTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          editingProduct={!!editingProduct}
          productCount={products.length}
        />

        {activeTab === 'add' && (
          <ProductForm
            editingProduct={editingProduct}
            onSubmit={handleProductSubmit}
            onCancel={handleCancelEdit}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'manage' && (
          <ProductManagement
            products={products}
            onEdit={handleEdit}
            onDelete={onDeleteProduct}
            onSwitchToAdd={() => setActiveTab('add')}
          />
        )}
      </div>
    </section>
  );
};

export default Admin;