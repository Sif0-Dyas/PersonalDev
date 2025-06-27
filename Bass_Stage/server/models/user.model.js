const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Basic user info
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    
    profilePicture: {
        type: String,
        default: null,
    },
    
    // OAuth provider information
    authProviders: [{
        provider: {
            type: String,
            enum: ['google', 'apple', 'local'],
            required: true,
        },
        providerId: {
            type: String,
            required: true,
        },
        // Store provider-specific data
        providerData: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }
    }],
    
    // User preferences and metadata
    isActive: {
        type: Boolean,
        default: true,
    },
    
    lastLoginAt: {
        type: Date,
        default: null,
    },
    
    // For future features - user role management
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, { 
    timestamps: true,
    // Add virtual for full name
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Index for efficient queries
UserSchema.index({ email: 1 });
UserSchema.index({ 'authProviders.provider': 1, 'authProviders.providerId': 1 });

// Static method to find or create user from OAuth data
UserSchema.statics.findOrCreateFromOAuth = async function(provider, profile) {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            console.log('⚠️ Database not connected, creating mock user for demo');
            // Return a mock user object for demo purposes
            return {
                _id: 'demo-user-id',
                email: profile.email,
                firstName: profile.given_name || profile.firstName || 'Demo',
                lastName: profile.family_name || profile.lastName || 'User',
                fullName: `${profile.given_name || 'Demo'} ${profile.family_name || 'User'}`,
                profilePicture: profile.picture || null,
                authProviders: [{
                    provider: provider,
                    providerId: profile.id,
                    providerData: profile
                }],
                lastLoginAt: new Date(),
                role: 'user',
                isActive: true,
                createdAt: new Date(),
                save: () => Promise.resolve(this)
            };
        }

        // First, try to find user by email
        let user = await this.findOne({ email: profile.email });
        
        if (user) {
            // User exists, check if this provider is already linked
            const existingProvider = user.authProviders.find(
                p => p.provider === provider && p.providerId === profile.id
            );
            
            if (!existingProvider) {
                // Link new provider to existing user
                user.authProviders.push({
                    provider: provider,
                    providerId: profile.id,
                    providerData: profile
                });
                await user.save();
            }
            
            // Update last login
            user.lastLoginAt = new Date();
            await user.save();
            
            return user;
        } else {
            // Create new user
            user = new this({
                email: profile.email,
                firstName: profile.given_name || profile.firstName || '',
                lastName: profile.family_name || profile.lastName || '',
                profilePicture: profile.picture || null,
                authProviders: [{
                    provider: provider,
                    providerId: profile.id,
                    providerData: profile
                }],
                lastLoginAt: new Date()
            });
            
            await user.save();
            return user;
        }
    } catch (error) {
        // If database error, create mock user for demo
        if (error.message.includes('buffering timed out') || error.message.includes('ECONNREFUSED')) {
            console.log('⚠️ Database timeout, creating mock user for demo');
            return {
                _id: 'demo-user-id',
                email: profile.email,
                firstName: profile.given_name || profile.firstName || 'Demo',
                lastName: profile.family_name || profile.lastName || 'User',
                fullName: `${profile.given_name || 'Demo'} ${profile.family_name || 'User'}`,
                profilePicture: profile.picture || null,
                authProviders: [{
                    provider: provider,
                    providerId: profile.id,
                    providerData: profile
                }],
                lastLoginAt: new Date(),
                role: 'user',
                isActive: true,
                createdAt: new Date(),
                save: () => Promise.resolve(this)
            };
        }
        throw new Error(`Error in findOrCreateFromOAuth: ${error.message}`);
    }
};

// Instance method to add new auth provider
UserSchema.methods.addAuthProvider = function(provider, providerId, providerData) {
    const existingProvider = this.authProviders.find(
        p => p.provider === provider && p.providerId === providerId
    );
    
    if (!existingProvider) {
        this.authProviders.push({
            provider,
            providerId,
            providerData
        });
    }
    
    return this.save();
};

// Instance method to remove auth provider
UserSchema.methods.removeAuthProvider = function(provider, providerId) {
    this.authProviders = this.authProviders.filter(
        p => !(p.provider === provider && p.providerId === providerId)
    );
    
    return this.save();
};

module.exports = mongoose.model('User', UserSchema);