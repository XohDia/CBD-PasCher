interface AdminTabsProps {
  activeTab: 'add' | 'manage';
  onTabChange: (tab: 'add' | 'manage') => void;
  editingProduct: boolean;
  productCount: number;
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  activeTab,
  onTabChange,
  editingProduct,
  productCount
}) => {
  return (
    <div className="admin-tabs">
      <button 
        className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
        onClick={() => onTabChange('add')}
      >
        {editingProduct ? 'Modifier Produit' : 'Ajouter Produit'}
      </button>
      <button 
        className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
        onClick={() => onTabChange('manage')}
      >
        Gérer Produits ({productCount})
      </button>
    </div>
  );
};

export default AdminTabs;