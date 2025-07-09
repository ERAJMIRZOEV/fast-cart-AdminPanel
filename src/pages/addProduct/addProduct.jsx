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
  Switch,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Container,
  Breadcrumbs,
  Fade,
  Grow,
  Zoom,
  Slide
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  CloudUpload
} from '@mui/icons-material';
import { toast, Toaster } from "sonner";
import { useSelector, useDispatch } from 'react-redux';
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

  const dispatch = useDispatch();
  const { subCategoryData } = useSelector((state) => state.subcategory) || {};
  const { brandsData } = useSelector((state) => state.brands) || {};
  const { colorsData } = useSelector((state) => state.colors) || {};
  
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSubCategory());
    dispatch(getBrands());
    dispatch(getColors());
  }, [dispatch]);

  const handleSave = () => {
    const newProduct = new FormData();
    newProduct.append("BrandId", brand);
    newProduct.append("ColorId", selectedColor.id);
    newProduct.append("ProductName", productName);
    newProduct.append("Description", description);
    newProduct.append("Quantity", count);
    newProduct.append("Code", code);
    newProduct.append("Price", price);
    newProduct.append("HasDiscount", false);
    newProduct.append("SubCategoryId", subcategory);
    for (let i = 0; i < images.length; i++) {
      newProduct.append("Images", images[i]);
    }
    dispatch(addProduct(newProduct));
    
  };

  return (
    <Fade in timeout={500}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Header Section */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            p: 2,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            position: 'sticky',
            top: 16,
            zIndex: 10
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.2)',
                  transform: 'translateX(-4px)'
                }
              }}
            >
              <ArrowBack sx={{ color: '#2196f3' }} />
            </IconButton>
            <Breadcrumbs sx={{ '& a': { textDecoration: 'none' } }}>
              <RouterLink 
                to='/products' 
                style={{ 
                  color: '#5a6b82',
                  transition: 'all 0.2s ease',
                  '&:hover': { color: '#2196f3' }
                }}
              >
                Products
              </RouterLink>
              <Typography color="#2c3e50" fontWeight={600}>Add new</Typography>
            </Breadcrumbs>
          </Box>
          
          <Box display="flex" gap={2}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => navigate('/products')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '12px',
                px: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.08)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              variant="contained" 
              color="primary"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '12px',
                px: 3,
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
                }
              }}
            >
              Save Product
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Information Card */}
            <Slide direction="up" in timeout={600}>
              <Paper 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  mb={3}
                  sx={{
                    background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Information
                </Typography>

                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} md={6}>
                    <TextField 
                      fullWidth 
                      label="Product name" 
                      value={productName} 
                      onChange={(e) => setProductName(e.target.value)}
                      InputLabelProps={{
                        sx: { 
                          color: '#7a8ba6',
                          fontWeight: '500',
                          '&.Mui-focused': {
                            color: '#2196f3'
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField 
                      fullWidth 
                      label="Code" 
                      value={code} 
                      onChange={(e) => setCode(e.target.value)}
                      InputLabelProps={{
                        sx: { 
                          color: '#7a8ba6',
                          fontWeight: '500',
                          '&.Mui-focused': {
                            color: '#2196f3'
                          }
                        }
                      }}
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
                  InputLabelProps={{
                    sx: { 
                      color: '#7a8ba6',
                      fontWeight: '500',
                      '&.Mui-focused': {
                        color: '#2196f3'
                      }
                    }
                  }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ 
                        color: '#7a8ba6',
                        fontWeight: '500',
                        '&.Mui-focused': {
                          color: '#2196f3'
                        }
                      }}>
                        Subcategories
                      </InputLabel>
                      <Select 
                        value={subcategory} 
                        onChange={(e) => setSubCategory(e.target.value)}
                        sx={{
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2196f3',
                            boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
                          }
                        }}
                      >
                        {subCategoryData?.map((el) => (
                          <MenuItem key={el.id} value={el.id}>{el.subCategoryName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ 
                        color: '#7a8ba6',
                        fontWeight: '500',
                        '&.Mui-focused': {
                          color: '#2196f3'
                        }
                      }}>
                        Brands
                      </InputLabel>
                      <Select 
                        value={brand} 
                        onChange={(e) => setBrand(e.target.value)}
                        sx={{
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2196f3',
                            boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
                          }
                        }}
                      >
                        {brandsData?.map((el) => (
                          <MenuItem key={el.id} value={el.id}>{el.brandName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Slide>

            {/* Price Card */}
            <Slide direction="up" in timeout={800}>
              <Paper 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  mb={3}
                  sx={{
                    background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
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
                        sx: {
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2196f3',
                            boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
                          }
                        }
                      }}
                      InputLabelProps={{
                        sx: { 
                          color: '#7a8ba6',
                          fontWeight: '500',
                          '&.Mui-focused': {
                            color: '#2196f3'
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField 
                      fullWidth 
                      label="Discount" 
                      value={discount} 
                      onChange={(e) => setDiscount(e.target.value)}
                      InputLabelProps={{
                        sx: { 
                          color: '#7a8ba6',
                          fontWeight: '500',
                          '&.Mui-focused': {
                            color: '#2196f3'
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField 
                      fullWidth 
                      label="Count" 
                      value={count} 
                      onChange={(e) => setCount(e.target.value)}
                      InputLabelProps={{
                        sx: { 
                          color: '#7a8ba6',
                          fontWeight: '500',
                          '&.Mui-focused': {
                            color: '#2196f3'
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={addTax} 
                      onChange={(e) => setAddTax(e.target.checked)}
                      sx={{
                        color: '#2196f3',
                        '&.Mui-checked': {
                          color: '#2196f3',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography color="#5a6b82" fontWeight={500}>
                      Add tax for this product
                    </Typography>
                  }
                />
              </Paper>
            </Slide>

            {/* Options Card */}
            <Slide direction="up" in timeout={1000}>
              <Paper 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography 
                      variant="h6" 
                      fontWeight="bold"
                      sx={{
                        background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                      }}
                    >
                      Different Options
                    </Typography>
                    <Typography variant="body2" color="#7a8ba6">
                      This product has multiple options
                    </Typography>
                  </Box>
                  <Switch 
                    checked={hasOptions} 
                    onChange={(e) => setHasOptions(e.target.checked)} 
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#2196f3',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#2196f3',
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Slide>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Color Card */}
            <Zoom in timeout={600}>
              <Paper 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography 
                    variant="h6" 
                    fontWeight="bold"
                    sx={{
                      background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block'
                    }}
                  >
                    Colour:
                  </Typography>
                  <Button 
                    size="small" 
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: '8px',
                      px: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    ✓ Create new
                  </Button>
                </Box>
                
                <Box display="flex" gap={1.5} flexWrap="wrap">
                  {colorsData?.map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 36, 
                        height: 36, 
                        borderRadius: '50%',
                        backgroundColor: color.colorName,
                        cursor: 'pointer',
                        border: selectedColor.index === index ? 
                          '3px solid #2196f3' : '2px solid rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                      onClick={() => setSelectedColor({ id: color.id, index })}
                    />
                  ))}
                </Box>
              </Paper>
            </Zoom>

            {/* Images Card */}
            <Zoom in timeout={800}>
              <Paper 
                sx={{ 
                  p: 3, 
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  mb={2}
                  sx={{
                    background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Images
                </Typography>
                
                <Box
                  sx={{
                    border: '2px dashed rgba(0, 0, 0, 0.12)', 
                    borderRadius: '12px',
                    p: 4, 
                    textAlign: 'center', 
                    mb: 2, 
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      borderColor: '#2196f3',
                      backgroundColor: 'rgba(33, 150, 243, 0.03)',
                      transform: 'scale(1.02)'
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
                  <label 
                    htmlFor="upload-images-input" 
                    style={{ 
                      cursor: 'pointer', 
                      display: 'block',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CloudUpload 
                      sx={{ 
                        fontSize: 48, 
                        color: '#7a8ba6',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        'input:focus ~ &': {
                          color: '#2196f3',
                          transform: 'scale(1.1)'
                        }
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      color="#7a8ba6" 
                      mb={0.5}
                      sx={{
                        transition: 'all 0.3s ease',
                        'input:focus ~ &': {
                          color: '#2196f3'
                        }
                      }}
                    >
                      Click to upload or drag and drop
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="#7a8ba6"
                      sx={{
                        transition: 'all 0.3s ease',
                        'input:focus ~ &': {
                          color: '#2196f3'
                        }
                      }}
                    >
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </Typography>
                  </label>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>

        <Toaster richColors position="bottom-right" />
      </Container>
    </Fade>
  );
};

export default AddProduct;