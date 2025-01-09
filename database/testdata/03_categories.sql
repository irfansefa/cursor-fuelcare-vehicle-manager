-- Insert default categories for test user
INSERT INTO categories (id, name, description, color, user_id) VALUES
  ('c1d61f1a-761a-491e-938a-5065045e9f01', 'Maintenance', 'Regular vehicle maintenance and repairs', 'bg-blue-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'),
  ('c2d61f1a-761a-491e-938a-5065045e9f02', 'Car Wash', 'Vehicle cleaning and detailing', 'bg-green-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'),
  ('c3d61f1a-761a-491e-938a-5065045e9f03', 'Insurance', 'Vehicle insurance payments', 'bg-purple-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'),
  ('c4d61f1a-761a-491e-938a-5065045e9f04', 'Tax', 'Vehicle-related taxes and fees', 'bg-red-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'),
  ('c5d61f1a-761a-491e-938a-5065045e9f05', 'Parking', 'Parking fees and permits', 'bg-yellow-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'),
  ('c6d61f1a-761a-491e-938a-5065045e9f06', 'Accessories', 'Vehicle accessories and upgrades', 'bg-orange-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'),
  ('c7d61f1a-761a-491e-938a-5065045e9f07', 'Tires', 'Tire replacement and services', 'bg-indigo-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'),
  ('c8d61f1a-761a-491e-938a-5065045e9f08', 'Other', 'Miscellaneous expenses', 'bg-gray-500', 'bc8d61f1-761a-491e-938a-5065045e9f01'); 