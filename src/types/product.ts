export interface Product {
  _id: string;
  lenderId: string;
  dressId: string;
  dressName: string;
  brand: string;
  size: string;
  status: string;
  colour: string;
  condition: string;
  category: string;
  media: string[]; // array of image URLs
  description: string;
  rentalPrice: {
    fourDays: number;
    eightDays: number;
  };
  material: string;
  careInstructions: string;
  occasion: string[];
  insurance: boolean;
  pickupOption: string;
  approvalStatus: string;
  reasonsForRejection?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lenderName: string;
}
