// src/app/api/add-menu/route.js
import dbConnect from '@/utils/dbConnect';
import{ Meal } from '@/schema/models/vendorSchemas/Meal';

export const POST = async (req, res) => {
  await dbConnect();

  try {
    const { id, accessToken } = req.headers;
    const { menuItem } = await req.json();

    // Debugging payload
    console.log('POST request received with:', { id, accessToken, menuItem });

    // Authorization check
    if (!id || !accessToken) {
      return res.status(401).json({ error: 'Unauthorized. Missing id or access token.' });
    }

    const newMenuItem = await Meal.create(menuItem);

    console.log('Menu item successfully created:', newMenuItem);
    return res.status(201).json({ message: 'Menu item created successfully.', menuItem: newMenuItem });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return res.status(500).json({ error: 'Internal Server Error.' });
  }
};

export const PUT = async (req, res) => {
  await dbConnect();

  try {
    const { id, accessToken } = req.headers;
    const { menuItemId, updates } = await req.json();

    // Debugging payload
    console.log('PUT request received with:', { id, accessToken, menuItemId, updates });

    // Authorization check
    if (!id || !accessToken) {
      return res.status(401).json({ error: 'Unauthorized. Missing id or access token.' });
    }

    const updatedMenuItem = await Meal.findByIdAndUpdate(menuItemId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validations
    });

    if (!updatedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    console.log('Menu item successfully updated:', updatedMenuItem);
    return res.status(200).json({ message: 'Menu item updated successfully.', menuItem: updatedMenuItem });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return res.status(500).json({ error: 'Internal Server Error.' });
  }
};

export const DELETE = async (req, res) => {
  await dbConnect();

  try {
    const { id, accessToken } = req.headers;
    const { menuItemId } = await req.json();

    // Debugging payload
    console.log('DELETE request received with:', { id, accessToken, menuItemId });

    // Authorization check
    if (!id || !accessToken) {
      return res.status(401).json({ error: 'Unauthorized. Missing id or access token.' });
    }

    const deletedMenuItem = await Meal.findByIdAndDelete(menuItemId);

    if (!deletedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    console.log('Menu item successfully deleted:', deletedMenuItem);
    return res.status(200).json({ message: 'Menu item deleted successfully.', menuItem: deletedMenuItem });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return res.status(500).json({ error: 'Internal Server Error.' });
  }
};
