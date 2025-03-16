import User from "../models/userSchema.js"
import Booking from '../models/bookingSchema.js'
import Doctor from '../models/doctorSchema.js'
import bcrypt from 'bcryptjs';


export const updateUser = async(req,res)=>{
    const id = req.params.id;
    const { password, ...otherFields } = req.body; // Extract the password if present

    try {

        if (password) {
            // Hash the password before updating
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            otherFields.password = hashedPassword; // Add the hashed password back to the object
        }

        // Update user with the new data
        const updatedUser = await User.findByIdAndUpdate(id,{$set:otherFields},{new:true});

        res.status(200).json({success:true,message:'Successfully updated',data:updatedUser});

    } catch (error) {
        res.status(500).json({success:false,message:'Failed to update the data'});
        
    }
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id;

    try {

        await User.findByIdAndDelete(id);

        res.status(200).json({success:true,message:'Sucessfully deleted'});
        
    } catch (error) {
        res.status(500).json({success:false,message:'Failed to delete'});
        
    }
}


export const getSingleUser = async(req,res)=>{
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({success:true,message:'User Found',data:user})
        
    } catch (error) {
        res.status(404).json({success:false,message:'No user found'})
        
    }
}


export const getAllUser = async(req,res)=>{

try {
    const users = await User.find({});

    res.status(200).json({success:true,message:'User Found',data:users})
    
} catch (error) {
    
    res.status(404).json({success:false,message:'Not found',})
    
}
}


export const getUserProfiler = async(req,res)=>{
    const userId = req.userId;

    try {

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({success:false,message:'User not found'})
        }

        const {password,...rest} = user._doc;

        res.status(200).json({success:true,message:'Profile info is getting',data:{...rest}})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong,cannot get"})
    }

};

export const getMyAppointments = async(req,res)=>{

    try {

        //step-1: retrieve appontments from booking for specific user
        const bookings = await Booking.find({user:req.userId});

        //step-2: extract doctor ids from appointment booking
        const doctorIds = bookings.map(el=>el.doctor.toString())

        //step-3: retrieve doctors using doctor ids
        const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password')
        res.status(200).json({success:true, message:'Appointment are getting',data:doctors})
  
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Something went wrong,cannot get"})
        
    }
    
}

export const getTotalPatients = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments();
        res.status(200).json({ success: true, message: 'Total number of patients retrieved', data: totalPatients });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve total number of patients' });
    }
};
