import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
  Grid,
  Fade,
  Grow,
  Slide,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Close
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBrands, deleteBrands, editBrands, getBrands } from '../../api/getBrandsApi/getBrandsApi';
import { toast, Toaster } from "sonner";

const Brands = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [brandName, setBrandName] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editBrandId, setEditBrandId] = useState(null);
  const [editBrandName, setEditBrandName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { brandsData } = useSelector((state) => state.brands) || {};

  const filteredBrands = brandsData.filter(brand => 
    brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function createBrand() {
    if (!brandName.trim()) {
      toast.error('Brand name cannot be empty');
      return;
    }
    dispatch(addBrands(brandName));
    setBrandName('');
    toast.success('Brand added successfully');
  }

  function putBrand() {
    if (!editBrandName.trim()) {
      toast.error('Brand name cannot be empty');
      return;
    }
    dispatch(editBrands({ editBrandId, editBrandName }));
    setOpenEditModal(false);
    toast.success('Brand updated successfully');
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <Fade in timeout={500}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box mb={4}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: '4px 4px 0 0',
                backgroundColor: '#2196f3'
              }
            }}
          >
            <Link to={'/other'} style={{ textDecoration: 'none' }}>
              <Tab 
                label="Categories" 
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: activeTab === 0 ? '#2196f3' : '#5a6b82',
                  minHeight: 48,
                  '&.Mui-selected': {
                    color: '#2196f3'
                  }
                }} 
              />
            </Link>
            <Tab 
              label="Brands" 
              sx={{ 
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: activeTab === 1 ? '#2196f3' : '#5a6b82',
                minHeight: 48,
                '&.Mui-selected': {
                  color: '#2196f3'
                }
              }} 
            />
            <Link to={'/subcategories'} style={{ textDecoration: 'none' }}>
              <Tab 
                label="Subcategories" 
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#5a6b82',
                  minHeight: 48,
                  '&:hover': {
                    color: '#2196f3'
                  }
                }} 
              />
            </Link>
          </Tabs>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{
              width: 300,
              backgroundColor: 'rgba(240, 244, 248, 0.6)',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(33, 150, 243, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3',
                  boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
                },
              }
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Brands List */}
          <Grid item xs={12} md={7}>
            <Slide direction="up" in timeout={600}>
              <Paper 
                sx={{ 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
                  }
                }}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ 
                        backgroundColor: 'rgba(240, 244, 248, 0.8)',
                        '& th': {
                          fontWeight: 600,
                          color: '#2c3e50',
                          fontSize: '0.875rem'
                        }
                      }}>
                        <TableCell>Brand Name</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredBrands.map((brand) => (
                        <Grow in timeout={800} key={brand.id}>
                          <TableRow 
                            hover 
                            sx={{ 
                              '&:last-child td': { borderBottom: 0 },
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(33, 150, 243, 0.03)'
                              }
                            }}
                          >
                            <TableCell>
                              <Typography fontWeight={500}>
                                {brand.brandName}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Box display="flex" gap={1} justifyContent="flex-end">
                                <IconButton 
                                  size="small" 
                                  sx={{ 
                                    color: '#2196f3',
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      backgroundColor: 'rgba(33, 150, 243, 0.2)',
                                      transform: 'scale(1.1)'
                                    }
                                  }}
                                  onClick={() => {
                                    setEditBrandId(brand.id);
                                    setEditBrandName(brand.brandName);
                                    setOpenEditModal(true);
                                  }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  sx={{ 
                                    color: '#ff5252',
                                    backgroundColor: 'rgba(255, 82, 82, 0.1)',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      backgroundColor: 'rgba(255, 82, 82, 0.2)',
                                      transform: 'scale(1.1)'
                                    }
                                  }}
                                  onClick={() => dispatch(deleteBrands(brand.id))}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Slide>
          </Grid>

          {/* Add New Brand Form */}
          <Grid item xs={12} md={5}>
            <Zoom in timeout={800}>
              <Paper 
                sx={{ 
                  p: 3, 
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
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
                  Add New Brand
                </Typography>
                
                <Box>
                  <TextField
                    fullWidth
                    label="Brand name"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
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
                  
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#2196f3',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      py: 1,
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#1976d2',
                        boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={createBrand}
                    startIcon={<Add />}
                  >
                    Create Brand
                  </Button>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>

        <Toaster richColors position="bottom-right" />

        {/* Edit Modal */}
        <Dialog
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          TransitionComponent={Fade}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
              overflow: 'visible'
            }
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pb: 2,
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
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
              Edit Brand
            </Typography>
            <IconButton
              onClick={() => setOpenEditModal(false)}
              sx={{
                color: '#7a8ba6',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#2196f3',
                  transform: 'rotate(90deg)'
                }
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          
          <DialogContent sx={{ py: 3 }}>
            <TextField
              fullWidth
              label="Brand name"
              value={editBrandName}
              onChange={e => setEditBrandName(e.target.value)}
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
          </DialogContent>
          
          <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 3,
                color: '#5a6b82',
                borderColor: 'rgba(0, 0, 0, 0.12)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderColor: 'rgba(0, 0, 0, 0.24)'
                }
              }}
              onClick={() => setOpenEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 3,
                backgroundColor: '#2196f3',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
                }
              }}
              onClick={putBrand}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fade>
  );
};

export default Brands;