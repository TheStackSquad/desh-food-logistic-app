import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { VendorProfile } from '@/schema/models/vendorSchemas/Profile';
import { writeFile } from 'fs/promises';
import path from 'path';

// Helper function to save uploaded files
const saveFile = async (file) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), 'public', 'uploads', 'vendorProfile', filename);
    await writeFile(filepath, buffer);
    return `/uploads/vendorProfile/${filename}`;
};

// POST handler for creating new vendor profiles
export const POST = async (request) => {
    try {
        await dbConnect();
        const formData = await request.formData();
        
        // Extract form data and prepare profile object
        const profileData = {
            vendor: formData.get('vendor'),
            fullname: formData.get('fullname'),
            storeName: formData.get('storeName'),
            storeDescription: formData.get('storeDescription'),
            vendorType: formData.get('vendorType'),
            address: formData.get('address'),
        };

        // Handle file uploads if present
        const profilePic = formData.get('profilePic');
        const coverImage = formData.get('coverImage');
        
        if (profilePic) {
            profileData.profilePic = await saveFile(profilePic, 'profilePic');
        }
        if (coverImage) {
            profileData.coverImage = await saveFile(coverImage, 'coverImage');
        }

        // Create new profile in database
        const profile = await VendorProfile.create(profileData);
        return NextResponse.json(profile);
    } catch (error) {
        console.error('Profile creation error:', error);
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
    }
};

// PATCH handler for updating existing vendor profiles
export const PATCH = async (request) => {
    try {
        await dbConnect();
        const formData = await request.formData();
        const vendorId = formData.get('vendor');
        
        // Build update object with only provided fields
        const updateData = {};
        const fields = ['fullname', 'storeName', 'storeDescription', 'vendorType', 'address'];
        
        fields.forEach(field => {
            if (formData.has(field)) {
                updateData[field] = formData.get(field);
            }
        });

        // Handle image updates if new files are provided
        if (formData.has('profilePic')) {
            updateData.profilePic = await saveFile(formData.get('profilePic'), 'profilePic');
        }
        if (formData.has('coverImage')) {
            updateData.coverImage = await saveFile(formData.get('coverImage'), 'coverImage');
        }

        // Update profile in database
        const profile = await VendorProfile.findOneAndUpdate(
            { vendor: vendorId },
            updateData,
            { 
                new: true,         // Return updated document
                runValidators: true // Run schema validators on update
            }
        );

        if (!profile) {
            return NextResponse.json(
                { error: 'Profile not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
};
