import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  category?: string;
  stock?: number;
}

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  stock: string;
}

interface ValidationErrors {
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  stock?: string;
}

interface ProductFormProps {
  editingProduct: Product | null;
  onSubmit: (productData: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const categories = [
  'Huiles CBD',
  'Gélules CBD', 
  'Crèmes & Cosmétiques',
  'Fleurs CBD',
  'E-liquides',
  'Alimentaire',
  'Autres'
];

const ProductForm: React.FC<ProductFormProps> = ({
  editingProduct,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    price: editingProduct?.price?.replace('€', '') || '',
    image: editingProduct?.image || '',
    category: editingProduct?.category || '',
    stock: editingProduct?.stock?.toString() || ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du produit est requis.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise.';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Le prix est requis.';
    } else if (isNaN(parseFloat(formData.price.replace('€', '').replace(',', '.')))) {
      newErrors.price = 'Le prix doit être un nombre valide.';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est requise.';
    }

    if (formData.stock && isNaN(parseInt(formData.stock))) {
      newErrors.stock = 'Le stock doit être un nombre entier.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: formData.price.includes('€') ? formData.price : `${formData.price}€`,
      image: formData.image.trim() || undefined,
      category: formData.category,
      stock: formData.stock ? parseInt(formData.stock) : undefined
    };

    onSubmit(productData);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={handleSubmit} className="admin-form">
        {editingProduct && (
          <div className="edit-notice">
            <span>Modification du produit : <strong>{editingProduct.name}</strong></span>
            <button 
              type="button" 
              className="cancel-edit"
              onClick={handleCancel}
            >
              Annuler
            </button>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nom du produit *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ex: Huile de CBD 15%"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              disabled={isLoading}
              required
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Catégorie *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`form-input ${errors.category ? 'form-input-error' : ''}`}
              disabled={isLoading}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="field-error">{errors.category}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            id="description"
            name="description"
            placeholder="Décrivez votre produit en détail..."
            value={formData.description}
            onChange={handleInputChange}
            className={`form-input form-textarea ${errors.description ? 'form-input-error' : ''}`}
            disabled={isLoading}
            rows={4}
            required
          />
          {errors.description && <span className="field-error">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price" className="form-label">Prix *</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="39.99"
              value={formData.price}
              onChange={handleInputChange}
              className={`form-input ${errors.price ? 'form-input-error' : ''}`}
              disabled={isLoading}
              required
            />
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="100"
              value={formData.stock}
              onChange={handleInputChange}
              className={`form-input ${errors.stock ? 'form-input-error' : ''}`}
              disabled={isLoading}
              min="0"
            />
            {errors.stock && <span className="field-error">{errors.stock}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">URL de l'image</label>
          <input
            type="url"
            id="image"
            name="image"
            placeholder="https://exemple.com/image.jpg"
            value={formData.image}
            onChange={handleInputChange}
            className="form-input"
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className={`admin-button ${isLoading ? 'admin-button-loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              {editingProduct ? 'Modification...' : 'Ajout...'}
            </>
          ) : (
            editingProduct ? 'Modifier le produit' : 'Ajouter le produit'
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;