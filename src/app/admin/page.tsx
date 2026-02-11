"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, ShoppingBag, TrendingUp, Users, Plus, Edit, Trash2, LogOut, Tag, Layers, Image } from 'lucide-react';
import { ProductModal, CategoryModal, BrandModal, PromoBannerModal } from '@/components/AdminModals';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showPromoBannerModal, setShowPromoBannerModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, brandsRes, bannersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/brands'),
        fetch('/api/promo-banners')
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();
      const bannersData = await bannersRes.json();
      
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setBrands(Array.isArray(brandsData) ? brandsData : []);
      setBanners(Array.isArray(bannersData) ? bannersData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]);
      setCategories([]);
      setBrands([]);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin_session')) {
      router.push('/');
    } else {
      fetchData();
    }
  }, [router]);

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_id');
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4' }}>
      <div style={{ background: '#730000', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#FEFACD', margin: 0 }}>ShopHub Admin</h1>
          <p style={{ fontSize: '13px', color: '#FD802E', margin: '4px 0 0 0' }}>Dashboard Management</p>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FD802E', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          <LogOut style={{ width: '18px', height: '18px' }} />
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', padding: '24px 48px' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', height: 'fit-content', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#730000', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Navigation</h3>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'categories', label: 'Categories', icon: Layers },
            { id: 'brands', label: 'Brands', icon: Tag },
            { id: 'promos', label: 'Promo Banners', icon: Image },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'customers', label: 'Customers', icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '8px',
                background: activeTab === item.id ? '#730000' : 'transparent',
                color: activeTab === item.id ? '#FEFACD' : '#233D4C',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'left',
              }}
            >
              <item.icon style={{ width: '18px', height: '18px' }} />
              {item.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', marginBottom: '24px' }}>Dashboard Overview</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {[
                  { label: 'Total Products', value: products.length, icon: Package, color: '#730000' },
                  { label: 'Total Orders', value: '0', icon: ShoppingBag, color: '#FD802E' },
                  { label: 'Categories', value: categories.length, icon: Layers, color: '#00A86B' },
                  { label: 'Brands', value: brands.length, icon: Tag, color: '#5F4A8B' },
                ].map((stat, idx) => (
                  <div key={idx} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <stat.icon style={{ width: '32px', height: '32px', color: stat.color, marginBottom: '12px' }} />
                    <p style={{ fontSize: '28px', fontWeight: '800', color: '#233D4C', margin: '0 0 4px 0' }}>{stat.value}</p>
                    <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', margin: 0 }}>Products Management</h2>
                <button onClick={() => setShowProductModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  Add Product
                </button>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Product</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Brand</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Price</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Stock</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</td></tr>
                    ) : products.length === 0 ? (
                      <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No products yet. Add your first product!</td></tr>
                    ) : (
                      products.map((product: any) => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{product.name}</td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{product.brand}</td>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '700', color: '#730000' }}>${product.price}</td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{product.stockCount}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: product.inStock ? '#E8F5E9' : '#FFEBEE', color: product.inStock ? '#2E7D32' : '#C62828' }}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('products', product.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', margin: 0 }}>Categories Management</h2>
                <button onClick={() => setShowCategoryModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  Add Category
                </button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Category Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Products Count</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</td></tr>
                    ) : categories.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No categories yet. Add your first category!</td></tr>
                    ) : (
                      categories.map((category: any) => (
                        <tr key={category.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{category.name}</td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{products.filter((p: any) => p.category === category.name).length} products</td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('categories', category.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'brands' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', margin: 0 }}>Brands Management</h2>
                <button onClick={() => setShowBrandModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  Add Brand
                </button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Brand Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Products Count</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</td></tr>
                    ) : brands.length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No brands yet. Add your first brand!</td></tr>
                    ) : (
                      brands.map((brand: any) => (
                        <tr key={brand.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{brand.name}</td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{products.filter((p: any) => p.brand === brand.name).length} products</td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('brands', brand.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'promos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', margin: 0 }}>Promo Banners Management</h2>
                <button onClick={() => setShowPromoBannerModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#730000', color: '#FEFACD', fontSize: '14px', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  <Plus style={{ width: '18px', height: '18px' }} />
                  Add Promo Banner
                </button>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Title</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Order</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#730000', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading...</td></tr>
                    ) : banners.length === 0 ? (
                      <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#666' }}>No promo banners yet. Add your first banner!</td></tr>
                    ) : (
                      banners.map((banner: any) => (
                        <tr key={banner.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: '#233D4C' }}>{banner.title}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: banner.isActive ? '#E8F5E9' : '#FFEBEE', color: banner.isActive ? '#2E7D32' : '#C62828' }}>
                              {banner.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>{banner.order}</td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                              <Edit style={{ width: '18px', height: '18px', color: '#730000' }} />
                            </button>
                            <button onClick={() => handleDelete('promo-banners', banner.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '18px', height: '18px', color: '#FF4444' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', marginBottom: '24px' }}>Orders Management</h2>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>Orders list will appear here...</p>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#233D4C', marginBottom: '24px' }}>Customers Management</h2>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>Customer list will appear here...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductModal isOpen={showProductModal} onClose={() => { setShowProductModal(false); fetchData(); }} categories={categories.map((c: any) => c.name)} brands={brands.map((b: any) => b.name)} />
      <CategoryModal isOpen={showCategoryModal} onClose={() => { setShowCategoryModal(false); fetchData(); }} />
      <BrandModal isOpen={showBrandModal} onClose={() => { setShowBrandModal(false); fetchData(); }} />
      <PromoBannerModal isOpen={showPromoBannerModal} onClose={() => { setShowPromoBannerModal(false); fetchData(); }} />
    </div>
  );
}
