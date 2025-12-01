const Visitor = require('../models/Visitor');

/**
 * Track visitor and return total view count
 */
const trackVisitor = async (req, res) => {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const referrer = req.headers['referer'] || req.headers['referrer'] || null;

    // Parse device type from user agent
    const device = getDeviceType(userAgent);
    const browser = getBrowserName(userAgent);

    // Find or create visitor
    let visitor = await Visitor.findOne({ ipAddress, userAgent });

    if (visitor) {
      // Update existing visitor
      visitor.lastVisit = new Date();
      visitor.visitCount += 1;
      visitor.referrer = referrer;
      await visitor.save();
    } else {
      // Create new visitor
      visitor = await Visitor.create({
        ipAddress,
        userAgent,
        referrer,
        device,
        browser,
      });
    }

    // Get total unique visitors and total visits
    const uniqueVisitors = await Visitor.countDocuments();
    const totalVisits = await Visitor.aggregate([
      { $group: { _id: null, total: { $sum: '$visitCount' } } }
    ]);

    res.json({
      success: true,
      data: {
        uniqueVisitors,
        totalViews: totalVisits[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track visitor',
    });
  }
};

/**
 * Get visitor statistics
 */
const getStats = async (req, res) => {
  try {
    const uniqueVisitors = await Visitor.countDocuments();
    const totalVisits = await Visitor.aggregate([
      { $group: { _id: null, total: { $sum: '$visitCount' } } }
    ]);

    const deviceStats = await Visitor.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } }
    ]);

    const recentVisitors = await Visitor.find()
      .sort({ lastVisit: -1 })
      .limit(10)
      .select('ipAddress device browser lastVisit visitCount -_id');

    res.json({
      success: true,
      data: {
        uniqueVisitors,
        totalViews: totalVisits[0]?.total || 0,
        deviceStats,
        recentVisitors,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
    });
  }
};

// Helper functions
function getDeviceType(userAgent) {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function getBrowserName(userAgent) {
  const ua = userAgent.toLowerCase();
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('edg')) return 'Edge';
  if (ua.includes('chrome')) return 'Chrome';
  if (ua.includes('safari')) return 'Safari';
  if (ua.includes('opera')) return 'Opera';
  return 'Unknown';
}

module.exports = {
  trackVisitor,
  getStats,
};
