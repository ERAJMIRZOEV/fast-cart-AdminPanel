import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Switch,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Container,
  Breadcrumbs,
  Avatar
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  ArrowBack,
  Close,
  Add,
  CloudUpload,
  Delete,
  Edit
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSubCategory } from '../../api/subCategoryApi/getSubCategory';
import { getBrands } from '../../api/getBrandsApi/getBrandsApi';
import { getColors } from '../../api/ColorsApi/colorsApi';
import { addProduct } from '../../api/getProductApi/getProduct';


const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [subcategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [count, setCount] = useState('');
  const [addTax, setAddTax] = useState(false);
  const [hasOptions, setHasOptions] = useState(true);
  const [selectedColor, setSelectedColor] = useState({ id: null, index: null });
  const [images, setImages] = useState([]);
  
  


  // const uploadedImages = [
  //   { name: 'Healthcare_Erbology.png', id: 1 },
  //   { name: 'Healthcare_Erbology.png', id: 2 },
  //   { name: 'Healthcare_Erbology.png', id: 3 }
  // ];


  const dispatch = useDispatch();
console.log(images)


  const { subCategoryData } = useSelector((state)=> state.subcategory) || {}
  const { brandsData } = useSelector((state)=> state.brands) || {}
  const { colorsData } = useSelector((state)=> state.colors) || {}

    useEffect(()=> {
       dispatch(getSubCategory())
       dispatch(getBrands())
       dispatch(getColors())
    }, [])

    function handleSave(){
        const newProduct = new FormData()
        newProduct.append("BrandId", brand)
        newProduct.append("ColorId", selectedColor.id)
        newProduct.append("ProductName", productName)
        newProduct.append("Description", description)
        newProduct.append("Quantity", count)
        newProduct.append("Code", code)
        newProduct.append("Price", price)
        newProduct.append("HasDiscount", false)
        newProduct.append("SubCategoryId", subcategory)
        for (let i = 0; i < images.length; i++) {
            newProduct.append("Images", images[i])
        }
        dispatch(addProduct(newProduct))
    }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <ArrowBack />
          </IconButton>
          <Breadcrumbs>
            <RouterLink to='/products' style={{ textDecoration: 'none', color: 'inherit' }}>
              Products
            </RouterLink>
            <Typography color="text.primary">Add new</Typography>
          </Breadcrumbs>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Information Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Information
            </Typography>
            
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Subcategories</InputLabel>
                  <Select value={subcategory} onChange={(e) => setSubCategory(e.target.value)}>

                {subCategoryData?.map((el)=> {
                    return (
                        <MenuItem value={el.id}>{el.subCategoryName}</MenuItem> 
                    )
                })}
                    
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Brands</InputLabel>
                  <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    {brandsData.map((el)=> {
                        return (
                            <MenuItem value={el.id} >{el.brandName}</MenuItem>
                        )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Price Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Price
            </Typography>
            
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Count"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  checked={addTax}
                  onChange={(e) => setAddTax(e.target.checked)}
                />
              }
              label="Add tax for this product"
            />
          </Paper>

          {/* Different Options Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Different Options
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This product has multiple options
                </Typography>
              </Box>
              <Switch
                checked={hasOptions}
                onChange={(e) => setHasOptions(e.target.checked)}
                color="primary"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Colour Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Colour:
              </Typography>
              <Button size="small" color="primary">
                ✓ Create new
              </Button>
            </Box>
            
            <Box display="flex" gap={1} flexWrap="wrap">
              {colorsData.map((color, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: color.colorName,
                    cursor: 'pointer',
                    border: selectedColor.index === index ? '3px solid #2196f3' : '2px solid #e0e0e0',
                    marginBottom: '6px',
                  }}
                  onClick={() => setSelectedColor({ id: color.id, index })}
                />
              ))}
            </Box>
          </Paper>



          {/* Images Section */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Images
            </Typography>
            
            <Box
              sx={{
                border: '2px dashed #e0e0e0',
                borderRadius: '8px',
                p: 3,
                textAlign: 'center',
                mb: 2,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#2196f3'
                }
              }}
            >
              <input
                type="file"
                multiple
                style={{ display: 'none' }}
                id="upload-images-input"
                onChange={e => setImages(e.target.files)}
              />
              <label htmlFor="upload-images-input" style={{ cursor: 'pointer', display: 'block' }}>
                <CloudUpload sx={{ fontSize: 48, color: '#666', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Click to upload or drag and drop
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </Typography>
              </label>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProduct;