import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, createProduct, updateProduct } from '../services/api';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Card } from '@mui/material';
import { CardContent ,Typography} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductForm from './ProductForm';

const Products = ({ token }) => {
    const [products, setProducts] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        try {
            const response = await fetchProducts(token);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(productIdToDelete, token);
            setOpenDeleteDialog(false);
            fetchProductsList();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleOpenDeleteDialog = (id) => {
        setProductIdToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setProductIdToDelete(null);
    };

    const handleOpenFormDialog = (product) => {
        setCurrentProduct(product);
        setOpenFormDialog(true);
    };

    const handleCloseFormDialog = () => {
        setCurrentProduct(null);
        setOpenFormDialog(false);
    };

    const handleSaveProduct = async (formData) => {
        try {
            if (currentProduct) {
                await updateProduct(currentProduct.id, formData, token);
            } else {
                await createProduct(formData, token);
            }
            fetchProductsList();
            handleCloseFormDialog();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };
    const itemStyle = {
        width: '300px',
        margin: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        padding: '16px',
    };
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center the items horizontally
        gap: '20px', // Space between the cards
    };

    // Inline style for each card
    const cardStyle = {
        width: '300px',
        margin: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        overflow: 'hidden',
    };
    const cardContentStyle = {
        padding: '16px',
    };

    // Inline style for product details
    const productDetailStyle = {
        marginBottom: '12px',
    };
    return (
        <div>
            <h2>Products</h2>
            <Button variant="contained" color="primary" onClick={() => handleOpenFormDialog(null)}>Create Product</Button>
              <div style={containerStyle}>
            {products.map(product => (
                <Card key={product.id} style={cardStyle}>
                    <CardContent style={cardContentStyle}>
                        <Typography variant="h6" component="div" style={productDetailStyle}>
                            {product.name} - Rs {product.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {product.description}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button onClick={() => handleOpenFormDialog(product)} style={{ marginRight: '8px' }}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button onClick={() => handleOpenDeleteDialog(product.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ProductForm
                open={openFormDialog}
                onClose={handleCloseFormDialog}
                onSave={handleSaveProduct}
                product={currentProduct}
            />
        </div>
    );
};

export default Products;
