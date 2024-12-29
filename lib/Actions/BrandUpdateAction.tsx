'use server';
import { z } from 'zod'
import dbConnect from '../dbConnect';
import { BrandModel } from '../Models/Brand';
import { revalidateTag } from 'next/cache'

type ApiSchema = {
    success: boolean,
    message: string,
}

const BrandSchema = z.object({
    _id: z.string(),
    name: z.string(),
})


const BrandUpdateAction = async (values: z.infer<typeof BrandSchema>): Promise<ApiSchema> => {

    const validatedFields = BrandSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: "Invalid fields" }
    }

    try {
        await dbConnect();

        const res = await BrandModel.findByIdAndUpdate(
            values._id,
            {name: values.name},
            { new: true }
        );

        if (!res) {
            return {success: false, message: 'Brand not found or update failed.'};
        }

        revalidateTag('brand');
        return {success: true, message: "Brand update successfully"}
        
    } catch (error) {
        return{success: false, message: "Something went wrong! :" + error};
    }
}

export default BrandUpdateAction