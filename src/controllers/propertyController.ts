import { Request, Response } from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../services/propertyService";

// GET all properties with count
export const getProperties = async (req: Request, res: Response) => {
  try {
    const { properties, count } = await getAllProperties();
    res.status(200).json({
      data: properties,
      totalCount: count,
    });
    console.log({ properties, count });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving properties" });
  }
};

// GET single property by ID
export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property" });
  }
};

// POST create a new property
export const createPropertyHandler = async (req: Request, res: Response) => {
  try {
    const property = await createProperty(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error creating property" });
  }
};

// PUT update a property
export const updatePropertyHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await updateProperty(id, req.body);
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error updating property" });
  }
};

// DELETE a property
export const deletePropertyHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProperty(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting property" });
  }
};
