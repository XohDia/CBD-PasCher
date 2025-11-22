# Composants d'Administration

Cette section contient tous les composants modulaires pour la page d'administration des produits.

## Structure des Composants

### 📁 `/admin`
```
admin/
├── index.ts                 # Point d'entrée pour tous les exports
├── ProductForm.tsx          # Formulaire d'ajout/modification de produits
├── ProductManagement.tsx    # Gestion de la liste des produits
├── AdminProductCard.tsx     # Card individuelle pour chaque produit en mode admin
└── AdminTabs.tsx           # Composant de navigation par onglets
```

## Composants

### 🔧 **ProductForm**
**Responsabilité :** Gestion du formulaire d'ajout et de modification de produits
- ✅ Validation complète des champs
- ✅ États de chargement
- ✅ Mode édition et ajout
- ✅ Gestion des erreurs en temps réel

**Props :**
- `editingProduct`: Produit en cours d'édition (null pour un nouveau produit)
- `onSubmit`: Callback appelé lors de la soumission du formulaire
- `onCancel`: Callback pour annuler l'édition
- `isLoading`: État de chargement du formulaire

### 📋 **ProductManagement**
**Responsabilité :** Affichage et gestion de la liste des produits
- ✅ Grille responsive des produits
- ✅ État vide avec bouton d'ajout
- ✅ Délégation des actions aux composants enfants

**Props :**
- `products`: Liste des produits à afficher
- `onEdit`: Callback pour éditer un produit
- `onDelete`: Callback pour supprimer un produit
- `onSwitchToAdd`: Callback pour basculer vers l'onglet d'ajout

### 🃏 **AdminProductCard**
**Responsabilité :** Affichage d'un produit individuel avec actions
- ✅ Affichage des informations du produit
- ✅ Image conditionnelle
- ✅ Actions modifier/supprimer
- ✅ Confirmation de suppression

**Props :**
- `product`: Objet produit à afficher
- `onEdit`: Callback pour éditer le produit
- `onDelete`: Callback pour supprimer le produit

### 🗂️ **AdminTabs**
**Responsabilité :** Navigation entre les onglets d'administration
- ✅ Onglet dynamique (Ajouter/Modifier selon le contexte)
- ✅ Compteur de produits
- ✅ État actif visuel

**Props :**
- `activeTab`: Onglet actuellement actif ('add' | 'manage')
- `onTabChange`: Callback pour changer d'onglet
- `editingProduct`: Booléen indiquant si un produit est en cours d'édition
- `productCount`: Nombre total de produits

## Types

### 🏷️ **Product**
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  category?: string;
  stock?: number;
}
```

## Utilisation

### Import
```typescript
import { 
  ProductForm, 
  ProductManagement, 
  AdminTabs,
  type Product 
} from '../components/admin';
```

### Exemple d'utilisation complète
```typescript
const Admin: React.FC<AdminProps> = ({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');

  // Gestion des produits...

  return (
    <section className="admin-section">
      <div className="admin-container">
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
```

## Avantages de cette Architecture

### 🎯 **Séparation des Responsabilités**
- Chaque composant a une responsabilité claire et unique
- Facilite la maintenance et les tests
- Code plus lisible et organisé

### 🔄 **Réutilisabilité**
- Composants indépendants et réutilisables
- Props bien définies et typées
- Logique métier séparée de l'affichage

### 🧪 **Testabilité**
- Composants isolés plus faciles à tester
- Mocking simplifié des props
- Tests unitaires plus focalisés

### 🔧 **Maintenabilité**
- Modifications localisées par composant
- Évolutions plus simples à implémenter
- Debugging plus efficace

### 📱 **Évolutivité**
- Ajout de nouvelles fonctionnalités facilité
- Extension des composants existants
- Architecture modulaire flexible