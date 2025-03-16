import Feedback from '../models/feedbackSchema.js';

const FeedbackController = {
  
    submitFeedbackForm: async (req, res) => {
      const { email, subject, message } = req.body;
  
      
      if (!email || !subject || !message) {
        return res.status(400).json({status: false, error: 'All fields are required' });
      }
  
      try {
      
        const newFeedback = new Feedback({
          email,
          subject,
          message,
        });
  
        
        await newFeedback.save();
  
        return res.status(200).json({success:true, message: 'Feedback submitted successfully!' });
  
      } catch (error) {
        console.error('Error in feedback submission', error);
  
        return res.status(500).json({success: false, error: 'Internal server error!' });
      }
    },
  };
  
  export default FeedbackController;
  