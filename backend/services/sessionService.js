const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Session = require('../models/Session');

class SessionService {
  // Generate tokens
  static generateTokens(userId) {
    const accessToken = jwt.sign(
      { userId, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = crypto.randomBytes(40).toString('hex');

    return { accessToken, refreshToken };
  }

  // Create session
  static async createSession(userId, deviceInfo) {
    const { accessToken, refreshToken } = this.generateTokens(userId);
    
    const session = new Session({
      userId,
      refreshToken,
      deviceInfo,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    await session.save();
    return { accessToken, refreshToken, sessionId: session._id };
  }

  // Refresh access token
  static async refreshAccessToken(refreshToken) {
    const session = await Session.findOne({
      refreshToken,
      isActive: true,
      expiresAt: { $gt: new Date() }
    }).populate('userId');

    if (!session) {
      throw new Error('Invalid refresh token');
    }

    // Update last activity
    session.lastActivity = new Date();
    await session.save();

    const accessToken = jwt.sign(
      { userId: session.userId._id, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return { accessToken, user: session.userId };
  }

  // Revoke session
  static async revokeSession(refreshToken) {
    await Session.updateOne(
      { refreshToken },
      { isActive: false }
    );
  }

  // Revoke all user sessions
  static async revokeAllUserSessions(userId) {
    await Session.updateMany(
      { userId, isActive: true },
      { isActive: false }
    );
  }

  // Get user sessions
  static async getUserSessions(userId) {
    return await Session.find({
      userId,
      isActive: true,
      expiresAt: { $gt: new Date() }
    }).sort({ lastActivity: -1 });
  }

  // Parse device info from request
  static parseDeviceInfo(req) {
    const userAgent = req.get('User-Agent') || '';
    return {
      userAgent,
      ip: req.ip || req.connection.remoteAddress,
      deviceType: this.getDeviceType(userAgent),
      browser: this.getBrowser(userAgent),
      os: this.getOS(userAgent)
    };
  }

  static getDeviceType(userAgent) {
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) return 'Mobile';
    if (/Tablet/.test(userAgent)) return 'Tablet';
    return 'Desktop';
  }

  static getBrowser(userAgent) {
    if (/Chrome/.test(userAgent)) return 'Chrome';
    if (/Firefox/.test(userAgent)) return 'Firefox';
    if (/Safari/.test(userAgent)) return 'Safari';
    if (/Edge/.test(userAgent)) return 'Edge';
    return 'Unknown';
  }

  static getOS(userAgent) {
    if (/Windows/.test(userAgent)) return 'Windows';
    if (/Mac/.test(userAgent)) return 'macOS';
    if (/Linux/.test(userAgent)) return 'Linux';
    if (/Android/.test(userAgent)) return 'Android';
    if (/iOS/.test(userAgent)) return 'iOS';
    return 'Unknown';
  }
}

module.exports = SessionService;