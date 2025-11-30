const Complaint = require('../models/Complaint');

// Create new complaint (Citizens only)
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, priority } = req.body;
    
    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      priority,
      citizen: req.user._id
    });

    await complaint.populate('citizen', 'name email');
    
    res.status(201).json({
      message: 'Complaint created successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get complaints (role-based access)
const getComplaints = async (req, res) => {
  try {
    let query = {};
    
    // Citizens can only see their own complaints
    if (req.user.role === 'citizen') {
      query.citizen = req.user._id;
    }
    
    const complaints = await Complaint.find(query)
      .populate('citizen', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Complaints retrieved successfully',
      complaints
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single complaint
const getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('citizen', 'name email')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.changedBy', 'name');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Citizens can only view their own complaints
    if (req.user.role === 'citizen' && complaint.citizen._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      message: 'Complaint retrieved successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update complaint status (Staff/Admin only)
const updateStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update status and add to history
    complaint.status = status;
    complaint.statusHistory.push({
      status,
      changedBy: req.user._id,
      comment
    });

    await complaint.save();
    await complaint.populate('citizen', 'name email');
    await complaint.populate('assignedTo', 'name email');

    res.json({
      message: 'Complaint status updated successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Assign complaint to staff (Admin only)
const assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;
    
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedTo: staffId },
      { new: true }
    ).populate('citizen', 'name email').populate('assignedTo', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({
      message: 'Complaint assigned successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaint,
  updateStatus,
  assignComplaint
};