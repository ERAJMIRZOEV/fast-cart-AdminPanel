import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Pagination,
  InputAdornment,
  IconButton,
  Container,
  Avatar
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete
} from '@mui/icons-material';
import { deleteProduct, getProduct, getProductsById } from '../../api/getProductApi/getProduct';
import { toast, Toaster } from "sonner";
import { Link } from 'react-router-dom';


const Products = () => {
  const [selectedProducts, setSelectedProducts] = useState([0, 1, 2, 3, 4]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('Newest');

  const dispatch = useDispatch()

  const { data } = useSelector((state)=> state.products) || {}
  console.log(data?.data)


  useEffect(()=> {
    dispatch(getProduct())
  }, [])

  const handleSelectProduct = (index) => {
    setSelectedProducts(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === data.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data.map((_, index) => index));
    }
  };

  const filteredData = data?.filter(el=> el.productName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
     
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>
        <Link to='/addProduct'>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: '#2196f3',
            '&:hover': {
              backgroundColor: '#1976d2'
            }
          }}
          >
          Add product
        </Button>
          </Link>
      </Box>

      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
          size="small"
        />
        
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              Filter
            </Typography>
            <Select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <MenuItem value="Newest">Newest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
              <MenuItem value="Price High">Price High to Low</MenuItem>
              <MenuItem value="Price Low">Price Low to High</MenuItem>
              <MenuItem value="In Stock">In Stock Only</MenuItem>
            </Select>
          </FormControl>
          
          <Box display="flex" gap={1}>
            <IconButton size="small" sx={{ color: '#2196f3' }}>
              <Edit />
            </IconButton>
            <IconButton size="small" sx={{ color: '#666' }}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Box>

      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedProducts?.length > 0 && selectedProducts?.length < data?.length}
                    checked={selectedProducts?.length === data?.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>
                  <Box sx={{ 
                    border: '2px solid #2196f3', 
                    borderRadius: '4px', 
                    padding: '2px 8px', 
                    display: 'inline-block',
                    fontSize: '12px'
                  }}>
                    Inventory
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((el, index) => (
                <TableRow
                  key={el.id}
                  hover
                  sx={{
                    transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), background 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.025) translateY(-2px)',
                      boxShadow: 3,
                      background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProducts.includes(index)}
                      onChange={() => handleSelectProduct(index)}
                      sx={{
                        color: '#2196f3',
                        transition: 'transform 0.2s',
                        '&.Mui-checked': {
                          color: '#2196f3',
                          transform: 'scale(1.2) rotate(-10deg)',
                        },
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={"http://37.27.29.18:8002/images/" + el.image}
                        sx={{ 
                          width: 40, 
                          height: 40,
                          backgroundColor: '#f5f5f5',
                          transition: 'box-shadow 0.3s, transform 0.3s',
                          boxShadow: 1,
                          '&:hover': {
                            boxShadow: 6,
                            transform: 'scale(1.15) rotate(-6deg)',
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        sx={{
                          transition: 'color 0.3s',
                          '&:hover': {
                            color: '#1976d2',
                          },
                        }}
                      >
                        {el.productName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={el.quantity + ' in stock'}
                      size="small"
                      sx={{
                        backgroundColor: data.inStock ? '#e3f2fd' : '#f5f5f5',
                        color: data.inStock ? '#1976d2' : '#666',
                        fontWeight: 'medium',
                        fontSize: '12px',
                        boxShadow: 1,
                        transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
                        '&:hover': {
                          backgroundColor: '#bbdefb',
                          boxShadow: 4,
                          transform: 'scale(1.1) rotate(2deg)',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        transition: 'color 0.3s',
                        '&:hover': {
                          color: '#f06292',
                        },
                      }}
                    >
                      {el.categoryName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      sx={{
                        transition: 'color 0.3s, transform 0.3s',
                        '&:hover': {
                          color: '#388e3c',
                          transform: 'scale(1.1) rotate(-2deg)',
                        },
                      }}
                    >
                      {el.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Link to='/editproduct'><IconButton
                        size="small"
                        sx={{
                          color: '#2196f3',
                          transition: 'transform 0.2s, color 0.2s',
                          '&:hover': {
                            color: '#1976d2',
                            transform: 'scale(1.2) rotate(-8deg)',
                          },
                        }}
                        onClick={()=> dispatch(getProductsById(el.id))}
                      >
                        <Edit fontSize="small"  />
                      </IconButton></Link>
                      <IconButton
                        onClick={()=> dispatch(deleteProduct(el.id))}
                        size="small"
                        sx={{
                          color: '#f44336',
                          transition: 'transform 0.2s, color 0.2s',
                          '&:hover': {
                            color: '#b71c1c',
                            transform: 'scale(1.2) rotate(8deg)',
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <Pagination 
          count={6} 
          page={1} 
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              '&.Mui-selected': {
                backgroundColor: '#2196f3',
                color: 'white',
              },
            },
          }}
        />
        <Typography variant="body2" color="text.secondary">
          274 Results
        </Typography>
      </Box>
      <Toaster richColors position="bottom-right" />
    </Container>
  );
};

export default Products;